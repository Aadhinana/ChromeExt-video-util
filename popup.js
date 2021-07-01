// Handle submit in form
console.log("Form");
console.log("This loads only once?");

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let speed = e.target.querySelector("#speed").value;
  console.log(`${speed} is set as speed`);

  // Send the speed set over to the content script
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {
      message: `Hello I'm trying to send you stuff!`,
      speed,
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message);
  // console.log(sender); // sender => id, origin, tab: Tab, url
  sendResponse({ message: "Hello from the BG script 🎉" });
});

// WAIT FOR THE TAB TO LOAD ITS CONTENT SCRIPT THEN SEND IT MESSAGES.
// chrome.tabs.onUpdated.addListener(function (tabId, { status }, tab) {
//   console.log("Sending");
//   if (status === "complete") {
//     chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//       const tab = tabs[0];
//       chrome.tabs.sendMessage(tab.id, {
//         speed,
//       });
//     });
//   }
// });
