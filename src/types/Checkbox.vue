<template>
    <div class="checkbox" v-bind:class="[field.checkshow=='noneofbellow' ? 'noneof' : '']">
        <!-- <label>{{label}}</label> -->

        <li v-for="option in field.options" :key="option.value">
            <input
                v-bind:class="[option.name=='noneofbellow' ? 'noneofbelow' : '']"
                type="checkbox"
                :id="option.id"
                :value="option.value"
                :name="option.name"
                v-model="selectedValues"
                @click="clickcheckbtn(option.value, field.id, $event)"
            />
            <label :for="option.id">{{ option.key }}</label>
        </li>
        <span v-if="this.error=='1'" class="valdate-error">{{ arrormessage }}</span>
        <span v-if="this.eligibility_error==true" class="valdate-error">{{ Message }}</span>
        <span v-if="this.firstError">{{ firstError }}</span>
       
    </div>
</template>

<script>
import _ from "lodash";
import validator from "../mixins/validator";
export default {
    props: ["name", "field", "error", "eligibility_error", "Message"],
    mixins: [validator],
    mounted() {
        /* this.$nextTick(() => {
      if (this.prefilled) {
        this.selectedValues = this.prefilled;
        this.$emit("input", this.value);
      }
    }); */
    },
    data() {
        return {
            selectedValues: [],
            none_below: false
            //check: "",
        };
    },
    computed: {
        checked() {
            return true;
        },
        arrormessage() {
            if (this.field.validators && this.field.validators.length > 0) {
                return _.first(this.field.validators).message;
            } else return;
        }
    },
    mounted() {
        let self = this;
        this.$nextTick(() => {
            _.forEach(this.field.value, function(value, key) {
                self.selectedValues.push(value);
            });
            // this.selectedValues.push("notb");
        });
    },
    methods: {
        clickcheckbtn(val, id, e) {
            var ckName = document.getElementsByName(e.target.name);
            var ckName1 = document.getElementsByName(id+"_check1");
            var ckName2 = document.getElementsByName(id+"_check2");
            var check = document.getElementById(e.target.id);

            if (check.checked) {
                this.selectedValues.push({
                    key: e.target.id,
                    value: e.target.value
                });
                // for (var i = 0; i < ckName.length; i++) {
                //     if (!ckName[i].checked) {
                //         ckName[i].disabled = true;
                //     } else {
                //         ckName[i].disabled = false;
                //     }
                // }

                if (e.target.name == id+"_check1") {
                    //  this.field.value.length = 0;
                    this.field.value = [];
                    this.selectedValues = [];

                    this.selectedValues.push({
                        key: e.target.id,
                        value: e.target.value
                    });
                    this.selectedValues.push(e.target.value);
                    for (var i = 0; i < ckName1.length; i++) {
                        ckName1[i].checked = true;
                    }

                    for (var i = 0; i < ckName2.length; i++) {
                        // ckName2[i].disabled = true;
                        ckName2[i].checked = false;
                        // this.field.value.splice(i, 1);
                    }
                    this.field.value[0] = e.target.value;
                } else if (e.target.name == id+"_check2") {
                    let index = _.findIndex(this.selectedValues, list => {
                        return list.value == "notb";
                    });
                    if (index >= 0) {
                        this.selectedValues.splice(index, 1);
                    }
                    // this.field.value.splice(0, 1);
                    for (var i = 0; i < ckName1.length; i++) {
                        // ckName1[i].disabled = true;
                        ckName1[i].checked = false;
                    }
                    // this.field.value.push(e.target.value);
                }
            } else {
                let index = _.findIndex(this.selectedValues, list => {
                    return list.key == e.target.id;
                });
                if (index >= 0) {
                    this.selectedValues.splice(index, 1);
                }
                check.checked = false;
                for (var i = 0; i < ckName1.length; i++) {
                    ckName1[i].disabled = false;
                }
                for (var i = 0; i < ckName2.length; i++) {
                    ckName2[i].disabled = false;
                }
            }

            // }
            if (val) {
                this.$emit("error", this.error);
                this.$emit("error", this.eligibility_error);
            }
        }
    },

    watch: {
        selectedValues(val) {
            this.field.value = val;
        }
    }
};
</script>