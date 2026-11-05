"""Erstellt eine einzelne HTML-Datei ohne externe Dateien oder Laufzeitabhängigkeiten."""
from pathlib import Path
import argparse
import re
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

def build(destination=None):
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    version = re.search(r'Version\s+(0\.\d+)', html).group(1)
    def local(path):
        file = (ROOT / urlsplit(path).path).resolve()
        if not file.is_relative_to(ROOT):
            raise ValueError('Ressource außerhalb des Projekts')
        return file.read_text(encoding='utf-8')
    def style(match):
        css = re.sub(r'</style', lambda _: '<\\/style', local(match.group(1)), flags=re.I)
        return '<style>\n' + css + '\n</style>'
    def script(match):
        code = re.sub(r'</script', lambda _: '<\\/script', local(match.group(1)), flags=re.I)
        return '<script>\n' + code + '\n</script>'
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', style, html)
    html = re.sub(r'<script src="([^"]+)"></script>', script, html)
    static_html = re.sub(r'<script>.*?</script>', '', html, flags=re.S)
    if re.search(r'<script\b[^>]*\bsrc=', html, re.I) or re.search(r'<img\b[^>]*src=["\'](?!data:)|<link\b[^>]*href=', static_html, re.I):
        raise ValueError('Nicht eingebettete Ressource in der Ausgabedatei')
    target = Path(destination) if destination else ROOT / 'dist' / f'Frau-Salliers-Lernwelt-{version}.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding='utf-8')
    print(f'{target} ({target.stat().st_size} Bytes)')
    return target

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', help='Ausgabepfad der einzelnen HTML-Datei')
    build(parser.parse_args().output)
