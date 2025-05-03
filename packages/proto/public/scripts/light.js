// document.addEventListener('DOMContentLoaded', function () {
//   console.log("Mounting Light Mode event listener");

//   const label = document.querySelector('label');
//   if (!label) {
//     console.error("Label not found!");
//     return;
//   }

//   label.onchange = function (event) {
//     event.stopPropagation();
//     const isChecked = event.target.checked;

//     const customEvent = new CustomEvent('lightmode:toggle', {
//       bubbles: true,
//       detail: { checked: isChecked }
//     });

//     this.dispatchEvent(customEvent);
//   };

//   document.body.addEventListener('lightmode:toggle', function (event) {
//     if (event.detail.checked) {
//       event.currentTarget.classList.add('light-mode');
//     } else {
//       event.currentTarget.classList.remove('light-mode');
//     }
//   });

//   console.log("Light Mode event listener mounted");
// });


document.addEventListener('DOMContentLoaded', function () {
  console.log("Mounting Light Mode event listener");

  const toggle = document.querySelector('#lightmode-toggle');
  const body = document.body;

  if (!toggle) {
    console.error("Light mode toggle not found!");
    return;
  }

  // 1. On load: check stored preference
  const storedPreference = localStorage.getItem('light-mode');
  if (storedPreference === 'true') {
    body.classList.add('light-mode');
    toggle.checked = true;
  }

  // 2. On toggle: update body class + store preference
  toggle.addEventListener('change', function (event) {
    const isChecked = event.target.checked;

    if (isChecked) {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }

    localStorage.setItem('light-mode', isChecked);
  });
});

