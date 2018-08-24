console.log('background !')

  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
  
      console.log('chrome.tabs.onUpdated',tabId, changeInfo, tab)
  
    }
  });

  /* The Web Request API */
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if(details.method == "POST") {
        let formData = details.requestBody.formData;
        let cancel = false;
  
        console.log('chrome.webRequest.onBeforeRequest',formData);
        /* if(formData) {
          Object.keys(formData).forEach(key => {
            formData[key].forEach(value => {
              if(value.includes("foo")) {
                cancel = true;
              }
            });
          });
        } */

        chrome.runtime.sendMessage({
            type: "loginPost", 
            data: {
                formData: formData
            }
        });
  
        return {cancel: cancel};
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
  );
  