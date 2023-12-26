// https://greasyfork.org/en/scripts/483131-wikipedia-tex-copy

function handleEquationClick(event) {
  event.stopPropagation();
  const equation = event.target.closest(".mwe-math-element")

  if (equation) {
    // Wikipedia nicely packs a single <math> element inside each .mwe-math-element classes
    const mathElement = equation.querySelector("math");
    const tex = mathElement.getAttribute('alttext');
    console.log(tex);

    // Do something with the joined alt text here, e.g., display it in an alert:
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
    console.log("Clicked element is not within an .mwe-math-element");
  }
}

function setup() {
  // Attach the event listener to all descendants of .ltx_Math which are not themselves descendants of .ltx_equation
  document.querySelectorAll(".mwe-math-element *").forEach(element => {
    element.addEventListener("dblclick", handleEquationClick);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup)
} else {
  setup()
}
