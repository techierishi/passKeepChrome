<template>
<div class="popup_container">
   <div class="search_area">
        <input placeholder="Search" class="searchText" v-model="searchQuery" />
        <button class="searchBttn" @click="searchCreds">Search</button>
    </div>
    <div class="search_result">
     <div class="searchResultItem" v-for="val in searchedResult" @click="onSearchItemClick(val.index)">
       <div class="searResultTitle">{{val.id}}</div>
       <div class="searResultDetail" v-show="val.show" >
         <div class="searResultCredential"> 
         <div class="textArea"> 
           {{val.username}}
          </div>
          <div class="iconArea" @click="copyToClipboard(val.username)"> 
           <img src="../assets/copy.svg" />
          </div>  
          </div>
         <div class="searResultCredential"> 
           <div class="textArea" > 
           ***********
          </div>
          <div class="iconArea" @click="copyToClipboard(val.password)"> 
            <img src="../assets/copy.svg" />
          </div> 
        </div>
       </div>
     </div>
    </div>
    <div class="bttn_container">
        <button  @click="tab">Manage Credentials</button>
        <button  @click="tab">Save</button>
    </div>
   

</div>

</template>
<script>
import CredDao from "../ext/credDao";

export default {
  data() {
    return {
      credDao: new CredDao("Password@1"),
      allCreds: [],
      searchQuery: "",
      searchedResult: []
    };
  },
  computed: {},
  created() {
    const _allCreds = this.credDao.getAllCredentials();
    this.allCreds = _allCreds.reduce((all, item, index) => {
      item["show"] = false;
      all.push(item);
      return all;
    }, []);

    console.log("this.allCreds", this.allCreds);
  },
  mounted() {
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      if (request.msg === "loginPost") {
        console.log(request.data);
      }
    });
  },
  methods: {
    tab() {
      chrome.tabs.create({ url: "pages/app.html" });
    },
    searchCreds() {
      this.searchedResult = this.allCreds.reduce((all, item, index) => {
        if (item.id.indexOf(this.searchQuery) !== -1) {
          item["index"] = all.length;
          // item["username"] = '';
          // item["password"] = '';
          all.push(item);
        }

        return all;
      }, []);

      console.log("this.searchedResult", this.searchedResult);
    },
    onSearchItemClick(idx) {
      const decrypted = JSON.parse(
        this.credDao.decryptData(this.searchedResult[idx].value)
      );
      this.searchedResult[idx].show = true;
      this.searchedResult[idx].username = decrypted.username;
      this.searchedResult[idx].password = decrypted.password;
      console.log("onSearchItemClick", this.searchedResult);
    },
    copyToClipboard(textToCopy) {
      // window.prompt("Copy to clipboard: Ctrl+C, Enter", textToCopy);
      console.log('copyToClipboard',textToCopy);

      chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: "credentialCopied", copiedText : ""+textToCopy });
      });
    }
  }
};
</script>
<style lang="scss">
.popup_container {
  width: 300px;
  padding: 5px;
  background: #fff;
}

.bttn_container button {
  width: 100%;
  margin: 2px 0px;
  background-color: #fff !important;
  box-shadow: none;
  color: #999 !important;
  border: 1px solid #ccc;
  padding: 5px;
}
.search_area {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  width: 100%;
}

.iconArea img {
  width: 20px;
  height: 20px;
}

.searchText {
  width: 75%;
  background: #eee;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
}

.searchBttn {
  width: 23%;
  margin-left: 5px;
  background: #0db1fd;
  color: #fff;
  border: none;
  border-radius: 5px;
}
.search_result {
  margin: 10px 0px;
}
.searchResultItem {
  box-shadow: 0 0 5px #999;
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
}

.searResultCredential {
  display: flex;
  background: #f6f6f6;
  padding: 5px;
  margin: 2px 0;
  border-radius: 3px;
}

.textArea {
  width: 70%;
}
.iconArea {
  width: 30%;
}
.searResultTitle {
  font-weight: bold;
}
</style>