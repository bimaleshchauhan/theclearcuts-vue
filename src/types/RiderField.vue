<template>
    <div v-if="showField" :class="colClass">
        <div>
            <component
                :field="field"
                :is="field.type"
                :name="field.name"
                :customerDetails="customerDetails"
            ></component>

            <!-- <span :class="field.Field[0].placeholderClass">{{field.Field[0].label}}</span> -->
        </div>
    </div>
</template>

<script>
import DatePicker from "./DatePicker";
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
import ToggleButton from "../types/ToggleButton";
import validator from "../mixins/validator";
import Label from "./Label";
import Congratulations from "../components/Term-Insurance/PaymentOptions/PremiumCalculation/Congratulations";
import KeyFeatures from "../components/Term-Insurance/PaymentOptions/PremiumCalculation/KeyFeatures";
import RidersInfo from "../components/Term-Insurance/PaymentOptions/PremiumCalculation//RidersInfo";
import FreeBenefits from "./RidersPlan/FreeBenefits";
import PlanOptions from "./RidersPlan/PlanOptions";
import PayoutOptions from "./RidersPlan/PayoutOptions";
import PaidRiders from "./RidersPlan/PaidRiders";
import PaidBenefits from "./RidersPlan/PaidBenefits";
import DisableField from "../types/DisableField";

export default {
    name: "RiderField",
    components: {
        Congratulations,
        KeyFeatures,
        RidersInfo,
        NumberInput,
        SelectList,
        TextInput,
        DatePicker,
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
        FreeBenefits,
        PlanOptions,
        PaidRiders,
        PaidBenefits,
        ToggleButton,
        PayoutOptions,
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
        "customerDetails"
    ],
    mixins: [validator],
    data() {
        return {
            validationErrors: [],
            show: true
        };
    },
    mounted() {
        this.$nextTick(() => {
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
        colClass() {
            return this.field.col ? "col-" + this.field.col : "col-12";
        },
        // fieldClass() {
        //     return this.field.type == "RadioButton"
        //         ? "stepformRadio"
        //         : "sptepform" && this.field.type == "DatePicker"
        //         ? "sptepform-calender"
        //         : "sptepform" && this.field.type == "SubmitButton"
        //         ? "sptepform btn"
        //         : "sptepform" && this.field.type == "SelectList"
        //         ? "sptepform-select"
        //         : "sptepform" && this.field.type == "Checkbox"
        //         ? "checkbox"
        //         : "sptepform";
        //     //return "stepformRadio";
        // },
        // labelClass() {
        //     return this.field.type == "DatePicker"
        //         ? "dateofbirth"
        //         : "inputlabel" && this.field.type == "SelectList"
        //         ? "selectbox-label"
        //         : "inputlabel";
        // },
        showField() {
            //return true;
            self = this;
            var value = false;
            if (!this.field.dependentOn) {
                return true;
            } else {
                // _.findIndex(self.schema, function(field) {
                //   if (field.id == "name") {
                //     if (1) {
                //       return true;
                //     }
                //   }
                // });
                _.forEach(self.field.dependentOn, function(item) {
                    _.findIndex(self.schema, function(field) {
                        if (field.id == item.id) {
                            if (field.value) {
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
                            }
                        }
                    });
                });
                return value;
            }
        }
    },
    watch: {
        "field.value"() {
            this.$set(this.proposal, this.field.name, this.field.value);
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
</script>
