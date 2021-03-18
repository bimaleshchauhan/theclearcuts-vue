<template>
    <span v-if="this.firstError" class="error">{{ firstError }}</span>
</template>
<script>
import validator from "../mixins/validator";
export default {
    mixins: [validator]
};
</script>