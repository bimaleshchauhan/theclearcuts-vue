<template>
    <div class="outerradio">
        <div class="radio" v-if="field">
            <li v-for="option in field.options" :key="option.value">
                <input
                    type="radio"
                    :id="option.id"
                    :name="field.name"
                    :value="option.value"
                    :checked="option.value === filledData"
                    :disabled="disableData"
                    v-model="field.value"
                    @click="clickradiobtn(option.value)"
                />
                <label :for="option.id">{{option.key}}</label>
            </li>
        </div>
        <span v-if="this.error=='1'" class="valdate-error">{{ arrormessage}}</span>
        <span v-if="this.eligibility_error==true" class="valdate-error">{{ Message }}</span>
        <span v-if="this.firstError" class="error">{{ firstError }}</span>
    </div>
</template>
<script>
//import _ from "lodash";
import validator from "../mixins/validator";
export default {
    props: ["name", "field", "error", "eligibility_error", "Message"],
    mixins: [validator],
    //   mounted() {
    //     this.$nextTick(() => {
    //       this.$emit(this.name, this.field.value);
   
    //     });
    //   },
    data() {
        return {
            filledData: ""
        };
    },
    computed: {
        arrormessage() {
            if (this.field.validators && this.field.validators.length > 0) {
                return _.first(this.field.validators).message;
            } else return;
        },
        disableData() {
            if (this.field.disable && this.field.disable == "true") {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        clickradiobtn(val) {
            if (val) {
                this.$emit("error", this.error);
                this.$emit("error", this.eligibility_error);
            }
        }
    }
};
</script>