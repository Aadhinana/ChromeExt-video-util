chrome.runtime.sendMessage(
  { message: "Hello from the content script! 🎉" },
  function (response) {
    console.log("This is received from the bg script -> ");
    console.log(response.message);
  }
);

chrome.runtime.onMessage.addListener((req, sender, sendMessage) => {
  console.log(req.message);
  // console.log(sender); //sender => id -> id of the extension
  sendMessage("Got it!");
});
