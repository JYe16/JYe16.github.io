# guise/

Project page for **How Narrative Wrapping Affects LLM Refusal: A Cross-Language Benchmark and
Defense** (GUISE benchmark, AXIS defense), served at <https://jye16.github.io/guise/>.

- Paper: <https://arxiv.org/abs/2610.11005>
- Code: <https://github.com/JYe16/GUISE_Official>
- Dataset (gated, access on request): <https://huggingface.co/datasets/xl-stack-lab/GUISE>

## Layout

```
index.html               the whole page, including every results table
static/css/style.css     GTK4 Adwaita theme, single light scheme, desktop only
static/js/data.js        angle-chart series for the mechanism section
static/js/main.js        chart construction, headerbar scroll state, scroll spy
static/figures/          figures exported from the paper's LaTeX source
```

Static files only, no build step. The stylesheet and scripts are linked with a `?v=` query; bump
it whenever they change, or browsers keep serving the cached copy next to a new `index.html`. Every asset path is relative, so the page works under the
`/guise/` subpath of the user site and from a local server at the repository root.

The stylesheet is **desktop only on purpose**: there is no breakpoint, `body` carries a
`min-width`, and a narrow window scrolls horizontally. The page carries a 16-column results table
and side-by-side figures that a phone layout would have to drop. There is also no dark scheme and
no theme toggle: the paper's figures have light backgrounds and sit on one light palette. The
mechanism section is a single dark band used as a layout break.

Section colour comes from a `data-accent` attribute (`cobalt`, `cinnabar`, `plum`, `celadon`, `ochre`,
`indigo`), which rebinds `--accent` for everything inside. The six accents are sampled from the
paper's figures in a blue-and-white porcelain scheme: cobalt is the aligned model and harm334 (and
carries navigation), cinnabar is AXIS and nothing else, plum the bare harmful request, celadon the
refusal panel, ochre the wrapper, indigo the DPO + commitment curve.

## Sources

Every number comes from the arXiv version of the LaTeX project (`arxiv/sections/*.tex`):
Table 1 from `tab:ladder`, Table 2 from `tab:baselines`, Table 3 from `tab:forces`, Table 4 from
`tab:register`, the angle charts from the appendix table `tab:wrapangle`, the remaining figures
from the text of Sections 3 to 7. The BibTeX entry is arXiv's own (`https://arxiv.org/bibtex/2610.11005`).

The case-study cards are a mechanical transcription of the paper's appendix `sections/11_case_study.tex`
(same abridged passages, same `[…]` cuts, same bold spans, same blind human labels); Table 5 is
`tab:crosscase`. The cards are collapsed by default and open on click.

## Figures

Rendered from the LaTeX sources with Ghostscript (run from `arxiv/figures/`):

```bash
GS="gs -dNOPAUSE -dBATCH -sDEVICE=png16m -dTextAlphaBits=4 -dGraphicsAlphaBits=4"
$GS -r400 -sOutputFile=overview.png               1_attack_overview/1_attack_overview_v3.pdf
$GS -r400 -sOutputFile=safety_usability_plane.png safety_usability_plane.pdf
$GS -r300 -sOutputFile=rotation_angle_steps.png   rotation_angle_steps.pdf
$GS -r300 -sOutputFile=readout_gain_lam01.png     readout_gain_lam01.pdf
```

The two wide figures are physically small in the PDF (one text width), so they need 400 dpi to
reach 2,200 to 2,600 px; the two plots render at 300 dpi.

To preview locally, serve the repository root so the `../` link to the homepage resolves:

```bash
python3 -m http.server 8000
# open http://localhost:8000/guise/
```
