function handleEquationClick(event) {
  event.stopPropagation();
  const equation = event.target.closest(".latex")

  if (equation) {
    // Wikipedia nicely packs a single <math> element inside each .mwe-math-element classes
    const tex = equation.getAttribute('alt');
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
  // In tao's website evey .latex class is a latex png image with TeX in alt
  document.querySelectorAll(".latex").forEach(element => {
    element.addEventListener("dblclick", handleEquationClick);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup)
} else {
  setup()
}
