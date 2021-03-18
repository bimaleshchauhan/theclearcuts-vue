<template>
    <div v-if="showField" :class="colClass">
        <div :class="fieldClass">
            <component
                :field="field"
                :is="field.type"
                :name="field.name"
                :error="error"
                :buttonloader="buttonloader"
                :Message="Message"
                :eligibility_error="eligibility_error"
                @error="updateerror()"
            ></component>

            <Label
                :label="field.label"
                :class="labelClass"
                v-if="field.type!='HeaderText'"
            >{{label}}</Label>
            <!-- <span :class="field.Field[0].placeholderClass">{{field.Field[0].label}}</span> -->
        </div>
    </div>
</template>

<script>
// import DatePicker from "./DatePicker";
import DatePick from "./DatePick";
import RadioInput from "./RadioInput";
import ExtendRadioInput from "./ExtendRadioInput";
import NumberInput from "./NumberInput";
import SelectList from "./SelectList";
import TextInput from "../types/TextInput";
import Checkbox from "./Checkbox";
import ExtendCheckbox from "./ExtendCheckbox";
import RadioButton from "../types/RadioButton";
import HeaderText from "./HeaderText";
import SubContainer from "./SubContainer";
import SubmitButton from "../types/SubmitButton";
import HiddenText from "../types/HiddenText";
import DisableField from "../types/DisableField";
import validator from "../mixins/validator";
import Label from "./Label";
import moment from "moment";
import _ from "lodash";
export default {
    // name: "Field",
    components: {
        NumberInput,
        SelectList,
        TextInput,
        DatePick,
        RadioInput,
        ExtendRadioInput,
        Checkbox,
        ExtendCheckbox,
        HeaderText,
        SubContainer,
        RadioButton,
        SubmitButton,
        HiddenText,
        validator,
        Label,
        DisableField
    },
    props: [
        "field",
        "name",
        "value",
        "data",
        "col",
        "outerClass",
        "label",
        "placeholderClass",
        "validatetion",
        "proposal",
        "schema",
        "buttonloader",
        "insurer"
    ],
    mixins: [validator],
    data() {
        return {
            validationErrors: [],
            show: true,
            error: "",
            eligibility_error: false,
            Message: "",
            ifShow: false
        };
    },
    mounted() {
        // this.field.value = this.field.prefilled;
        this.$nextTick(() => {
            this.showField;
            if (this.field.showIf == undefined) {
                this.show = true;
            }
        });
    },
    methods: {
        updateForm(fieldName, value) {
            this.$set(this.formData, fieldName, value);
            this.$emit("input", this.formData);
        },
        updateerror(val) {
            this.error = "";
            this.eligibility_error = false;
        },

        validation() {
            if (this.field.required) {
                if (
                    this.field.value == "" ||
                    this.field.value == null ||
                    this.field.value == undefined
                ) {
                    this.error = "1";
                    // this.status.push(this.error);
                }
                //this.$emit("error", this.status);
            }
            // return this.error;
        },

        eligibleValidation(eligible, message) {
            if (this.field.name == eligible) {
                this.eligibility_error = true;
                this.Message = message;
            }
            // if (this.field.required) {
            //     if (
            //         this.field.value == "" ||
            //         this.field.value == null ||
            //         this.field.value == undefined
            //     ) {
            //         this.eligibility_error = true;
            //     }
            // }
        },
        validate() {
            this.validationErrors = [];

            if (!this.show) {
                return;
            }
            this.$refs.elements.forEach(element => {
                element.validate();
                if (element.validationErrors.length > 0) {
                    this.validationErrors = _.concat(
                        this.validationErrors,
                        element.validationErrors
                    );
                }
            });
        }
    },
    computed: {
        datashow() {
            return this.field;
        },
        colClass() {
            if (this.field.type == "DisableField") {
                return this.field.col
                    ? "col-" + this.field.col + "hidden"
                    : "col-12 hidden";
            } else {
                return this.field.col ? "col-" + this.field.col : "col-12";
            }
        },
        fieldClass() {
            return this.field.type == "RadioButton"
                ? "stepformRadio"
                : "sptepform" && this.field.type == "DatePicker"
                ? "sptepform-calender"
                : "sptepform" && this.field.type == "SubmitButton"
                ? "sptepform btn"
                : "sptepform" && this.field.type == "SelectList"
                ? "sptepform-select"
                : "sptepform" && this.field.type == "Checkbox"
                ? "checkbox"
                : "sptepform";
            //return "stepformRadio";
        },
        labelClass() {
            if (this.field.type == "TextInput") {
                if (this.field.value) {
                    return "inputlabel active";
                }
            } else {
                return this.field.type == "DatePick"
                    ? "dateofbirth"
                    : "inputlabel" && this.field.type == "SelectList"
                    ? "selectbox-label"
                    : "inputlabel";
            }
        },
        showField() {
            //     self = this;
            //     let value = false;

            //     if (this.field.dependentOn) {
            //         _.forEach(self.field.dependentOn, function(item) {
            //             _.findIndex(self.schema, function(field) {
            //                 if (field.id == item.id) {
            //                     // _.forEach(field, function(items) {
            //                  ;
            //                     // });

            //                     if (field.value) {
            //                         if (item.regex) {
            //                             let expression = item.regex;
            //                             let re = new RegExp(
            //                                 _.trim(expression, "/")
            //                             );
            //                             if (!re.test(field.value)) {
            //                                 value = true;
            //                                 return true;
            //                             }
            //                         }
            //                         if (item.value) {
            //                             if (field.value == item.value) {
            //                                 value = true;
            //                                 return true;
            //                             }
            //                         }
            //                         if (item.regex && item.value) {
            //                             let expression = item.regex;
            //                             let re = new RegExp(
            //                                 _.trim(expression, "/")
            //                             );
            //                             if (
            //                                 field.value == item.value ||
            //                                 !re.test(field.value)
            //                             ) {
            //                                 value = true;
            //                                 return true;
            //                             }
            //                         }
            //                     }
            //                 }
            //             });
            //         });
            //         return value;
            //     } else {
            //         return true;
            //     }
            // }

            self = this;
            let value = false;

            if (this.field.dependentOn) {
                _.forEach(self.field.dependentOn, function(item) {
                    _.findIndex(self.schema, function(field) {
                        // if (field.id == "Pregnant") {

                        // }

                        if (field.id == item.id) {
                            // if (self.field.dependentOn) {
                            //     _.findIndex(self.schema, function(field1) {
                            //         if (
                            //             field1.id ==
                            //             self.field.dependentOn[0].id
                            //         )
                            //             return value;
                            //     });
                            // }

                            if (field.value != "" && field.value != null) {
                                if (typeof field.value != "object") {
                                    if (item.regex) {
                                        let expression = item.regex;
                                        let re = new RegExp(
                                            _.trim(expression, "/")
                                        );
                                        if (!re.test(field.value)) {
                                            value = true;
                                            return true;
                                        }
                                    }
                                    if (item.value) {
                                        if (field.value == item.value) {
                                            value = true;
                                            return true;
                                        }
                                    }
                                    if (item.regex && item.value) {
                                        let expression = item.regex;
                                        let re = new RegExp(
                                            _.trim(expression, "/")
                                        );
                                        if (
                                            field.value == item.value ||
                                            !re.test(field.value)
                                        ) {
                                            value = true;
                                            return true;
                                        }
                                    }
                                } else {
                                    for (
                                        let i = 0;
                                        i <= field.value.length;
                                        i++
                                    ) {
                                        if (item.regex) {
                                            let expression = item.regex;
                                            let re = new RegExp(
                                                _.trim(expression, "/")
                                            );
                                            if (!re.test(field.value[i])) {
                                                value = true;
                                                return true;
                                            }
                                        }
                                        if (item.value) {
                                            if (field.value[i] == item.value) {
                                                value = true;
                                                return true;
                                            }
                                        }
                                        if (item.regex && item.value) {
                                            let expression = item.regex;
                                            let re = new RegExp(
                                                _.trim(expression, "/")
                                            );
                                            if (
                                                field.value[i] == item.value ||
                                                !re.test(field.value[i])
                                            ) {
                                                value = true;
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
                return value;
            }
            // else if (this.field.onNextOpen) {
            //     _.forEach(self.field.onNextOpen, function(item) {
            //         _.findIndex(self.$store.state.onNextValue, function(field) {
            //             if (field.id == item.id)
            //                 if (field.value == item.value) {
            //                     value = true;
            //                     return true;
            //                 }
            //         });
            //     });
            //     return value;
            // }
            else {
                return true;
            }
        }
    },
    watch: {
        "field.value"() {
            if (this.field.value != "" && this.field.value != undefined) {
                if (this.field.type == "DatePicker") {
                    this.$set(
                        this.proposal,
                        this.field.name,
                        moment(this.field.value).format("DD-MM-YYYY")
                    );
                } else {
                    this.$set(this.proposal, this.field.name, this.field.value);
                    // if (this.field.onNext) {
                    //     this.$store.commit("ON_NEXT_VALUE", this.field);
                    // }
                }
            }
        },
        data: {
            handler(val) {
                if (this.field.showIf && this.field.showIf.indexOf("[]") >= 0) {
                    var arr = _.split(this.field.showIf, "[]");
                    let d = _.get(val, _.first(arr));
                    if (d.includes(arr[1])) {
                        this.show = true;
                    } else {
                        this.show = false;
                    }
                }
                if (this.field.showIf && this.field.showIf.indexOf("~") >= 0) {
                    var arr = _.split(this.field.showIf, "~");
                    let d = _.get(val, _.first(arr));
                    if (d == arr[1]) {
                        this.show = true;
                    } else {
                        this.show = false;
                    }
                }
            },
            deep: true
        }
    }
};

function dependenton(field, item) {}

function myFunction(class_name, id) {
    var element, name, arr;
    element = document.getElementById(id);
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
        element.className += " " + class_name;
    }
}
</script>
<style>
.hidden {
    display: none;
}
</style>