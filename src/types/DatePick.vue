<template>
    <div>
        <!-- {{field.value}} -->
        <div v-if="field">
            <date-picker
                v-model="selected_date"
            lang="en"
                placeholder
                valuetype="DD/MM/YYYY"
                format="DD/MM/YYYY"
                :required="field.required"
              ref="datepicker"
                :not-after="notAfter"
                :not-before="notBefore"
                :default-value="defaultDate"
                :disabled="disableData"
                class="date-pick"
                @focusin.native="datepickerclick($event)"
            ></date-picker>
            <!-- <span class="dateofbirth">{{label}}</span>-->
            <span v-if="this.firstError" class="error">{{ firstError }}</span>
        </div>
        <span v-if="this.eligibility_error==true" class="valdate-error">{{ Message }}</span>
        <span v-if="this.error=='1'" class="valdate-error">{{ arrormessage }}</span>
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
    props: ["field", "error", "eligibility_error", "Message"],
    mixins: [validator],

    data() {
        return {
            selected_date: this.field.value,
            dob: "",
            // fieldname: "Dob",
            time2: "",
            time3: "",
           
              
          
            not_after: moment("2001-01-01", "YYYY-MM-DD"),
            not_before: moment("1918-01-01", "YYYY-MM-DD"),
            default_date: moment("1994-01-01", "YYYY-MM-DD")
            
        };
    },
    mounted() {
       this.name();
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
            if (this.field.validators) {
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
            } else {
                return moment(date, "YYYY-MM-DD");
            }
        },
        defaultDate() {
            if (this.field.not_dob == "yes") {
                return;
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
        updateValue: function(value) {
            var date = moment(value).format("DD-MM-YYYY");
            //  this.field.value = date;
        },
       name(){
this.$refs.datepicker.$refs.input.name = 'Dob'
       },
        updateForm(fieldName, value) {
            this.$emit("input", moment(this.field.value).format("DD-MM-YYYY"));
            this.$nextTick(() => {
                this.validate();
            });
        },
        datepickerclick(val) {
            if (val) {
                this.$emit("error", this.error);
                this.$emit("error", this.eligibility_error);
            }
        }
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
        },
        selected_date(){
           
            this.field.value = moment(this.selected_date).format("DD/MM/YYYY")
        },
       
    }
};
</script>
<style>
.date-pick .mx-input-append{
    top: -8px;
    right: 0px;
    left: 96.5%;
}
.date-pick input.mx-input{
    font-weight: 400;
}

.date-pick .mx-input-wrapper{
    height: 41px;
    border-bottom: 1px solid #cecece
}
.date-pick .mx-calendar-header a{
    background: none;
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: 0
}
.date-pick .mx-current-month{
    padding: 5px 0 0 45px
}
.date-pick .mx-current-year{
    padding: 5px 0 0 0;
}
.date-pick .mx-panel .cell{
    position: static;
    transition: none
}
</style>