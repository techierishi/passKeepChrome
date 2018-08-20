console.log('content-script!')

/*
const myNewStuff = `
<div id="passKeepAler" style="
    width: 150px;
    height: 80px;
    position: fixed;
    right: 0;
    top: 0;
    background: #0ea7ca;
    z-index: 99999;
    border: 1px solid #0f9bbb;
    border-radius: 5px;
    padding: 5px;
    color: #FFF;
    margin: 5px;
    box-shadow: -4px 6px 10px #999;
    "> 

    <button class="passKeepSaveBttn" style="
    width: 100%;
    background: #2ad9ea;
    border: 1px solid #2ad9ea;
    color: #FFF;
    height: 35px;
    box-shadow: 1px 1px 5px #999;"> Save </button>

    <p style="font-size : 10px;"> Click on save button to save credentials of this site. </p>
</div>
`;

let elem = document.querySelector('body');
elem.innerHTML = elem.innerHTML + myNewStuff;

setTimeout(() => {
    var elem = document.querySelector('#passKeepAler');
    elem.parentNode.removeChild(elem);
}, 5000);
*/

/* */

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "credentialCopied") {
            console.log('copyToClipboard-content',request);

            copyTextToClipboard(request.copiedText);
        }
    }
);

function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");
  
    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;
  
    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);
  
    //Select all the text!
    copyFrom.select();
  
    //Execute command
    document.execCommand('copy');
  
    //(Optional) De-select the text using blur(). 
    copyFrom.blur();
  
    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }