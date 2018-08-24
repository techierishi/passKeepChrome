
import localStore from "../ext/storage";
import { Dropbox } from "dropbox";

const SyncData = function () {
    this.dropboxFilePath = "/credentials.json";
}

SyncData.prototype.loginToDropBox = function (params) {
    // Make sure following URL is whitelisted in manifest file
    const fullReceiverPath =
        "chrome-extension://bagihhjcblcabpangekfmkbdadpodgkf/pages/panel.html";
    const APIKEY = "t2lzjdzna6tgnmn";

    let dbx = new Dropbox({ clientId: APIKEY });
    const authUrl = dbx.getAuthenticationUrl(fullReceiverPath);
    window.open(authUrl, "_blank");
}

SyncData.prototype.exportData = function (params) {
    const dropboxToken = localStore.get("dropboxToken");
    if (dropboxToken) {
        const dbx = new Dropbox({ accessToken: dropboxToken });

        const uploadData = _mode => {
            dbx
                .filesUpload({
                    contents: JSON.stringify(params.savedCredentails),
                    path: this.dropboxFilePath,
                    mode: _mode
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        };

        dbx
            .filesDownload({
                path: this.dropboxFilePath
            })
            .then(function (response) {
                console.log(response);
                uploadData({ ".tag": "update", update: response.rev });
            })
            .catch(function (error) {
                console.error(error);
                uploadData({ ".tag": "add" });
            });
    } else {
        this.loginToDropBox({});
    }
}

SyncData.prototype.importData = function (params) {
    const dropboxToken = localStore.get("dropboxToken");
    if (dropboxToken) {
        const dbx = new Dropbox({ accessToken: dropboxToken });
        dbx
            .filesDownload({
                path: this.dropboxFilePath
            })
            .then(response => {
                console.log(response);
                const reader = new FileReader();
                reader.onload = () => {
                    console.log("Blob to text", reader.result);
                    params.blobConverted(reader.result);
                };
                reader.readAsText(response.fileBlob);
            })
            .catch(function (error) {
                console.error(error);
            });
    } else {
        this.loginToDropBox({});
    }
}

export default SyncData;