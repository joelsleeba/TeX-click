// https://greasyfork.org/en/scripts/483133-stackexchange-tex-copy

// Need to get the innerText of span elements which follow immediately after these following classes
// MathJax_Display
// MathJax
//
function handleEquationClick(class_name, event) {
  event.stopPropagation();
  const equation = event.target.closest(class_name)
  const mathScript = equation.nextElementSibling

  if (mathScript.getAttribute('type').includes('tex')) {
    // Wikipedia nicely packs a single <math> element inside each .mwe-math-element classes
    const tex = mathScript.innerText
    console.log(tex);

    // Copy tex to clipboard
    navigator.clipboard.writeText(tex)
    .then(() => {
      // Copying succeeded
      console.log("TeX copied to clipboard");
    })
    .catch(err => {
      // Copying failed, handle the error
      console.error("Failed to copy TeX :", err);
    });
  } else {
    console.log("Clicked element does not contain TeX script");
  }
}

function setup() {
  // Attach the event listener to all descendants of MathJax_Display
  document.querySelectorAll(".MathJax_Display *").forEach(element => {
    element.addEventListener("dblclick", handleEquationClick.bind(null, '.MathJax_Display'));
  });

  // Attach the event listener to all descendants of .MathJax which are not themselves descendants of .MathJax_Display
  document.querySelectorAll(".MathJax:not(.MathJax_Display *) *").forEach(element => {
    element.addEventListener("dblclick", handleEquationClick.bind(null, '.MathJax'));
  });
}

// For some reason this condition seems to be failing
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', setup)
// } else {
  setup()
// }
