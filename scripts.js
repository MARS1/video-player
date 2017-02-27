// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const screenToggle = player.querySelector('.toggle__screen');
const screenStandard = player.querySelector('.standard');

 // Build Functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method](); // this is a shorcut for the code below and requires a const method above that provides that if/else statement
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name);
  // console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
   console.log(e);
 }

 function expandFullScreen() {
   screenToggle.classList.add('standard');
   const screenStandard = document.querySelector('.standard');
   player.classList.add('standard__screen');
   screenStandard.addEventListener('click', reduceFullScreen);
  //  player.style.position = 'absolute';
  //  player.style.top = 0;
  //  player.style.bottom = 0;
  //  player.style.right = 0;
  //  player.style.left = 0;
  //  player.style.maxWidth = `none`;
   console.log('expandFullScreen fired');
 }

function reduceFullScreen() {
  
  screenToggle.classList.remove('standard');
  player.classList.remove('standard__screen');
  console.log('reduceFullScreen fired');
  return;
}

// Hook up Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

screenToggle.addEventListener('click', expandFullScreen);
