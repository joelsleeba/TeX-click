// https://greasyfork.org/en/scripts/483133-stackexchange-tex-copy

function handleEquationClick(event) {
  event.stopPropagation();
  const equation = event.target.closest(".math-container")

  if (equation) {
    // Wikipedia nicely packs a single <math> element inside each .mwe-math-element classes
    const mathScript = equation.querySelector("script[type='math/tex']");
    const tex = mathScript.innerText
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

// // Attach the event listener to all descendants of .ltx_Math which are not themselves descendants of .ltx_equation
document.querySelectorAll(".math-container *").forEach(element => {
  element.addEventListener("click", handleEquationClick);
});
