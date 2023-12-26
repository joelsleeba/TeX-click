// https://greasyfork.org/en/scripts/483099-ar5iv-tex-copy

function handleBlockEquationClick(event) {
  event.stopPropagation();
  const equation = event.target.closest(".ltx_equation")

  if (equation) {
    const mathElements = equation.querySelectorAll("math");
    const altTexts = Array.from(mathElements).map(element => {
      const altText = element.getAttribute("alttext");
      return altText.replace(/\\displaystyle/g, ""); // Remove '\displaystyle'
    });
    const tex = altTexts.join(" ");
    console.log(tex);

    // Do something with the joined TeX here, e.g., display it in an alert:
    navigator.clipboard.writeText(tex)
    .then(() => {
      // Copying succeeded
      console.log("TeX copied to clipboard");
    })
    .catch(err => {
      // Copying failed, handle the error
      console.error("Failed to copy TeX:", err);
    });
  } else {
    console.log("Clicked element is not within an .ltx_equation");
  }
}

function handleInlineEquationClick(event) {
  event.stopPropagation();
  const equation = event.target.closest("math")

  if (equation) {
    const tex = equation.getAttribute("alttext");
    console.log(tex);
    // Do something with the joined TeX here, e.g., display it in an alert:
    navigator.clipboard.writeText(tex)
    .then(() => {
      // Copying succeeded
      console.log("TeX copied to clipboard");
    })
    .catch(err => {
      // Copying failed, handle the error
      console.error("Failed to copy TeX:", err);
    });
  } else {
    console.log("Clicked element is not within an .ltx_equation");
  }
}


function setup() {

  // Add HTML5(ar5iv) link to arXiv source list for old preprints
  if (!document.getElementById('latexml-download-link')) {
    try {
      var prefix = location.pathname
      var ul = document.querySelector('.full-text ul')
      var li = document.createElement('li')
      var a = document.createElement('a')
      a.href = 'https://ar5iv.org' + prefix
      a.innerText = 'HTML5 (ar5iv)'
      a.className = 'abs-button'
      a.target = '_blank'
      li.appendChild(a)
      ul.appendChild(li)
      // var secondLastChild = ul.children[ul.children.length - 2]
      // secondLastChild.parentNode.insertBefore(li, secondLastChild);
    }catch(e) {
      console.log('error happened, skip.\n', e)
    }
  }

  // Attach the event listener to all descendants of .ltx_equationgroup
  document.querySelectorAll(".ltx_equation *").forEach(element => {
    element.addEventListener("dblclick", handleBlockEquationClick);
  });

  // Attach the event listener to all descendants of .ltx_Math which are not themselves descendants of .ltx_equation
  document.querySelectorAll(".ltx_Math[display='inline']:not(.ltx_equationgroup *) *").forEach(element => {
    element.addEventListener("dblclick", handleInlineEquationClick);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup)
} else {
  setup()
}
