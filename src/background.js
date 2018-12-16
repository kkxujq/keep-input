document.addEventListener('DOMContentLoaded', () => {
  // alert(`this control background, document title12: ${document.title}`);

  let status = true;

  localStorage.bkg = 'localStorage.bkg';

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'Hello') {
      sendResponse(`Hello from background. ${document.title}`);
    }
  });

  chrome.browserAction.setTitle({
    title: 'This is a new title \n\n\n- 左键点击可开关\n- 右键单单击可查看【选项】'
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color: '#0000FF'
  });
  chrome.browserAction.setBadgeText({
    text: 'on'
  });

  chrome.contextMenus.create({
    type: 'normal',
    title: '使用Google翻译……',
    contexts: ['selection'],
    id: 'cn',
    onclick: translate
  });

  

  function translate(info, tab) {
    var url = 'http://translate.google.com.hk/#auto/zh-CN/' + info.selectionText;
    window.open(url, '_blank');
  }

  setInterval(function () {
    status = !status;
    chrome.browserAction.setIcon({
      path: 'images/' + (status ? 'online.png' : 'offline.png')
    }, (e) => {
      console.log(e, 'ok');
    });
  }, 1000);
});

function httpRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      callback(true);
    }
  }
  xhr.onerror = function () {
    callback(false);
  }
  xhr.send();
}