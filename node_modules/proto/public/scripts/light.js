document.addEventListener('DOMContentLoaded', function () {
  console.log("Mounting Light Mode event listener");

  const label = document.querySelector('label');
  if (!label) {
    console.error("Label not found!");
    return;
  }

  label.onchange = function (event) {
    event.stopPropagation();
    const isChecked = event.target.checked;

    const customEvent = new CustomEvent('lightmode:toggle', {
      bubbles: true,
      detail: { checked: isChecked }
    });

    this.dispatchEvent(customEvent);
  };

  document.body.addEventListener('lightmode:toggle', function (event) {
    if (event.detail.checked) {
      event.currentTarget.classList.add('light-mode');
    } else {
      event.currentTarget.classList.remove('light-mode');
    }
  });

  console.log("Light Mode event listener mounted");
});
