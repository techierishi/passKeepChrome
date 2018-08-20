<template>
<div>
    <div>
        <mt-button bg="bluegray" @click="tab">Plugin Tab</mt-button>
    </div>
    <div>
        <mt-button bg="bluegray" @click="tab">Save</mt-button>
    </div>

</div>

</template>
<script>
export default {
  data: () => ({}),
  computed: {},
  created() {},
  mounted() {},
  methods: {
    tab() {
      chrome.tabs.create({ url: "pages/app.html" });
    }
  }
};
</script>
<style lang="scss">
div {
  color: blue;
}
</style>