<template>
  <span :class="labelClass">{{label}}</span>
</template>
<script>
export default {
  props: ["label", "labelClass"]
};
</script>