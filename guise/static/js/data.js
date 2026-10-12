/* Chart series for the mechanism section. Every number is from the paper's
   appendix table "tab:wrapangle": angle (degrees) between the harmful-minus-benign
   contrast and the modern refusal direction of the base model, last token,
   at each model's diagnostic layer. `hot` marks wrapped sets. */
window.DATA = {
  angleMax: 90,
  charts: [
    {
      title: 'Qwen3-1.7B',
      unit: 'layer 24 · degrees',
      rows: [
        { name: 'Bare English',       value: 29.9 },
        { name: 'Bare Classical',     value: 38.0 },
        { name: 'harm334',            value: 79.4, hot: true },
        { name: 'Dialogue',           value: 61.2, hot: true },
        { name: 'Historiography',     value: 80.7, hot: true },
        { name: 'Statute',            value: 75.0, hot: true }
      ],
      foot: 'Bare modern requests sit 6–10° from the refusal direction.'
    },
    {
      title: 'Qwen3-4B',
      unit: 'layer 19 · degrees',
      rows: [
        { name: 'Bare English',       value: 26.4 },
        { name: 'Bare Classical',     value: 31.0 },
        { name: 'harm334',            value: 55.3, hot: true },
        { name: 'Dialogue',           value: 48.9, hot: true },
        { name: 'Historiography',     value: 62.4, hot: true },
        { name: 'Statute',            value: 61.6, hot: true }
      ],
      foot: 'Every wrapped set lies 48.9–62.4° off the refusal direction.'
    },
    {
      title: 'GLM-4-9B',
      unit: 'layer 21 · degrees',
      rows: [
        { name: 'Bare English',       value: 13.0 },
        { name: 'Bare Classical',     value: 33.2 },
        { name: 'harm334',            value: 54.0, hot: true },
        { name: 'Dialogue',           value: 59.0, hot: true },
        { name: 'Historiography',     value: 52.4, hot: true },
        { name: 'Statute',            value: 54.4, hot: true }
      ],
      foot: 'A second model family shows the same split between bare and wrapped.'
    }
  ]
};
