// SEND MESSAGES TO BG
// chrome.runtime.sendMessage(
//   { message: "Hello from the content script! 🎉" },
//   function (response) {
//     console.log("This is received from the bg script -> ");
//     console.log(response.message);
//   }
// );
console.log("Content script");

const GLOBAL_STATE = {
  speed: 1,
};

// RECEIVE MESSAGES FROM BG
chrome.runtime.onMessage.addListener((req, sender, sendMessage) => {
  console.log(req);
  GLOBAL_STATE.speed = req.speed;
  // console.log(sender); //sender => id -> id of the extension
  sendMessage("Got it!");
  return true;
});

function keepChecking() {
  const video = document.querySelector("video");
  if (!video) return;
  console.log(video.playbackRate + " current playback rate this is");
  if (video.playbackRate == GLOBAL_STATE.speed) return;
  video.playbackRate = GLOBAL_STATE.speed;
}

setInterval(keepChecking, 2000);
