import os
import re
import subprocess
import tempfile
from pathlib import Path

from jinja2 import Environment, FileSystemLoader


LATEX_SPECIAL_CHARS = {
    '&': r'\&',
    '%': r'\%',
    '$': r'\$',
    '#': r'\#',
    '_': r'\_',
    '{': r'\{',
    '}': r'\}',
    '~': r'\textasciitilde{}',
    '^': r'\textasciicircum{}',
    '\\': r'\textbackslash{}',
}


def escape_latex(value):
    if value is None:
        return ''
    text = str(value)
    pattern = re.compile('|'.join(re.escape(key) for key in sorted(LATEX_SPECIAL_CHARS, key=len, reverse=True)))
    return pattern.sub(lambda match: LATEX_SPECIAL_CHARS[match.group()], text)


class TodoPdfConverter:
    template_name = 'todos_report.tex'

    def __init__(self, context):
        self.context = context

    def _get_template_environment(self):
        template_dir = Path(__file__).resolve().parent.parent / 'templates'
        env = Environment(loader=FileSystemLoader(str(template_dir)))
        env.filters['escape_latex'] = escape_latex
        return env

    def render_latex(self):
        env = self._get_template_environment()
        template = env.get_template(self.template_name)
        return template.render(self.context)

    def convert_to_pdf(self):
        latex_content = self.render_latex()

        with tempfile.TemporaryDirectory() as tmpdir:
            tex_path = Path(tmpdir) / 'report.tex'
            tex_path.write_text(latex_content, encoding='utf-8')

            try:
                subprocess.run(
                    ['pdflatex', '-interaction=nonstopmode', '-output-directory', tmpdir, str(tex_path)],
                    check=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                )
            except subprocess.CalledProcessError as exc:
                raise RuntimeError(f'PDF generation failed: {exc.stderr.decode("utf-8", errors="replace")}') from exc

            pdf_path = Path(tmpdir) / 'report.pdf'
            if not pdf_path.exists():
                raise RuntimeError('PDF file was not generated.')

            return pdf_path.read_bytes()
