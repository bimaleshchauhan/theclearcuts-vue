<template>
    <div>
        <label>{{label}}</label>
        <input
            type="number"
            :name="name"
            :value="value"
            @input="$emit('input',
           $event.target.value)"
            :placeholder="placeholder"
        />
        <span v-if="this.firstError">{{ firstError }}</span>
    </div>
</template>
<script>
import validator from "../mixins/validator";
export default {
    name: "NumberInput",
    props: ["placeholder", "label", "name", "value", "field", "data"],
    mixins: [validator]
};
</script>