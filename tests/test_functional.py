"""Browserregressionen: python3 -m unittest discover -s tests -v."""
import functools
import os
from pathlib import Path
import threading
import unittest
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class LearningWorldTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(QuietHandler, directory=str(ROOT))
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.playwright = sync_playwright().start()
        options = {'headless': True}
        if os.environ.get('CHROMIUM_PATH'):
            options['executable_path'] = os.environ['CHROMIUM_PATH']
        elif Path('/usr/bin/chromium').exists():
            options['executable_path'] = '/usr/bin/chromium'
        if os.environ.get('CHROMIUM_NO_SANDBOX') == '1':
            options['args'] = ['--no-sandbox']
        cls.browser = cls.playwright.chromium.launch(**options)
        cls.url = f'http://127.0.0.1:{cls.server.server_port}/'

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def setUp(self):
        self.page = self.browser.new_page()
        self.errors = []
        self.page.on('pageerror', lambda error: self.errors.append(str(error)))
        self.blocked_requests = []
        if os.environ.get('LERNWELT_OFFLINE_HTML'):
            html = Path(os.environ['LERNWELT_OFFLINE_HTML']).read_text(encoding='utf-8')
            def offline_route(route):
                if route.request.is_navigation_request() and route.request.url == self.url:
                    route.fulfill(status=200, content_type='text/html; charset=utf-8', body=html)
                else:
                    self.blocked_requests.append(route.request.url)
                    route.abort()
            self.page.route('**/*', offline_route)
            self.page.context.set_offline(True)
        self.assertEqual(self.page.goto(self.url).status, 200)

    def tearDown(self):
        self.page.close()
        self.assertEqual(self.errors, [], 'Keine unbehandelten JavaScript-Fehler')
        self.assertEqual(self.blocked_requests, [], 'Die Einzeldatei darf keine weiteren Ressourcen anfordern')

    def metadata(self, task_id):
        return self.page.evaluate('(id)=>{const t=tasks.find(t=>t.id===id);return {subject:t.subject,grade:t.grades[0],topic:t.topic}}', task_id)

    def catalog(self, task_id, grade=None):
        info = self.metadata(task_id)
        self.page.reload()
        self.page.locator(f'[data-sub="{info["subject"]}"]').click()
        self.page.locator(f'[data-grade="{grade or info["grade"]}"]').click()
        self.page.locator(f'[data-topic="{info["topic"]}"]').click()

    def open(self, task_id):
        self.catalog(task_id)
        if task_id == 'algo-test':
            code=self.page.evaluate('TEST_CODES["algo-test"]')
            self.page.once('dialog',lambda d:d.accept(code))
        self.page.locator(f'[data-task="{task_id}"]').click()

    def answer_questions(self, questions, prefix='q'):
        for i, question in enumerate(questions):
            field = self.page.locator(f'#{prefix}{i}')
            if question.get('parts'):
                for j, part in enumerate(question['parts']):
                    partfield = self.page.locator(f'#{prefix}{i}-part{j}')
                    if part.get('choices'):
                        partfield.select_option(part['a'])
                    else:
                        partfield.fill(part['a'])
            elif question.get('free'):
                field.fill(question['sample'])
            elif question.get('order'):
                for value in question['a'].split(' → '):
                    index = question['order'].index(value)
                    self.page.locator(f'[data-order-q="{i}"][data-order-v="{index}"]').click()
            elif question.get('choices'):
                field.select_option(question['a'])
            else:
                field.fill(question['a'])

    def assert_pdf(self, page):
        pdf = page.pdf(format='A4', print_background=True)
        self.assertTrue(pdf.startswith(b'%PDF-'))
        self.assertGreater(len(pdf), 1000)

    def assert_result_print(self):
        self.page.evaluate('window.print=()=>{window.printCalls=(window.printCalls||0)+1}')
        before = self.page.evaluate('window.printCalls||0')
        self.page.locator('#results button[onclick="window.print()"]').click()
        self.assertEqual(self.page.evaluate('window.printCalls'), before + 1)
        self.page.emulate_media(media='print')
        self.assertTrue(self.page.locator('#resultBody').is_visible())
        self.assertFalse(self.page.locator('#results .actions').is_visible())
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')

    def test_navigation_all_modules_and_empty_grades(self):
        ids = self.page.evaluate('tasks.map(t=>t.id)')
        self.assertEqual(len(ids), 13)
        for task_id in ids:
            with self.subTest(module=task_id):
                self.catalog(task_id)
                self.assertTrue(self.page.locator(f'[data-task="{task_id}"]').is_visible())
                self.assertEqual(self.page.locator('.material-group').count(), 3)
        self.page.reload()
        self.page.locator('[data-sub="Informatik"]').click()
        self.page.locator('[data-grade="5"]').click()
        self.assertEqual(self.page.locator('[data-topic]').count(), 1)
        self.assertEqual(self.page.locator('[data-topic]').get_attribute('data-topic'), 'Hardware und Software')
        self.page.locator('[data-crumb="1"]').click()
        self.page.locator('[data-grade="6"]').click()
        self.assertEqual(set(self.page.locator('[data-topic]').evaluate_all('(nodes)=>nodes.map(n=>n.dataset.topic)')), {'Algorithmen', 'Binärsystem'})
        for grade in range(7, 11):
            self.page.locator('[data-crumb="1"]').click()
            self.assertEqual(self.page.locator('[data-crumb]').count(), 2)
            self.page.locator(f'[data-grade="{grade}"]').click()
            self.assertIn('noch keine Themen', self.page.locator('#topicTiles').inner_text())
        self.page.locator('[data-crumb="0"]').click()
        self.assertEqual(self.page.locator('[data-crumb]').count(), 1)
        for subject in ['Mathematik', 'Hauswirtschaft']:
            self.page.locator(f'[data-sub="{subject}"]').click()
            self.page.locator('[data-grade="5"]').click()
            self.assertIn('noch keine Themen', self.page.locator('#topicTiles').inner_text())
            self.page.locator('[data-crumb="0"]').click()

    def test_all_lessons_feedback_visuals_and_practice_transition(self):
        ids = self.page.evaluate('tasks.filter(t=>t.mode==="Lernen").map(t=>t.id)')
        for task_id in ids:
            with self.subTest(module=task_id):
                self.open(task_id)
                slides = self.page.evaluate('current.slides')
                practice_id = self.page.evaluate('current.practiceId')
                if task_id == 'algo-summary':
                    self.assertEqual(self.page.locator('#printNotebook').count(), 0)
                else:
                    self.page.evaluate('window.print=()=>{}')
                    self.page.locator('#printNotebook').click()
                    self.page.emulate_media(media='print')
                    self.assertEqual(self.page.locator('#notebookPrint .print-task').count(), 3)
                    self.assertTrue(self.page.locator('#notebookPrint').is_visible())
                    self.assertFalse(self.page.locator('main').is_visible())
                    self.assert_pdf(self.page)
                    self.page.emulate_media(media='screen')
                    self.page.evaluate('window.dispatchEvent(new Event("afterprint"))')
                self.assertTrue(self.page.locator('#lessonPrev').is_disabled())
                for i, slide in enumerate(slides):
                    self.assertEqual(self.page.locator('#lessonContent h1').inner_text(), slide['title'])
                    if task_id.startswith('algo-'):
                        import re
                        self.assertIsNone(re.search(r'Bubble|Insertion|lineare Suche|Suchen und Sortieren',self.page.locator('#lesson').inner_text(),re.I))
                    if slide.get('visual') or slide.get('images'):
                        self.assertTrue(self.page.locator('.illustration').inner_html().strip())
                    if slide.get('images'):
                        self.assertTrue(self.page.locator('.illustration img').evaluate_all('(imgs)=>imgs.every(i=>i.complete&&i.naturalWidth>0)'))
                    if slide.get('question'):
                        wrong = (slide['answer'] + 1) % len(slide['choices'])
                        self.page.locator(f'[name="lessonAnswer"][value="{wrong}"]').check()
                        self.page.locator('#checkAnswer').click()
                        self.assertTrue(self.page.locator('#lessonFeedback .bad').is_visible())
                        self.page.locator(f'[name="lessonAnswer"][value="{slide["answer"]}"]').check()
                        self.page.locator('#checkAnswer').click()
                        self.assertTrue(self.page.locator('#lessonFeedback .good').is_visible())
                        self.page.locator('#lessonNext').click()
                        self.page.locator('#lessonPrev').click()
                        self.assertTrue(self.page.locator('#lessonFeedback .good').is_visible())
                    self.page.locator('#lessonNext').click()
                self.assertEqual(self.page.evaluate('current.id'), practice_id)
                self.assertTrue(self.page.locator('#work').is_visible())

    def test_all_question_practices_complete_and_restart(self):
        ids = self.page.evaluate('tasks.filter(t=>t.pages).map(t=>t.id)')
        for task_id in ids:
            with self.subTest(module=task_id):
                self.open(task_id)
                pages = self.page.evaluate('current.pages')
                for i, questions in enumerate(pages):
                    if task_id.startswith('algo-'):
                        self.assertNotIn('Punkte',self.page.locator('#work').inner_text())
                    self.answer_questions(questions)
                    self.page.locator('#finish').click()
                    self.assertTrue(self.page.locator('#results').is_visible())
                    self.assert_result_print()
                    graded = sum(not q.get('free') for q in questions)
                    if task_id.startswith('algo-'):
                        self.assertNotIn('Punkte',self.page.locator('#resultBody').inner_text())
                        self.assertEqual(self.page.locator('#resultBody .score').count(),0)
                        self.assertIn('selbst vergleichen',self.page.locator('#resultBody').inner_text())
                    else:
                        self.assertIn(f'{graded} / {graded} Punkte', self.page.locator('#resultBody').inner_text())
                    if i < len(pages) - 1:
                        self.page.locator('#nextLevel').click()
                maximum = sum(not q.get('free') for page in pages for q in page)
                if not task_id.startswith('algo-'):
                    self.assertIn(f'{maximum} / {maximum} Punkte', self.page.locator('#resultBody').inner_text())
                self.assertEqual(self.page.locator('#nextLevel').count(), 0)
                self.page.locator('#again').click()
                self.page.locator(f'[data-task="{task_id}"]').click()
                self.assertEqual(self.page.evaluate('practiceState.scores'), [])
                self.page.locator('#reset').click()
                self.assertEqual(self.page.evaluate('practiceState.page'), 0)

    def test_hardware_sorting_keyboard_all_stages_and_reset(self):
        self.open('hardware-practice')
        self.page.once('dialog', lambda dialog: dialog.accept())
        self.page.locator('#finish').click()
        self.assertTrue(self.page.locator('#work').is_visible())
        cards = self.page.evaluate('hardwareCards')
        for stage in range(2):
            for card in cards:
                group = card['kind'] if stage == 0 else ('Software' if card['kind'] == 'Software' else 'Innen' if card.get('role') == 'Innen' else 'Außen')
                self.page.locator(f'[data-card="{card["id"]}"]').click()
                self.page.locator(f'[data-zone="{group}"]').press('Enter')
            self.page.locator('#finish').click()
            self.assertIn('12 / 12 Punkte', self.page.locator('#resultBody').inner_text())
            self.assert_result_print()
            self.page.locator('#nextLevel').click()
        for stage in [2, 3]:
            questions = self.page.evaluate('hwStage===3?[...HW_PRACTICE[1],...HW_PRACTICE[2]]:HW_PRACTICE[0]')
            self.answer_questions(questions, 'hwq')
            self.page.locator('#finish').click()
            self.assertIn(f'{len(questions)} / {len(questions)}', self.page.locator('#resultBody').inner_text())
            self.assert_result_print()
            self.page.locator('#nextLevel').click()
        for field in self.page.locator('#questions textarea').all():
            field.fill('Eine eigene Erklärung zur Aufgabe.')
        self.page.locator('#finish').click()
        self.assertIn('Geschafft!', self.page.locator('#resultBody').inner_text())
        self.assert_result_print()
        self.page.locator('#again').click()
        self.page.locator('[data-task="hardware-practice"]').click()
        self.page.locator('#reset').click()
        self.assertEqual(self.page.evaluate('[hwStage,hwAnswers.length,Object.keys(sortAssignments).length]'), [0, 0, 0])

    def test_tests_access_name_scoring_and_print(self):
        for task_id in ['binary-test', 'hardware-test', 'algo-test']:
            with self.subTest(module=task_id):
                self.catalog(task_id)
                button = self.page.locator(f'[data-task="{task_id}"]')
                self.page.once('dialog', lambda d: d.dismiss())
                button.click()
                self.assertTrue(self.page.locator('#home').is_visible())
                def wrong_dialog(dialog):
                    dialog.accept('FALSCH') if dialog.type == 'prompt' else dialog.accept()
                self.page.on('dialog', wrong_dialog)
                button.click()
                self.page.remove_listener('dialog', wrong_dialog)
                self.assertTrue(self.page.locator('#home').is_visible())
                code = self.page.evaluate('(id)=>TEST_CODES[id]', task_id)
                self.page.once('dialog', lambda d: d.accept(code))
                button.click()
                self.page.once('dialog', lambda d: d.accept())
                self.page.locator('#finish').click()
                self.assertTrue(self.page.locator('#work').is_visible())
                self.page.locator('#student').fill('Funktionstest <Name>')
                questions = self.page.evaluate('current.questions')
                self.answer_questions(questions, 'hwq' if task_id == 'hardware-test' else 'q')
                self.page.locator('#finish').click()
                self.assertIn('20 / 20 Punkte', self.page.locator('#resultBody').inner_text())
                self.assertIn('Note 1', self.page.locator('#resultBody').inner_text())
                self.assertIn('Funktionstest <Name>', self.page.locator('#resultBody').inner_text())
                self.assertEqual(self.page.locator('#resultBody name').count(), 0)
                self.assertTrue(self.page.locator('#screenshotNotice').is_visible())
                self.assert_result_print()
                self.page.locator('#again').click()
                self.page.once('dialog', lambda d: d.accept(code))
                with self.page.expect_popup() as popup:
                    self.page.locator(f'[data-print-test="{task_id}"]').click()
                printed = popup.value
                self.assertEqual(printed.locator('.item').count(), 20)
                self.assertTrue(printed.locator('style').inner_text().strip())
                printed.evaluate('window.print=()=>{window.printCalled=true}')
                printed.locator('.toolbar button').click()
                self.assertTrue(printed.evaluate('window.printCalled'))
                printed.emulate_media(media='print')
                self.assertFalse(printed.locator('.toolbar').is_visible())
                self.assert_pdf(printed)
                printed.close()

    def test_wrong_incomplete_answers_and_state_switch(self):
        self.open('binary-practice')
        self.page.locator('#q0').fill('999')
        self.page.once('dialog', lambda d: d.dismiss())
        self.page.locator('#finish').click()
        self.assertTrue(self.page.locator('#work').is_visible())
        self.page.once('dialog', lambda d: d.accept())
        self.page.locator('#finish').click()
        self.assertIn('0 / 10 Punkte', self.page.locator('#resultBody').inner_text())
        self.open('hardware-practice')
        self.assertIsNone(self.page.evaluate('practiceState'))
        self.assertEqual(self.page.locator('#nextLevel').count(), 0)
        self.open('algo-general-practice')
        self.assertEqual(self.page.evaluate('[hwStage,hwAnswers.length,practiceState.page]'), [0, 0, 0])

    def test_distinct_figures_geometry_and_loop(self):
        total = 0
        for task_id in ['algo-general-learn', 'algo-display-learn', 'algo-summary']:
            self.open(task_id)
            slides = self.page.evaluate('current.slides')
            seen = set()
            for i, slide in enumerate(slides):
                for width in [1100, 390]:
                    self.page.set_viewport_size({'width': width, 'height': 900})
                    if slide.get('visual') and slide['title']!='Ausführbarkeit: sinnvolle Schritte':
                        figure = self.page.locator('.illustration .lesson-figure svg')
                        self.assertEqual(figure.count(), 1, slide['title'])
                        self.assertEqual(figure.locator('title').text_content(), slide['title'])
                        self.assertTrue(figure.locator('desc').text_content())
                        self.assertEqual(figure.evaluate('(svg)=>svg.querySelectorAll("[id]").length'),
                                         figure.evaluate('(svg)=>new Set([...svg.querySelectorAll("[id]")].map(n=>n.id)).size'))
                        outside = figure.evaluate('''(svg)=>{
                            const v=svg.viewBox.baseVal;
                            return [...svg.querySelectorAll('text')].flatMap(t=>{
                                const b=t.getBBox();
                                return b.width && (b.x < -1 || b.y < -1 || b.x+b.width>v.width+1 || b.y+b.height>v.height+1) ? [t.textContent]:[];
                            });
                        }''')
                        self.assertEqual(outside, [], slide['title'])
                        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
                        if width == 1100:
                            figure_id = figure.get_attribute('data-figure-id')
                            self.assertNotIn(figure_id, seen)
                            seen.add(figure_id)
                            total += 1
                            self.page.emulate_media(media='print')
                            self.assertTrue(figure.is_visible())
                            self.assert_pdf(self.page)
                            self.page.emulate_media(media='screen')
                if slide['title'] == 'Schleifen: etwas wiederholen':
                    self.assertEqual(self.page.locator('.lesson-figure').get_attribute('data-figure-kind'), 'loop')
                    self.assertIn('fertig?', figure.text_content())
                    self.assertIn('Ja', figure.text_content())
                    self.assertIn('Nein', figure.text_content())
                    self.assertIn('Spielen', figure.text_content())
                    # Rückweg von der Aktion zurück zur Prüfung; Ja führt zum Spielen.
                    self.assertEqual(figure.locator('path[d="M427 130V80H160V103"]').count(), 1)
                    self.assertEqual(figure.locator('path[d="M260 165H340"]').count(), 1)
                if i < len(slides)-1:
                    self.page.locator('#lessonNext').click()
        self.assertEqual(total, 28)

    def test_handwashing_picture_writing_and_real_toothbrush(self):
        def decoded_picture(selector):
            image = self.page.locator(selector)
            self.assertTrue(image.is_visible())
            size = image.evaluate("""async el=>{const img=new Image();
                img.src=el.getAttribute('href');await img.decode();
                return [img.naturalWidth,img.naturalHeight]}""")
            self.assertGreater(min(size), 500)

        self.open('algo-general-practice')
        self.answer_questions(self.page.evaluate('current.pages[0]'))
        self.page.locator('#finish').click()
        self.page.locator('#nextLevel').click()
        task = self.page.locator('[data-question-id="g06"]')
        decoded_picture('[data-question-id="g06"] image[data-learning-image="handwash"]')
        self.assertEqual(task.locator('svg text').all_text_contents(), list('ABCDE'))
        self.assertEqual(task.locator('textarea').input_value(), '')
        self.assertNotIn('Gib Seife', task.inner_text())
        self.answer_questions(self.page.evaluate('current.pages[1]'))
        own_text = 'A: Gib Seife auf die Hand.\nB: Füge Wasser hinzu.\nC: Reibe die Hände.\nD: Spüle sie ab.\nE: Trockne sie.\nErst abspülen, dann trocknen.'
        task.locator('textarea').fill(own_text)
        self.page.set_viewport_size({'width':390,'height':844})
        self.assertLessEqual(task.locator('svg').bounding_box()['width'], 390)
        self.page.evaluate('window.print=()=>{}')
        self.page.locator('#printAlgoWork').click()
        self.page.emulate_media(media='print')
        decoded_picture('[data-question-id="g06"] image[data-learning-image="handwash"]')
        self.assertEqual(task.locator('[data-algo-print-for="q1"]').inner_text(), own_text)
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')
        self.page.locator('#finish').click()
        self.assertIn(own_text, self.page.locator('#resultBody').inner_text())
        self.assertIn('Selbstkontrolle – keine automatische Inhaltsbewertung', self.page.locator('#resultBody').inner_text())
        self.open('algo-general-learn')
        decoded_picture('#lesson image[data-learning-image="toothbrush"]')
        self.page.evaluate('lessonPage=15;renderLesson()')
        decoded_picture('#lesson image[data-learning-image="handwash"]')
        self.assertNotIn('Beginne zum Beispiel', self.page.locator('#lesson').inner_text())
        self.open('algo-display-learn')
        self.page.evaluate('lessonPage=3;renderLesson()')
        decoded_picture('#lesson image[data-learning-image="toothbrush"]')
        self.page.emulate_media(media='print')
        decoded_picture('#lesson image[data-learning-image="toothbrush"]')
        self.assert_pdf(self.page)

    def test_source_teeth_diagram_and_printed_notes(self):
        self.open('algo-display-learn')
        self.page.locator('#lessonNext').click()
        diagram = self.page.locator('.lesson-figure svg')
        self.assertEqual(diagram.locator('[data-flow-node="action"]').count(), 6)
        for step in ['Zahnbürste nehmen', 'Zahnpasta drauftun', '3 Minuten putzen',
                     'Mund ausspülen', 'Zahnbürste ausspülen', 'Zahnbürste wegstellen']:
            self.assertIn(step, diagram.text_content())
        self.page.evaluate('window.print=()=>{}')
        self.page.locator('#printNotebook').click()
        self.assertIn('Sechs Aktionsrechtecke', self.page.locator('#notebookPrint').text_content())
        self.assertIn('Mund ausspülen', self.page.locator('#notebookPrint').text_content())
        self.assert_pdf(self.page)
        self.page.evaluate('window.dispatchEvent(new Event("afterprint"))')
        self.open('algo-general-learn')
        self.page.locator('#printNotebook').click()
        self.assertIn('Schritt für Schritt:', self.page.locator('#notebookPrint').text_content())

    def test_independent_learning_without_external_material(self):
        import re
        references = re.compile(r'\b(?:Buch|Buchseite[n]?|Buchabbildung[en]*|Übungsheft|Unterlagen|Originalfoto|Lösungsseite)\b', re.I)
        data = self.page.evaluate('''()=>({
            tasks:tasks.map(t=>[t.title,t.description]),
            slides:tasks.filter(t=>t.mode==='Lernen').flatMap(t=>t.slides),
            notes:notebookEntries,
            captions:Object.values(lessonFigures).flatMap(group=>Object.values(group).map(v=>v.caption))
        })''')
        import json
        self.assertIsNone(references.search(json.dumps(data, ensure_ascii=False)))
        for task_id in ['algo-general-practice','algo-display-practice','algo-review-practice','algo-test']:
            self.open(task_id)
            self.assertIsNone(references.search(self.page.locator('#work').inner_text()))
        self.assertEqual(self.page.locator('a[href*="assets/sources"]').count(), 0)

    def test_mixed_question_bank_has_no_repeats_and_balanced_types(self):
        data = self.page.evaluate('''()=>({
            banks:[algoPracticeGeneral,algoPracticeDisplay,algoPracticeReview],
            prep:algoPreparation,test:algoTestQuestions,
            ids:tasks.map(t=>t.id)
        })''')
        self.assertNotIn('algo-source-practice',data['ids'])
        self.assertNotIn('algo-book-practice',data['ids'])
        self.assertEqual(sum(q.get('free',False) for bank in data['banks'] for page in bank for q in page),11)
        questions=[q for bank in data['banks'] for page in bank for q in page]+data['prep']+data['test']
        self.assertEqual(len(questions),47)
        self.assertEqual(len({q['id'] for q in questions}),47)
        self.assertEqual(len({q['q'].strip().lower() for q in questions}),47)
        self.assertEqual([len(bank) for bank in data['banks']],[3,3,3])
        for bank in data['banks']:
            flat=[q for page in bank for q in page]
            self.assertTrue(any(q.get('free') for q in flat))
            self.assertTrue(any(q.get('order') for q in flat))
            self.assertTrue(all(q.get('id') for q in flat))
        self.assertEqual(len(data['test']),20)
        self.assertFalse(any(q.get('free') for q in data['test']))
        self.assertTrue(all(q.get('choices') or q.get('order') or (q.get('parts') and all(p.get('choices') for p in q['parts'])) for q in data['test']))
        self.assertTrue(any(q.get('figure') for q in data['test']))

    def test_order_reset_list_grading_mobile_and_free_preview(self):
        self.open('algo-general-practice')
        self.page.locator('[data-order-q="2"]').first.click()
        self.assertTrue(self.page.locator('#q2').input_value())
        self.page.locator('[data-algo-order-reset="2"]').click()
        self.assertEqual(self.page.locator('#q2').input_value(),'')
        self.assertFalse(self.page.locator('[data-order-q="2"]').first.is_disabled())
        questions=self.page.evaluate('current.pages[0]')
        self.answer_questions(questions)
        self.page.locator('#q3').fill('<img src=x onerror=alert(1)>\nEine eigene Anweisung.')
        self.page.locator('#finish').click()
        self.assertEqual(self.page.locator('#resultBody .score').count(),0)
        self.assertEqual(self.page.locator('#resultBody img').count(),0)
        self.assertEqual(self.page.locator('.self-feedback .bad').count(),0)
        self.open('algo-display-practice')
        for stage in range(3):
            questions=self.page.evaluate('current.pages[practiceState.page]')
            self.answer_questions(questions)
            if stage==0:
                self.assertEqual(self.page.locator('#algoPreview3 [data-flow-edge="retry"]').count(),1)
            self.page.set_viewport_size({'width':390,'height':844})
            self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
            self.page.locator('#finish').click()
            if stage<2:self.page.locator('#nextLevel').click()
        self.assertEqual(self.page.locator('#resultBody .score').count(),0)
        self.assertIn('Alle Teile bearbeitet',self.page.locator('#resultBody').text_content())

    def test_embedded_figures_keep_unique_ids_after_lesson_navigation(self):
        self.open('algo-display-learn')
        self.page.evaluate('lessonPage=11;renderLesson()')
        self.page.locator('#lessonBack').click()
        self.page.locator('[data-task="algo-display-practice"]').click()
        self.answer_questions(self.page.evaluate('current.pages[0]'))
        self.page.locator('#finish').click()
        self.page.locator('#nextLevel').click()
        ids=self.page.locator('svg [id]').evaluate_all('(nodes)=>nodes.map(n=>n.id)')
        self.assertEqual(len(ids),len(set(ids)))
        missing=self.page.evaluate('''()=>[...document.querySelectorAll('svg path[marker-end]')].filter(p=>{
            const id=p.getAttribute('marker-end').match(/#([^)]*)/)[1];
            return !document.getElementById(id);
        }).length''')
        self.assertEqual(missing,0)
        self.page.emulate_media(media='print')
        self.assert_pdf(self.page)

    def test_notes_are_ordered_distinct_and_linked_to_lesson_pages(self):
        expected={
            'algo-general-learn':['Endlichkeit: ein erreichbares Ende','Die Sequenz','Algorithmen selbst entwickeln'],
            'algo-display-learn':['Flussdiagramme zeichnen','Zählschleife und Bedingungsschleife','Darstellungen sicher verstehen'],
        }
        for task_id,titles in expected.items():
            self.open(task_id)
            data=self.page.evaluate('''()=>({notes:notebookEntries[current.id],positions:notebookPositions[current.id],titles:current.slides.map(s=>s.title)})''')
            self.assertEqual([data['titles'][i] for i in data['positions']],titles)
            self.assertEqual(len({n['title'] for n in data['notes']}),3)
            self.assertEqual(len({n['text'] for n in data['notes']}),3)
            for position in data['positions']:
                self.page.evaluate('(n)=>{lessonPage=n;renderLesson()}',position)
                self.assertEqual(self.page.locator('.notebook-card').count(),1)
                self.assertTrue(self.page.locator('.notebook-card').inner_text())
            self.page.evaluate('window.print=()=>{}')
            self.page.locator('#printNotebook').click()
            self.assertEqual(self.page.locator('#notebookPrint .print-task').count(),3)
            self.assert_pdf(self.page)
            self.page.evaluate('window.dispatchEvent(new Event("afterprint"))')

    def test_summary_without_notes_and_notebook_drawing_tasks(self):
        self.open('algo-summary')
        for i in range(self.page.evaluate('current.slides.length')):
            self.page.evaluate('(i)=>{lessonPage=i;renderLesson()}',i)
            self.assertEqual(self.page.locator('.notebook-card, #printNotebook').count(),0)
        self.open('algo-display-learn')
        self.page.evaluate('lessonPage=12;renderLesson()')
        self.assertIn('Zeichne ins Heft',self.page.locator('.notebook-card').inner_text())
        self.assertEqual(self.page.locator('.notebook-drawing svg').count(),2)
        self.assertTrue(self.page.evaluate('''()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.length===new Set(ids).size}'''))
        self.page.evaluate('window.print=()=>{}')
        self.page.locator('#printNotebook').click()
        self.assertEqual(self.page.locator('#notebookPrint .notebook-drawing svg').count(),3)
        self.assertEqual(self.page.locator('#notebookPrint .notebook-draw-space').count(),3)
        self.assert_pdf(self.page)

    def test_release042_requested_scope_and_images(self):
        import re,json
        data=self.page.evaluate('''()=>({slides:[algoGeneralSlides,algoDisplaySlides,algoSummarySlides],banks:[algoPracticeGeneral,algoPracticeDisplay,algoPracticeReview],test:algoTestQuestions,notes:notebookEntries})''')
        self.assertIsNone(re.search(r'Bubble|Insertion|lineare Suche|Sortier|Suchen und Sortieren',json.dumps(data,ensure_ascii=False),re.I))
        self.assertEqual(len(data['slides'][0]),17)
        self.assertEqual([len(p) for p in data['banks'][0]],[4,4,3])
        self.assertNotIn('g12',[q['id'] for p in data['banks'][0] for q in p])
        self.assertNotIn('r09',[q['id'] for p in data['banks'][2] for q in p])
        self.open('algo-general-learn')
        self.assertEqual(self.page.locator('.illustration image[data-learning-image="building"]').count(),1)
        self.assertEqual(self.page.locator('.illustration image[data-learning-image="pancakes"]').count(),1)
        self.page.evaluate('lessonPage=2;renderLesson()')
        self.assertIn('Unklar',self.page.locator('.illustration svg').text_content())
        self.assertIn('Konkrete Schritte',self.page.locator('.illustration svg').text_content())
        self.page.evaluate('lessonPage=5;renderLesson()')
        self.assertTrue(self.page.locator('.learning-photo').evaluate('(i)=>i.complete&&i.naturalWidth>500'))
        self.assertEqual(self.page.locator('.illustration svg').count(),0)
        self.page.evaluate('lessonPage=9;renderLesson()')
        self.assertIn('Schulweg',self.page.locator('.notebook-card').inner_text())
        self.page.evaluate('lessonPage=15;renderLesson()')
        self.assertIn('mündlich',self.page.locator('#lesson').inner_text())
        self.assertTrue(self.page.locator('image[data-learning-image="handwash"]').is_visible())
        self.open('algo-review-practice')
        self.assertEqual(self.page.locator('#workHead h1').inner_text(),'Testvorbereitung')
        self.open('algo-test')
        self.assertEqual(self.page.evaluate('algoPhase'),'test')
        self.assertEqual(self.page.locator('#beginAlgoTest').count(),0)
        self.assertEqual(self.page.locator('.algo-task').count(),20)
        self.assertEqual(self.page.locator('.algo-task textarea, .algo-task input:not([type=hidden])').count(),0)

    def test_mobile_grade_display_and_notebook_print_cleanup(self):
        self.page.set_viewport_size({'width': 390, 'height': 844})
        self.catalog('algo-general-learn', grade=6)
        self.page.locator('[data-task="algo-general-learn"]').click()
        self.assertIn('Klasse 6', self.page.locator('#lessonContent').text_content())
        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        self.page.evaluate('window.print=()=>{}')
        self.page.locator('#printNotebook').click()
        self.assertEqual(self.page.locator('#notebookPrint .print-task').count(), 3)
        self.assertTrue(self.page.locator('body').evaluate('(b)=>b.classList.contains("print-notebook")'))
        self.page.evaluate('window.dispatchEvent(new Event("afterprint"))')
        self.assertFalse(self.page.locator('body').evaluate('(b)=>b.classList.contains("print-notebook")'))


if __name__ == '__main__':
    unittest.main()
