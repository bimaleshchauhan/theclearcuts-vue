<template>
    <div>
        <!-- <label>{{label}}</label> -->

        <input
            type="hidden"
            :name="name"
            :maxLength="field.maxLength"
            :minLength="field.minLength"
            :required="field.required"
            v-model="filledData"
            @input="updateForm(field.id, $event)"
            :placeholder="placeholder"
            :onkeypress="onkeypress"
        />
        <span class="placeholder">{{label}}</span>
      <span v-if="this.firstError" class="error">{{ firstError }}</span> 
    </div>
</template>
<script>
import validator from "../mixins/validator";
export default {
    name: "HiddenText",
    props: ["placeholder", "label", "name", "value", "field", "data", "prefilled", "onkeypress", "validators"],
    mixins: [validator],
    mounted(){
        this.$nextTick(()=>{
            if(this.prefilled){
                this.filledData = this.prefilled
                this.$emit('input',this.value);
            }
        })
    },
    data(){
        return{
            filledData:""
        }
    },
    methods:{
        updateForm(fieldName, value) {
            this.$emit("input", value.srcElement.value)            
            this.$nextTick(()=>{this.validate()})
        }
    },
    watch:{
        "field.id": function(val){
            this.filledData = this.prefilled
            if(this.value){
                this.$emit('input',this.value);
            }
        }
    }
};
</script>