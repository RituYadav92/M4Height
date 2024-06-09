const slider = document.getElementById('before-after-slider');
const before = document.getElementById('before-image');
const resizer = document.getElementById('resizer');

let active = false;

resizer.addEventListener('mousedown', function(e) {
  active = true;
  window.addEventListener('mousemove', moveResizer);
  window.addEventListener('mouseup', stopResize);
});

function moveResizer(e) {
  if (!active) return;
  let x = e.clientX - slider.getBoundingClientRect().left;
  if (x < 0 || x > slider.offsetWidth - 5) return;
  before.style.clipPath = `inset(0 ${slider.offsetWidth - x}px 0 0)`; // Adjusts the clip-path of the before image
  resizer.style.left = x + 'px'; // Adjusts the position of the resizer
}

function stopResize() {
  active = false;
  window.removeEventListener('mousemove', moveResizer);
  window.removeEventListener('mouseup', stopResize);
}

// Support for touch devices
resizer.addEventListener('touchstart', function(e) {
  active = true;
  window.addEventListener('touchmove', moveResizerTouch);
  window.addEventListener('touchend', stopResizeTouch);
});

function moveResizerTouch(e) {
  if (!active) return;
  let x;
  for (let i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].clientX - slider.getBoundingClientRect().left;
  }
  if (x < 0 || x > slider.offsetWidth) return;
  before.style.clipPath = `inset(0 ${slider.offsetWidth - x}px 0 0)`; // Adjusts the clip-path of the before image
  resizer.style.left = x + 'px'; // Adjusts the position of the resizer
}

function stopResizeTouch() {
  active = false;
  window.removeEventListener('touchmove', moveResizerTouch);
  window.removeEventListener('touchend', stopResizeTouch);
}
