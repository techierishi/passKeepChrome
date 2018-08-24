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
import SyncData from "../ext/syncData";
import { Dropbox } from "dropbox";

export default {
  data() {
    return {
      dropboxFilePath: "/credentials.json",
      credDao: null,
      syncData: new SyncData(),
      savedCredentails: [],
      showDialog: false
    };
  },
  methods: {
    showSavedCreds: function() {
      this.savedCredentails = this.credDao.getAllCredentials();
    },
    exportData() {
      this.syncData.exportData({
        savedCredentails: this.savedCredentails
      });
    },
    importData() {
      this.syncData.importData({
        blobConverted: resultText => {
          this.credDao.saveAllCredentails(JSON.parse(resultText));
        }
      });
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