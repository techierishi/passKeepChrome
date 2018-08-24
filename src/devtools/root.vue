<template lang="pug">
    div devtools
</template>
<script>
import util from "../ext/util";

export default {
  data: () => ({}),
  computed: {},
  created() {
    const dropboxAccessToken = util.parseQueryString(window.location.hash)
      .access_token;
    console.log("dropboxAccessToken", dropboxAccessToken);
    chrome.runtime.sendMessage({
      type: "dropboxConnectToken",
      content: dropboxAccessToken
    });
    window.location.hash = "";
    if (window.close) {
      return window.close();
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
div {
  color: blue;
}
</style>