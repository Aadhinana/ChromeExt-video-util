// Handle submit in form
console.log("Form");
console.log("This loads only once?");

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let speed;

function handleSubmit(e) {
  e.preventDefault();
  speed = e.target.querySelector("#speed").value;
  console.log(`${speed} is set as speed`);
  // console.log(speed);
  // console.log(`Submitted form with value ${speed}`);
  // chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  //   const tab = tabs[0];
  //   console.log(tab);
  //   console.log(tab.title);
  //   chrome.tabs.sendMessage(tab.id, {
  //     message: `Hello I'm trying to send you stuff!`,
  //   });
  // });
}

// Make sure content.js is loaded before this
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message);
  // console.log(sender); // sender => id, origin, tab: Tab, url
  sendResponse({ message: "Hello from the BG script 🎉" });
});

chrome.tabs.onUpdated.addListener(function (tabId, { status }, tab) {
  if (status === "complete") {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(
        tab.id,
        {
          message: `Hello I'm trying to send you stuff!`,
        },
        (res) => {
          console.log(res);
        }
      );
    });
  }
});
