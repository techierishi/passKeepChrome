var content = chrome.extension.getURL('js/content.js')
var script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', content)
document.body.appendChild(script)

var a = "Content Script ::";
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // alert(" Content Script :: " + JSON.stringify(request));
        if (request.type === "credentialCopied") {
            console.log('copyToClipboard-content', request);
            copyText(request.data.copiedText, "text/plain");
        }
    }
);


const copyText = function (str, mimeType) {
    document.oncopy = function (event) {
        event.clipboardData.setData(mimeType, str);
        event.preventDefault();
    };
    document.execCommand("copy", false, null);
}
/**
 * Copy text to clipboard
 * @deprecated
 * @param {Text to be copied} text 
 */
const copyTextToClipboard = function (text) {
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
