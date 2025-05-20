// Create countdown timer display
const timerDiv = document.createElement('div');
timerDiv.textContent = 'Download buttons in 8s';
Object.assign(timerDiv.style, {
  position: 'fixed',
  top: '10px',
  right: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '4px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  zIndex: 10000
});
document.body.appendChild(timerDiv);

// Start countdown
let secondsLeft = 8;
const countdown = setInterval(() => {
  secondsLeft--;
  if (secondsLeft <= 0) {
    clearInterval(countdown);
    document.body.removeChild(timerDiv); // remove timer from screen
    injectDownloadButtons(); // call main function
  } else {
    timerDiv.textContent = `Download buttons in ${secondsLeft}s`;
  }
}, 1000);

// Main logic to add download buttons
function injectDownloadButtons() {
  document.querySelectorAll('video').forEach((video, index) => {
    const parentDiv = video.closest('div');
    if (!parentDiv) return;

    if (window.getComputedStyle(parentDiv).position === 'static') {
      parentDiv.style.position = 'relative';
    }

    const button = document.createElement('button');
    button.textContent = 'Download Video';
    Object.assign(button.style, {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '8px 12px',
      zIndex: 999,
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    });

    button.addEventListener('click', () => {
      const videoSrc = video.currentSrc || video.src;
      if (!videoSrc) {
        alert('No video source found!');
        return;
      }

      const a = document.createElement('a');
      a.href = videoSrc;
      a.download = `video-${index + 1}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    parentDiv.appendChild(button);
  });
}
