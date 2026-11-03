"""Validate the static release's links, metadata, and local assets without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.errors = []
        self.h1_count = 0
        self.json_ld = []
        self.reading_json = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.h1_count += 1
        for key in ('href', 'src'):
            if attrs.get(key):
                self.references.append(attrs[key])
        if tag == 'img' and 'alt' not in attrs:
            self.errors.append('Image needs an alt attribute: ' + attrs.get('src', ''))
        if tag == 'a' and attrs.get('target') == '_blank':
            if 'noopener' not in attrs.get('rel', ''):
                self.errors.append('External tab needs noopener: ' + attrs.get('href', ''))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.reading_json = True
        if tag == 'meta' and attrs.get('property') == 'og:image':
            self.references.append('images/' + attrs['content'].rsplit('/', 1)[-1])

    def handle_data(self, data):
        if self.reading_json:
            self.json_ld.append(data)

    def handle_endtag(self, tag):
        if tag == 'script':
            self.reading_json = False


parser = SiteParser()
parser.feed((ROOT / 'index.html').read_text())
assert parser.h1_count == 1, 'Expected one primary heading'
assert len(parser.ids) == len(set(parser.ids)), 'Duplicate HTML IDs'
for ref in parser.references:
    url = urlsplit(ref)
    if url.scheme or url.netloc:
        continue
    if url.path:
        assert not url.path.startswith('/'), f'Use a relative path for Pages: {ref}'
        assert (ROOT / unquote(url.path)).is_file(), f'Missing asset: {ref}'
    if url.fragment and not url.path:
        assert url.fragment in parser.ids, f'Missing anchor: {ref}'
assert not parser.errors, '\n'.join(parser.errors)
json.loads(''.join(parser.json_ld))
ET.parse(ROOT / 'sitemap.xml')
assert (ROOT / 'images/Sabin_Raut_Resume.pdf').read_bytes().startswith(b'%PDF')
print(f'PASS: {len(parser.references)} references, {len(parser.ids)} unique IDs, structured data, sitemap, image descriptions, and resume PDF.')
