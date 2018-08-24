<template>
<div class="popup_container">
    <div class="loginArea" v-show="!isLoggedIn">
            <input placeholder="Username" class="loginInput popupText" v-model="loginObj.username" />
            <input placeholder="Password" class="loginInput popupText" v-model="loginObj.password" />
            <button class="loginBttn popupBttn" @click="login">Login</button>

    </div>

    <div class="contentArea" v-show="isLoggedIn">
        <div class="search_area">
            <input placeholder="Search" class="searchText popupText" v-model="searchQuery" />
            <button class="searchBttn popupBttn" @click="searchCreds">Search</button>
        </div>
        <div class="search_result">
            <div class="searchResultItem" v-for="val in searchedResult" @click="onSearchItemClick(val.index)">
                <div class="searResultTitle">{{val.id}}</div>
                <div class="searResultDetail" v-show="val.show">
                    <div class="searResultCredential">
                        <div class="textArea">
                            {{val.username}}
                        </div>
                        <div class="iconArea" @click="copyToClipboard(val.username)">
                            <img src="../assets/copy.svg" />
                        </div>
                    </div>
                    <div class="searResultCredential">
                        <div class="textArea">
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
            <button class="popupOptionBttn" @click="tab">Manage Credentials</button>
            <button class="popupOptionBttn" @click="tab">Save</button>
            <button class="popupOptionBttn" @click="logout">Logout</button>
        </div>
    </div>
</div>

</template>
<script>
import CredDao from "../ext/credDao";
import localStore from "../ext/storage";

export default {
  data() {
    return {
      credDao: null,
      allCreds: [],
      searchQuery: "",
      searchedResult: [],
      isLoggedIn: false,
      loginObj: {
        username: "",
        password: ""
      }
    };
  },
  computed: {},
  created() {
    const _loginObj = localStore.get("loginObj");
    if (_loginObj && _loginObj.password) {
      this.loginObj = _loginObj;
      this.isLoggedIn = true;
      this.credDao = new CredDao(_loginObj.password);

      const _allCreds = this.credDao.getAllCredentials();
      if (_allCreds) {
        this.allCreds = _allCreds.reduce((all, item, index) => {
          item["show"] = false;
          all.push(item);
          return all;
        }, []);

        console.log("this.allCreds", this.allCreds);
      }
    }
  },
  mounted() {
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      if (request.type === "loginPost") {
        console.log(request.data);
      }
    });
  },
  methods: {
    login() {
      if (this.loginObj.username && this.loginObj.password) {
        this.isLoggedIn = true;
        localStore.set("loginObj", this.loginObj);
      }
    },
    logout() {
      localStore.remove("loginObj");
      localStore.remove("dropboxToken");
      this.isLoggedIn = false;
    },
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
      console.log("copyToClipboard", textToCopy);

      chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          message: "credentialCopied",
          copiedText: "" + textToCopy
        });
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

.popupOptionBttn {
  width: 100%;
  margin: 2px 0px;
  background-color: #fff !important;
  box-shadow: none;
  color: #999 !important;
  border: 1px solid #ccc;
  padding: 5px;
}

.popupOptionBttn :active {
    background: #eee !important;
    color: #FFF !important;
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

.popupText {
  background: #eee;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
}

.popupBttn {
  margin-left: 5px;
  background: #0db1fd;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.loginInput {
    width: 98%;
    margin: 1%;
}

.loginBttn {
    width: 98%;
    height: 30px;
    margin: 1%;
}

.searchText {
  width: 75%;
}

.searchBttn {
  width: 23%;
  height: 30px;
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