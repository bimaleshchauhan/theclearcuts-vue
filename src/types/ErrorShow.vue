<template>
    <div class="error error-show">
        <span v-if="this.errorshow==true" class="valdate-error">{{ errorshow_message }}</span>
    </div>
</template>
<script>
export default {
    name: "Errorshow",
    props: ["field", "name", "errorshow", "errorshow_message", "error"]
};
</script>