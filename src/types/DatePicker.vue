<template>
    <div>
        <!-- {{field}} -->
        <div v-if="field">
            <date-picker
                v-model="field.value"
                valuetype="DD-MM-YYYY"
                format="DD-MM-YYYY"
                :required="field.required"
                lang="en"
                :id="field.id"
                :not-after="notAfter"
                :not-before="notBefore"
                :default-value="defaultDate"
                :disabled="disableData"
                @focusin.native="datepickerclick($event)"
                @change="doSomethingInParentComponentFunction($event)"
                @open="datepickerOpenedFunction()"
                @close="datepickerClosedFunction()"
            ></date-picker>
            <!-- <span class="dateofbirth">{{label}}</span>-->
            <span v-if="this.firstError" class="error">{{ firstError }}</span>
        </div>
        <span v-if="eligibility_error == true" class="valdate-error">{{ Message }}</span>
        <span v-if="error == '1'" class="valdate-error">{{ arrormessage }}</span>
    </div>
</template>
<script>
import validator from "../mixins/validator";
import DatePicker from "vue2-datepicker";
import moment from "moment";
export default {
    components: {
        DatePicker
    },
    props: ["field", "name", "error", "eligibility_error", "Message"],
    mixins: [validator],

    data() {
        return {
            dob: "",
            time2: "",
            time3: "",
            not_after: moment("2001-01-01", "YYYY-MM-DD"),
            not_before: moment("1918-01-01", "YYYY-MM-DD"),
            default_date: moment("1994-01-01", "YYYY-MM-DD")
            // custom lang
            // lang: {
            //     days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            //     months: [
            //         "Jan",
            //         "Feb",
            //         "Mar",date
            //         "Apr",date
            //         "May",
            //         "Jun",
            //         "Jul",
            //         "Aug",
            //         "Sep",
            //         "Oct",
            //         "Nov",
            //         "Dec"
            //     ],
            //     pickers: [value
            //         "next values",
            //         "next valueys",
            //         "previvalue days",
            //         "previvalue0 days"
            //     ],
            //     placeholdevalue
            //         date: "Date Of Birth",
            //         dateRange: "Select Date Range"
            //     }
            // },
            // custom range shortcuts
            // shortcuts: [
            //     {
            //         text: "Today",
            //         onClick: () => {
            //             this.time3 = [new Date(), new Date()];
            //         }
            //     }
            // ],
            // timePickerOptions: {
            //     start: "00:00",
            //     step: "00:30",
            //     end: "23:30"
            // }
        };
    },
    mounted: function() {
        // let self = this;
        // this.$nextTick(function() {
        //     $(this.$el)
        //         .datepicker({
        //             startView: 1,
        //             todayHighlight: true,
        //             todayBtn: "linked",
        //             autoclose: true,
        //             format: "dd-mm-yyyy"
        //         })
        //         .on("changeDate", function(e) {
        //             var date = e.format("dd-mm-yyyy");
        //             self.updateValue(date);
        //         });
        // });
    },

    // data() {
    //     return {
    //         date: moment(this.field.value).format("DD-MM-YYYY")
    //     };
    // },
    // computed: {
    //     datepickervalue() {
    //         return this.field.value;
    //     }
    // },

    computed: {
        arrormessage() {
            if (this.field.validators && this.field.validators.length > 0) {
                return _.first(this.field.validators).message;
            } else return;
        },
        notAfter() {
            let now = moment();

            var date = new Date(now.valueOf() - 568025136000);

            // let year = now.get("year");
            // return year;
            if (this.field.not_dob == "yes") {
                return;
            } else if (this.field.not_after_now == "yes") {
                return moment(now, "YYYY-MM-DD");
            } else if (this.field.not_before_now == "yes") {
                return;
            } else if (this.field.husband_dob) {
                let datetime = new Date(this.field.husband_dob).getTime();

                let h_dob = new Date(datetime + 315569520000);

                if (h_dob > date) {
                    return moment(date, "YYYY-MM-DD");
                } else {
                    return moment(h_dob, "YYYY-MM-DD");
                }
            } else {
                return moment(date, "YYYY-MM-DD");
            }
        },
        notBefore() {
            let now = moment();
            var date = new Date(now.valueOf() - 1893417120000);
            // let year = now.get("year");
            if (this.field.not_dob == "yes") {
                return;
            } else if (this.field.not_before_now == "yes") {
                return moment(now, "YYYY-MM-DD");
            } else if (this.field.not_after_now == "yes") {
                return;
            } else if (this.field.husband_dob) {
                let datetime = new Date(this.field.husband_dob).getTime();
                let h_dob = new Date(datetime - 315569520000);

                return moment(h_dob, "YYYY-MM-DD");
            } else {
                return moment(date, "YYYY-MM-DD");
            }
        },
        defaultDate() {
            if (
                this.field.not_dob == "yes" ||
                this.field.not_before_now == "yes" ||
                this.field.not_after_now == "yes"
            ) {
                return;
            } else if (this.field.husband_dob) {
                let output = this.field.husband_dob.replace(
                    /(\d\d)\/(\d\d)\/(\d{4})/,
                    "$3-$1-$2"
                );
                let dara = moment(output, "YYYY-MM-DD");
                return moment(output, "YYYY-MM-DD");
            } else {
                return moment("1994-01-01", "YYYY-MM-DD");
            }
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
        doSomethingInParentComponentFunction(val) {
            if (val) {
                this.$emit("error", this.error);
                this.$emit("error", this.eligibility_error);
                this.$emit("dateChange", val);
            }
        },

        updateValue: function(value) {
            var date = moment(value).format("DD-MM-YYYY");
            //  this.field.value = date;
        },
        updateForm(fieldName, value) {
            this.$emit("input", moment(this.field.value).format("DD-MM-YYYY"));
            this.$nextTick(() => {
                this.validate();
            });
        },
        datepickerclick(val) {}
    },
    watch: {
        "field.id": function(val) {
            this.filledData = this.prefilled;
            if (moment(this.field.value).format("DD-MM-YYYY")) {
                this.$emit(
                    "input",
                    moment(this.field.value).format("DD-MM-YYYY")
                );
            }
        }
    }
};
</script>
