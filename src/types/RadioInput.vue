<template>
    <div>
        <label>{{label}}</label>
        <li v-for="option in field.options" :key="option.value">
            <label>{{ option.key }}</label>
            <input
                type="radio"
                :id="name"
                :name="name"
                :value="option.value"
                :checked="option.value === filledData"
                @input="$emit('input',$event.target.value)"
            />
        </li>
        <span v-if="this.firstError">{{ firstError }}</span>
    </div>
</template>
<script>
import validator from "../mixins/validator";
export default {
    props: ["label", "name", "value", "field", "data","prefilled"],
    mixins: [validator],
     data() {
        return {
            filledData: ""
        };
    },
    mounted(){
        this.$nextTick(()=>{
            if(this.prefilled)
            {
                this.filledData = this.prefilled               
                this.$emit('input',this.prefilled);
            }
        })
    },
};
</script>