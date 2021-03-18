<template>
    <div>
        <label>{{label}}</label>

        <table style="width:100%">

        <tr>
            <th>Add On/ Riders</th>
            <th>Sum Assured</th> 
            <th>Premium</th>
            <th>Policy Term</th>
        </tr>

        <tr v-for="option in field.options" :key="option.value">

            <td>
            
            <input type="checkbox" :id="option.key" :value="option.value" v-model="selectedValues" :policyTerm="option.policyTerm"/>
            <label> {{ option.labelId }} </label>

            </td>
            <td v-if="option.sumAssured"> 
                <input type = "text" :readonly="option.readonly"  v-model="option.sumAssured">
                
                <span v-if="option.sumAssuredText">{{ option.sumAssuredText }} </span> 
            </td> 
            <td> Rs.  {{ option.premium }} </td>
            <td> {{ option.policyTerm }} </td>

        </tr>

        </table>

        <span v-if="this.firstError">{{ firstError }}</span>
    </div>
</template>

<script>
import validator from "../mixins/validator";
export default {
    props: ["label", "name", "value", "field", "data", "prefilled",
    "labelId",
    "sumAssured",
    "readonly",
    "sumAssuredText",
    "premium",
    "policyTerm"],
    mixins: [validator],
    mounted(){
        this.$nextTick(()=>{
            if(this.prefilled){
                this.selectedValues = this.prefilled
                //this.filledData = this.prefilled          
                this.$emit('input',this.value);
            }
           
        })
    },
    data() {
        return {
            selectedValues: [],
            filledData:"",
        };
    },
    watch:{
        selectedValues(val){
            
            this.$emit('input',val)
        }
    }
};
</script>