<template>
    <div class="disablefield">
        <input type="hidden" :name="field.name" v-model="field.value" :id="field.id" />
    </div>
</template>
<script>
export default {
    name: "DisableField",
    props: ["field"]
};
</script>
<style>
.disablefield{
    display: none;
}
</style>