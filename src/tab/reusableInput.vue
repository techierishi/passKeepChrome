
<template>
  <div class="row">
        <div class="col-sm-4">
          <mt-input placeholder="Key" inputSize="large" isFlag>{{ name }}</mt-input>
        </div>
        <div class="col-sm-8">
          <mt-input placeholder="Value" inputSize="large" isFlag>{{ value }}</mt-input>
        </div>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String
    }
  },  
  data () {
    return {
      value: 'Bar'
    }
  }
};
</script>

<style scoped>
</style>