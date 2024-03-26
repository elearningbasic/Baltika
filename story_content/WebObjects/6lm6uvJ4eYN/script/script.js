var minInput = document.querySelector(".minutes");
var secInput = document.querySelector(".seconds");
var maxTime = 180; //in second (max 599)
var currentTime = maxTime;
var min;
var sec;
var timerId = setInterval(timer, 1000/12);

function timer() {
  min = Math.floor(currentTime / 60);
  if (min < 10) {
    minInput.textContent = "0" + min;
  } else if (min === 0) {
    minInput.textContent = "00";
  }
  sec = currentTime - 60 * min;
  if (sec >= 10) {
    secInput.textContent = sec;
  } else if (sec < 10) {
    secInput.textContent = "0" + sec;
  }
  currentTime--;

  if (currentTime < 0) {
    clearInterval(timerId);
  }

  if (currentTime == 0) {
    setTimeout(function () {
      console.log("end");
    }, 2000);
  }
}
