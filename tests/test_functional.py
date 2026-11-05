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
        self.assertEqual(self.page.goto(self.url).status, 200)

    def tearDown(self):
        self.page.close()
        self.assertEqual(self.errors, [], 'Keine unbehandelten JavaScript-Fehler')

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
        self.page.locator(f'[data-task="{task_id}"]').click()

    def answer_questions(self, questions, prefix='q'):
        for i, question in enumerate(questions):
            field = self.page.locator(f'#{prefix}{i}')
            if question.get('order'):
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
        self.assertEqual(len(ids), 15)
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
                    self.answer_questions(questions)
                    self.page.locator('#finish').click()
                    self.assertTrue(self.page.locator('#results').is_visible())
                    self.assert_result_print()
                    self.assertIn(f'{len(questions)} / {len(questions)} Punkte', self.page.locator('#resultBody').inner_text())
                    if i < len(pages) - 1:
                        self.page.locator('#nextLevel').click()
                maximum = sum(map(len, pages))
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
                    if slide.get('visual'):
                        figure = self.page.locator('.lesson-figure svg')
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
        self.assertEqual(total, 35)

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
        self.assertIn('sechs Aktionen', self.page.locator('#notebookPrint').text_content())
        self.assertIn('Mund ausspülen', self.page.locator('#notebookPrint').text_content())
        self.assert_pdf(self.page)
        self.page.evaluate('window.dispatchEvent(new Event("afterprint"))')
        self.open('algo-general-learn')
        self.page.locator('#printNotebook').click()
        self.assertIn('Schritt für Schritt:', self.page.locator('#notebookPrint').text_content())

    def test_source_workbook_first_seven_tasks_print_and_restart(self):
        self.open('algo-source-practice')
        self.assertEqual(self.page.locator('.source-workbook section.question').count(), 14)
        self.page.locator('#finish').click()
        self.assertIn('0 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.assertIn('mindestens fünf', self.page.locator('#wb-feedback-tea').text_content())
        for i, answer in enumerate(['Ja','Nein','Ja','Ja','Nein']):
            self.page.locator(f'#wb-class-{i}').select_option(answer)
        tea = 'Wasser einfüllen.\nWasser erhitzen.\nTeebeutel in eine Tasse legen.\nWasser eingießen.\nTee ziehen lassen.'
        self.page.locator('#wb-tea').fill(tea)
        for i in range(3):
            self.page.locator(f'#wb-clear-{i}').fill('Eine konkrete Anweisung zur Selbstkontrolle.')
        for i, rank in enumerate(['5','1','3','4','2']):
            self.page.locator(f'#wb-jam-{i}').select_option(rank)
        for i, symbol in enumerate(['Raute','Oval','Rechteck']):
            self.page.locator(f'#wb-symbol-{i}').select_option(symbol)
        self.page.locator('#wb-count').fill('6')
        actions=['Stundenplan für morgen ansehen','Benötigte Bücher auswählen',
                 'Bücher <morgen> einpacken','Gefülltes Federmäppchen einpacken']
        for i, action in enumerate(actions):
            self.page.locator(f'#wb-action-{i}').fill(action)
        self.assertEqual(self.page.locator('#workbookDiagram [data-flow-node="action"]').count(), 4)
        self.assertIn('Bücher <morgen> einpacken', self.page.locator('#workbookDiagram').text_content())
        self.assertEqual(self.page.locator('#workbookDiagram morgen').count(), 0)
        self.page.locator('#wb-add-action').click()
        self.assertEqual(self.page.locator('#workbookActions input').count(), 5)
        self.page.locator('#wb-remove-action').click()
        self.assertEqual(self.page.locator('#workbookActions input').count(), 4)
        self.assertTrue(self.page.locator('#wb-remove-action').is_disabled())
        self.page.locator('#finish').click()
        self.assertIn('10 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.assertIn('keine inhaltliche Bewertung', self.page.locator('#wb-feedback-tea').text_content())
        self.assertIn('nicht automatisch bewertet', self.page.locator('#wb-feedback-diagram').text_content())
        self.assertEqual(self.page.locator('#wb-tea').input_value(), tea)
        self.page.set_viewport_size({'width':390,'height':844})
        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        self.page.evaluate('window.print=()=>{window.sourcePrintCalled=true}')
        self.page.locator('#workbookPrint').click()
        self.assertTrue(self.page.evaluate('window.sourcePrintCalled'))
        self.page.emulate_media(media='print')
        self.assertTrue(self.page.locator('[data-print-for="wb-tea"]').is_visible())
        self.assertIn(tea, self.page.locator('[data-print-for="wb-tea"]').text_content())
        self.assertTrue(self.page.locator('#workbookDiagram svg').is_visible())
        self.assertFalse(self.page.locator('#workbookActions').is_visible())
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')
        self.page.locator('#reset').click()
        self.assertEqual(self.page.locator('#wb-tea').input_value(), '')
        self.assertEqual(self.page.locator('#workbookActions input').count(), 4)
        self.assertIn('Noch nicht ausgewertet', self.page.locator('#workbookSummary').text_content())
        self.open('binary-practice')
        self.assertTrue(self.page.locator('#q0').is_visible())
        self.assertEqual(self.page.locator('.source-workbook').count(), 0)

    def test_source_conditions_loops_and_five_card_sorting(self):
        self.open('algo-display-learn')
        slides = self.page.evaluate('current.slides')
        for i, slide in enumerate(slides):
            if slide['title'] == 'Wenn – dann – sonst':
                self.assertIn('Zur Schule gehen', self.page.locator('.lesson-figure').text_content())
            if slide['title'] == 'Schleifen: etwas wiederholen':
                text = self.page.locator('.lesson-figure').text_content()
                for word in ['Aufgaben','fertig?','Eine Aufgabe','Spielen']:
                    self.assertIn(word, text)
            if slide['title'] in ['Bubble Sort','Insertion Sort']:
                rows = self.page.locator('[data-sort-row]')
                self.assertEqual(rows.count(), 5)
                expected = [[5,2,4,1,3],[2,5,4,1,3],[2,4,5,1,3]]
                expected += [[2,4,1,5,3],[2,4,1,3,5]] if slide['title']=='Bubble Sort' else [[1,2,4,5,3],[1,2,3,4,5]]
                for n, values in enumerate(expected):
                    self.assertEqual(rows.nth(n).locator('text').all_text_contents(), [str(v) for v in values])
            if i < len(slides)-1:
                self.page.locator('#lessonNext').click()
        self.open('algo-source-practice')
        for id_,text in [('wb-weather-if','das Wetter schön ist'),('wb-weather-yes','spiele ich draußen'),('wb-weather-no','lese ich drinnen'),('wb-traffic-question','Ist die Ampel grün?'),('wb-traffic-yes','Losgehen'),('wb-traffic-no','Warten')]:
            self.page.locator('#'+id_).fill(text)
        self.assertEqual(self.page.locator('#workbookTrafficDiagram [data-flow-node="decision"]').count(), 1)
        self.assertEqual(self.page.locator('#workbookTrafficDiagram [data-flow-edge="retry"]').count(), 1)
        for label in ['Ist die Ampel grün?','Losgehen','Warten','Start','Ende','Ja','Nein']:
            self.assertIn(label, self.page.locator('#workbookTrafficDiagram').text_content())
        self.page.locator('#wb-loop-count').fill('3')
        self.page.locator('#finish').click()
        self.assertTrue(self.page.locator('#wb-feedback-loop').evaluate('(el)=>el.classList.contains("bad")'))
        self.page.locator('#wb-loop-count').fill('4')
        for id_,row in [('wb-sort-1','2,1,4,3,5'),('wb-sort-2','[2, 1, 3, 4, 5]'),('wb-sort-3','1 2 3 4 5'),('wb-sort-final','1;2;3;4;5')]:
            self.page.locator('#'+id_).fill(row)
        for i,answer in enumerate(['Ja','Nein','Ja','Ja','Nein']):
            self.page.locator(f'#wb-class-{i}').select_option(answer)
        for i,rank in enumerate(['5','1','3','4','2']):
            self.page.locator(f'#wb-jam-{i}').select_option(rank)
        for i,symbol in enumerate(['Raute','Oval','Rechteck']):
            self.page.locator(f'#wb-symbol-{i}').select_option(symbol)
        self.page.locator('#wb-count').fill('6')
        self.page.locator('#finish').click()
        self.assertIn('15 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.assertIn('nicht automatisch inhaltlich bewertet', self.page.locator('#wb-feedback-weather').text_content())
        self.assertIn('nicht automatisch inhaltlich bewertet', self.page.locator('#wb-feedback-traffic').text_content())
        self.page.locator('#wb-sort-1').fill('2,4,1,3,5')
        self.page.locator('#finish').click()
        self.assertIn('14 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.page.set_viewport_size({'width':390,'height':844})
        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        self.page.evaluate('window.print=()=>{}')
        self.page.locator('#workbookPrint').click()
        self.page.emulate_media(media='print')
        self.assertTrue(self.page.locator('#workbookTrafficDiagram svg').is_visible())
        self.assertIn('4', self.page.locator('[data-print-for="wb-loop-count"]').text_content())
        self.assertIn('1;2;3;4;5', self.page.locator('[data-print-for="wb-sort-final"]').text_content())
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')
        self.page.locator('#reset').click()
        self.assertEqual(self.page.locator('#wb-loop-count').input_value(), '')
        self.assertEqual(self.page.locator('#wb-sort-final').input_value(), '')

    def test_source_insertion_search_detective_glossary_and_solutions(self):
        self.open('algo-display-learn')
        index = self.page.evaluate('current.slides.findIndex(s=>s.title==="Lineare Suche")')
        for _ in range(index):
            self.page.locator('#lessonNext').click()
        cards = self.page.locator('[data-search-card]')
        self.assertEqual(cards.evaluate_all('(nodes)=>nodes.map(n=>n.dataset.searchCard)'), ['7','3','9','1','5','8','2'])
        self.assertEqual(self.page.locator('[data-search-checked="true"]').count(), 5)
        self.assertEqual(self.page.locator('[data-search-checked="false"]').count(), 2)
        self.open('algo-source-practice')
        self.assertEqual(self.page.locator('.workbook-glossary dt').count(), 13)
        self.assertIn('Lineare Suche', self.page.locator('.workbook-glossary').text_content())
        self.assertEqual(self.page.locator('#wb-tea + .workbook-print-value + .workbook-feedback + details li').count(), 7)
        for i,row in enumerate(['1,4,5,2,3','1,4,5,2,3','1,2,4,5,3','1,2,3,4,5']):
            self.page.locator(f'#wb-insertion-{i}').fill(row)
        self.page.locator('#wb-search-cards').fill('4\n9\n2\n7\n6')
        self.page.locator('#wb-search-count').fill('5')
        self.page.locator('#wb-detective').fill('Schnürsenkel aufnehmen. Schlaufen bilden. Schleife zubinden. Festziehen.')
        self.page.locator('#finish').click()
        self.assertIn('6 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.assertIn('Reihenfolge unverändert', self.page.locator('#wb-feedback-insertion').text_content())
        self.assertIn('nicht automatisch inhaltlich bewertet', self.page.locator('#wb-feedback-detective').text_content())
        self.page.locator('#wb-insertion-1').fill('1,2,3,4,5')
        self.page.locator('#wb-search-cards').fill('4,9,2,7,6,1,5')
        self.page.locator('#finish').click()
        self.assertIn('4 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.assertTrue(self.page.locator('#wb-feedback-search').evaluate('(el)=>el.classList.contains("bad")'))
        self.page.locator('#wb-insertion-1').fill('1,4,5,2,3')
        self.page.locator('#wb-search-cards').fill('4,9,2,7,6')
        for i,answer in enumerate(['Ja','Nein','Ja','Ja','Nein']):
            self.page.locator(f'#wb-class-{i}').select_option(answer)
        for i,rank in enumerate(['5','1','3','4','2']):
            self.page.locator(f'#wb-jam-{i}').select_option(rank)
        for i,symbol in enumerate(['Raute','Oval','Rechteck']):
            self.page.locator(f'#wb-symbol-{i}').select_option(symbol)
        for id_,answer in [('wb-count','6'),('wb-loop-count','4'),('wb-sort-1','2,1,4,3,5'),('wb-sort-2','2,1,3,4,5'),('wb-sort-3','1,2,3,4,5'),('wb-sort-final','1,2,3,4,5')]:
            self.page.locator('#'+id_).fill(answer)
        self.page.locator('#finish').click()
        self.assertIn('21 / 21 richtig', self.page.locator('#workbookSummary').text_content())
        self.page.set_viewport_size({'width':390,'height':844})
        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        self.page.evaluate('window.print=()=>{}')
        self.page.locator('#workbookPrint').click()
        self.page.emulate_media(media='print')
        for id_ in ['wb-insertion-0','wb-search-cards','wb-search-count','wb-detective']:
            self.assertTrue(self.page.locator(f'[data-print-for="{id_}"]').is_visible())
        self.assertTrue(self.page.locator('.workbook-glossary').is_visible())
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')
        self.page.locator('#reset').click()
        for id_ in ['wb-insertion-0','wb-search-cards','wb-search-count','wb-detective']:
            self.assertEqual(self.page.locator('#'+id_).input_value(), '')

    def test_book_tasks_conditions_story_photos_and_print(self):
        self.open('algo-book-practice')
        self.assertEqual(self.page.locator('.book-workbook section.question').count(), 7)
        for reference in self.page.locator('.book-reference').all():
            reference.evaluate('(el)=>el.open=true')
            reference.locator('img').scroll_into_view_if_needed()
        self.page.wait_for_function('[...document.querySelectorAll(".book-reference img")].every(i=>i.complete&&i.naturalWidth>0)')
        self.assertEqual(self.page.locator('.book-reference img').count(), 4)
        self.page.locator('#finish').click()
        self.assertIn('0 / 4 richtig', self.page.locator('#bookSummary').text_content())
        for i,answer in enumerate(['Eindeutigkeit','Ausführbarkeit','Endlichkeit']):
            self.page.locator(f'#bk-condition-{i}').select_option(answer)
        for i,rank in enumerate(['1','4','2','3']):
            self.page.locator(f'#bk-story-{i}').select_option(rank)
        story=self.page.locator('#bookStoryDiagram [data-flow-node="action"]')
        self.assertEqual(story.count(), 4)
        self.assertIn('Bahnticket', self.page.locator('#bookStoryDiagram').text_content())
        for i,command in enumerate(['Gehe geradeaus zum Kühlregal.','Biege nach dem Kühlregal links ab.','Bleibe vor dem Nudelregal stehen.']):
            self.page.locator(f'#bk-command-{i}').fill(command)
        free=['bk-hands-description','bk-hands-commands','bk-hands-properties','bk-hands-swap','bk-escape','bk-directions-review','bk-maze','bk-eva','bk-program']
        for id_ in free:
            self.page.locator('#'+id_).fill('Meine eigene Beschreibung und Begründung.')
        self.page.locator('#finish').click()
        self.assertIn('4 / 4 richtig', self.page.locator('#bookSummary').text_content())
        self.assertIn('nicht automatisch inhaltlich bewertet', self.page.locator('#bookSummary').text_content())
        self.page.locator('#bk-story-0').select_option('2')
        self.page.locator('#finish').click()
        self.assertIn('3 / 4 richtig', self.page.locator('#bookSummary').text_content())
        self.assertEqual(self.page.locator('#bookStoryDiagram svg').count(), 0)
        self.page.locator('#bk-story-0').select_option('1')
        self.page.set_viewport_size({'width':390,'height':844})
        self.assertTrue(self.page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
        self.page.evaluate('window.print=()=>{window.bookPrinted=true}')
        self.page.locator('#bookPrint').click()
        self.assertTrue(self.page.evaluate('window.bookPrinted'))
        self.page.emulate_media(media='print')
        self.assertTrue(self.page.locator('[data-print-for="bk-maze"]').is_visible())
        self.assertTrue(self.page.locator('#bookCommandsDiagram svg').is_visible())
        self.assertFalse(self.page.locator('.book-reference').first.is_visible())
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')
        self.page.locator('#bookPrintSources').check()
        self.page.locator('#bookPrint').click()
        self.page.emulate_media(media='print')
        self.assertTrue(self.page.locator('.book-reference').first.is_visible())
        self.assert_pdf(self.page)
        self.page.emulate_media(media='screen')
        self.assertFalse(self.page.locator('body').evaluate('(el)=>el.classList.contains("print-book-sources")'))
        self.page.locator('#reset').click()
        self.assertEqual(self.page.locator('#bk-maze').input_value(), '')
        self.assertEqual(self.page.locator('#bk-condition-0').input_value(), '')
        self.assertFalse(self.page.locator('#bookPrintSources').is_checked())
        self.open('algo-source-practice')
        self.assertEqual(self.page.locator('.source-workbook section.question').count(), 14)
        self.assertEqual(self.page.locator('.book-workbook').count(), 0)

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
