<template>
  <div class="row">
    <div class="col-sm-4" v-for="val in savedCredentails"  >
      <mt-card >
        <p>
          {{val.id}}
        </p>
    <div class="btn-demo">
        <mt-button bg="bluegray" @click="showDetail(val.id)">Detail</mt-button>
        <mt-button @click="editCred(val.id)" bg="green">Edit</mt-button>
        <mt-button @click="deleteCred(val.id)" bg="red">Delete</mt-button>
    </div>
    </mt-card>


    </div>

    <mt-dialog title="Detail" v-model="showDialog">
      <div class="row">
          <div class="credDetail">
          <vue-json-pretty
            :data="credentialDetail" >
          </vue-json-pretty>
        </div>
      </div>
    </mt-dialog>
  </div>
</template>

<script>
import CredDao from "../ext/credDao";
import VueJsonPretty from "vue-json-pretty";

export default {
  data() {
    return {
      credDao : new CredDao("Password@1"),
      savedCredentails: [],
      credentialDetail: {},
      showDialog: false
    };
  },
  methods: {
    showSavedCreds: function() {
      this.savedCredentails = this.credDao.getAllCredentials();
    },
    deleteCred : function(domain){
      this.credDao.deleteCredential(domain);
      this.savedCredentails = this.credDao.getAllCredentials();
    },
    editCred : function(domain){

    },
    showDetail: function(domain) {
      const encryptedCredentialDetail = this.credDao.getCredential(domain);
      console.log("encryptedCredentialDetail", encryptedCredentialDetail);
      this.credentialDetail = JSON.parse(
        this.credDao.decryptData(encryptedCredentialDetail[0].value)
      );

      this.showDialog = true;
    }
  },
  created: function() {
    this.showSavedCreds();
  },
  components: {
    VueJsonPretty
  }
};
</script>

<style scoped>
</style>