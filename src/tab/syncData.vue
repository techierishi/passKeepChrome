<template>
  <div class="row">
    <div class="col-sm-4"   >
      <mt-card >
        <p>
          Sync Credential Data
        </p>
    <div class="btn-demo">
        <mt-button bg="bluegray" @click="exportData()">Export</mt-button>
        <mt-button @click="importData()" bg="green">Import</mt-button>
    </div>
    </mt-card>


    </div>

    <mt-dialog title="Detail" v-model="showDialog">
      <div class="row">

      </div>
    </mt-dialog>
  </div>
</template>

<script>
import CredDao from "../ext/credDao";
import VueJsonPretty from "vue-json-pretty";
import util from "../ext/util";
import localStore from "../ext/storage";
import { Dropbox } from "dropbox";

export default {
  data() {
    return {
      dropboxFilePath: "/Apps/passKeeperChrome/credentials.json",
      credDao: null,
      savedCredentails: [],
      showDialog: false
    };
  },
  methods: {
    showSavedCreds: function() {
      this.savedCredentails = this.credDao.getAllCredentials();
    },
    loginToDropBox() {
      // Make sure following URL is whitelisted in manifest file
      const fullReceiverPath =
        "chrome-extension://bagihhjcblcabpangekfmkbdadpodgkf/pages/panel.html";
      const APIKEY = "t2lzjdzna6tgnmn";
      const ACCESS_TOKEN =
        "csniWClhrH8AAAAAAAAAmvzPhOVc2GbSAbyb6zUIGeqmahdpGwZcH_BOONQEPSaT";

      let dbx = new Dropbox({ clientId: APIKEY });
      const authToken = "";
      const authUrl = dbx.getAuthenticationUrl(fullReceiverPath);
      window.open(authUrl, "_blank");
    },
    exportData() {
      const dropboxToken = localStore.get("dropboxToken");
      if (dropboxToken) {
        const dbx = new Dropbox({ accessToken: dropboxToken });

        const uploadData = _mode => {
          dbx
            .filesUpload({
              contents: JSON.stringify(this.savedCredentails),
              path: this.dropboxFilePath,
              mode: _mode
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.error(error);
            });
        };

        dbx
          .filesDownload({
            path: this.dropboxFilePath
          })
          .then(function(response) {
            console.log(response);
            uploadData({ ".tag": "update", update: response.rev });
          })
          .catch(function(error) {
            console.error(error);
            uploadData({ ".tag": "add" });
          });
      } else {
        this.loginToDropBox();
      }
    },
    importData() {
      const dropboxToken = localStore.get("dropboxToken");
      if (dropboxToken) {
        const dbx = new Dropbox({ accessToken: dropboxToken });
        dbx
          .filesDownload({
            path: this.dropboxFilePath
          })
          .then(function(response) {
            console.log(response);
            const reader = new FileReader();
            reader.onload = function() {
              console.log("Blob to text", reader.result);
            };
            reader.readAsText(response.fileBlob);
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        this.loginToDropBox();
      }
    }
  },
  created: function() {
    const _loginObj = util.isAuth();
    this.credDao = new CredDao(_loginObj.password);
    this.showSavedCreds();

    const _this = this;
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      if (request.type === "dropboxConnectToken") {
        console.log("dropboxConnectToken-content", request);
        localStore.set("dropboxToken", request.content);
        _this.exportData();
      }
    });
  },
  components: {
    VueJsonPretty
  }
};
</script>

<style scoped>
</style>