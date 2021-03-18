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
        :errorshow="errorshow"
        :myevent="myevent"
        :statusvalue="statusvalue"
        :errorshow_message="errorshow_message"
        @error="updateerror"
        @errorshowfuc="errorshowfuc"
        @onInput="onInput"
        ref="form_field"
      ></component>

      <Label
        :label="field.label"
        :class="labelClass"
        v-if="field.type != 'HeaderText'"
        >{{ label }}</Label
      >
      <!-- <span :class="field.Field[0].placeholderClass">{{field.Field[0].label}}</span> -->
    </div>
  </div>
</template>

<script>
import TimePicker from "./TimePicker"
import DatePicker from "./DatePicker";
import DatePick from "./DatePick.vue";
import DateBox from "./DateBox.vue";
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
import FileUpload from "./FileUpload";
import ErrorShow from "./ErrorShow";
import Label from "./Label";
import moment from "moment";
import _ from "lodash";
export default {
  name: "Field",
  components: {
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
    DisableField,
    DatePick,
    FileUpload,
    ErrorShow,
    DateBox,
    TimePicker
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
    "buttonloader"
  ],
  mixins: [validator],
  data() {
    return {
      validationErrors: [],
      show: true,
      error: "",
      eligibility_error: false,
      Message: "",
      ifShow: false,
      errorshow: false,
      errorshow_message: "",
      myevent: "",
      statusvalue: false
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
    onInput(data){
        this.$emit("onInput", data);
    },
    errorshowfuc(val) {
      this.errorshow = val;
    },
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
    updateerror(val) {
      this.myevent = val;
      this.error = "";
      this.eligibility_error = false;
    },

    validation() {
      if (this.field.required) {
        if (
          this.field.value == "" ||
          this.field.value == null ||
          this.field.value == undefined ||
          this.field.value == "No file chosen"
        ) {
          this.error = "1";
          if (this.field.type == "DatePicker") {
            // let data = document
            //     .getElementById(this.field.id)
            //     ._.first(childNodes)
            //     ._.first(childNodes)
            //     .focus();
          }

          // else if (this.field.type == "DatePick") {
          //     let data = document
          //         .getElementById(this.field.id)
          //         .childNodes[0].childNodes[0].focus();
          // }
          else if (this.field.type == "Checkbox") {
          } else if (this.field.type == "RadioButton") {
          } else if (this.field.type == "FileUpload") {
          } else if (this.field.id) {
            let dt = document.getElementById(this.field.id);
            if(dt !=null || dt!=undefined){
                  dt.focus();
            }
            
          }
          // this.status.push(this.error);
        }
        //this.$emit("error", this.status);
      }
      // return this.error;
    },

    eligibleValidation(eligible, message) {
      let errorLenght = 200;
      if (this.field.name == eligible) {
        this.eligibility_error = true;
        this.Message = message.substring(0, errorLenght);
        this.statusvalue = true;
        this.$store.commit("ERROR_STATUS", true);
      } else {
        this.errorshow = true;
        let self = this;
        setTimeout(function() {
          self.errorshow = false;
        }, 5000);
        if (typeof message == "string") {
          this.errorshow_message = message.substring(0, errorLenght);
        } else if (typeof message == "object") {
          Object.keys(message).map(function(key) {
            self.errorshow_message = message[key].substring(0, errorLenght);
          });
        } else {
          this.errorshow_message = message;
        }
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
            let element = this.$refs.form_field;
           
             if (element.validationErrors && element.validationErrors.length > 0) {
                this.validationErrors = _.concat(
                        this.validationErrors,
                        element.validationErrors
                    );
             }
           
        }
//     validate() {
//       this.validationErrors = [];

//       if (!this.show) {
//         return;
//       }
//       this.$refs.elements.forEach(element => {
//         element.validate();
//         if (element.validationErrors.length > 0) {
//           this.validationErrors = _.concat(
//             this.validationErrors,
//             element.validationErrors
//           );
//         }
//       });
//     }
  },

  computed: {
    datashow() {
      return this.field;
    },
    colClass() {
      if (this.$store.state.error_status == 0) {
        this.error = "";
        this.eligibility_error = false;
      }
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
        : "sptepform" && this.field.type == "DateBox"
        ? "sptepform-datebox sptepform"
        : "sptepform" && this.field.type == "SubmitButton"
        ? "sptepform btn"
        : "sptepform" && this.field.type == "SelectList"
        ? "sptepform-select"
        : "sptepform" && this.field.type == "Checkbox"
        ? "checkbox"
        : "sptepform" && this.field.type == "TimePicker"
        ? "sptepform time-picker" : "sptepform";
      //return "stepformRadio";
    },
    labelClass() {
      if (this.field.type == "TextInput") {
        if (this.field.value) {
          return "inputlabel active";
        }
      } else {
        return this.field.type == "DatePicker"
          ? "dateofbirth"
          : "inputlabel" && this.field.type == "SelectList"
          ? "selectbox-label"
          : "inputlabel";
      }
    },
    showField() {
      self = this;
      let value = false;

      if (this.field.dependentOn) {
        _.forEach(self.field.dependentOn, function(item) {
          _.findIndex(self.schema, function(field) {
            if (field.id == item.id) {
              if (field.value != "" && field.value != null) {
                if (typeof field.value != "object") {
                  if (item.regex) {
                    let expression = item.regex;
                    let re = new RegExp(_.trim(expression, "/"));
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
                    let re = new RegExp(_.trim(expression, "/"));
                    if (field.value == item.value || !re.test(field.value)) {
                      value = true;
                      return true;
                    }
                  }
                } else {
                  for (let i = 0; i <= field.value.length; i++) {
                    if (item.regex) {
                      let expression = item.regex;
                      let re = new RegExp(_.trim(expression, "/"));
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
                      let re = new RegExp(_.trim(expression, "/"));
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
                // for date expression
                if (item.type == "date" && item.expression) {
                  let get_date = new Date(item.value).getTime();
                  let choose_date = new Date(field.value).getTime();

                  if (item.expression == "<") {
                    if (get_date < choose_date) {
                      value = true;
                      return true;
                    }
                  } else if (item.expression == ">") {
                    if (get_date > choose_date) {
                      value = true;
                      return true;
                    }
                  }
                }
              }
              // nested hide/show fields
              // if (self.field.id) {
              //     let depData = self.field;
              //     _.forEach(self.schema, function(subitem) {
              //         if (subitem.dependentOn) {
              //             _.forEach(subitem.dependentOn, function(
              //                 depitem
              //             ) {
              //                 if (depitem.id == depData.id) {
              //                     if (
              //                         depitem.value &&
              //                         depitem.value ==
              //                             depData.value
              //                     ) {
              //                         if (depData.value) {
              //                             //  depData.value = "";
              //                         }
              //                     }
              //                 }
              //             });
              //         }
              //     });
              // }

              if (self.field.id) {
                let depData = self.field;
                let m_data = false;
                _.forEach(self.schema, function(subitem) {
                  _.forEach(depData.dependentOn, function(depitem) {
                    if (subitem.id == depitem.id) {
                      if (depitem.value == subitem.value) {
                        if (subitem.value) {
                          m_data = true;
                          return;
                        }
                      }
                      //   else {
                      //     depData.value = "";
                      //   }
                    }
                  });
                });
                if (m_data == false) {
                  depData.value = "";
                }
              }

              // value = showhiderecursive(field, item, value);
            }
          });
        });
        return value;
      } else {
        return true;
      }
    }
  },
  watch: {
    "field.value"() {
      // this.field.value != "" &&
      if (this.field.value != undefined) {
        if (this.field.type == "DatePicker") {
          this.$set(
            this.proposal,
            this.field.name,
            moment(this.field.value).format("DD-MM-YYYY")
          );
        } else if (this.field.type == "DateBox") {
          this.$set(
            this.proposal,
            this.field.name,
            moment(this.field.value, ["DD/MM/YYYY"]).format("DD-MM-YYYY")
          );
        } else {
          this.$set(this.proposal, this.field.name, this.field.value);
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
input[type="email"], input[type="tel"], input[type="text"] {
	box-shadow: none;
}

</style>
