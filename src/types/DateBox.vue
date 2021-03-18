<template>
  <div>
    <input
      type="text"
      placeholder="DD / MM / YYYY"
      autocomplete="off"
      :id="field.id"
      :readonly="disableData"
      :required="field.required"
      @click="eligibilityvalid(field.value)"
      @input="updateForm(field.id, $event)"
      v-model="fillDob"
    />
    <span v-if="this.eligibility_error == true" class="valdate-error">{{
      Message
    }}</span>
    <span v-if="this.firstError" class="error">{{ firstError }}</span>
  </div>
</template>
<script>
import dateboxValidation from "../mixins/datebox-validation";
import moment from "moment";
export default {
  name: "DateBox",
  props: ["field", "name", "eligibility_error", "Message"],
  mixins: [dateboxValidation],
  data() {
    return {
      fillDob: ""
    };
  },
  mounted() {
    this.dateFormate(this);
    let dob = this.field.value;

    if (dob) {
      let dt = datesimpleformat(dob);
      const dateObj = new Date(dt);
      if (dateObj != "Invalid Date") {
        // let output = new Intl.DateTimeFormat("en-GB").format(dateObj);
        let data = moment(dateObj).format("DD / MM / YYYY");
        this.fillDob = data;
      }
    }
  },
  computed: {
    disableData() {
      if (this.field.disable && this.field.disable == "true") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    // dateKeyPress(val) {
    //     if (val) {
    //         this.$emit("error", this.error);
    //         this.$emit("error", this.eligibility_error);
    //         this.$emit("dateChange", val);
    //     }
    // },
    updateForm(fieldName, value) {
      // if(value.target && value.target.value.length >= this.field.maxLength){
      //     return;
      // }
      this.$nextTick(() => {
        this.validate();
      });
    },
    eligibilityvalid(val) {
      if (val) {
        this.$emit("error", this.eligibility_error);
      }
    },
    dateFormate(self) {
      var date = document.getElementById(self.field.id);

      function checkValue(str, max) {
        if (str.charAt(0) !== "0" || str == "00") {
          var num = parseInt(str);
          if (isNaN(num) || num <= 0 || num > max) num = 1;
          str =
            num > parseInt(max.toString().charAt(0)) &&
            num.toString().length == 1
              ? "0" + num
              : num.toString();
        }
        return str;
      }

      date.addEventListener("input", function(e) {
        this.type = "text";
        var input = this.value;
        if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
        var values = input.split("/").map(function(v) {
          return v.replace(/\D/g, "");
        });

        if (values[0]) values[0] = checkValue(values[0], 31);
        if (values[1]) values[1] = checkValue(values[1], 12);
        var output = values.map(function(v, i) {
          return v.length == 2 && i < 2 ? v + " / " : v;
        });
        this.value = output.join("").substr(0, 14);
        self.fillDob = this.value;
        self.field.value = this.value;
      });

      date.addEventListener("blur", function(e) {
        this.type = "text";
        var input = this.value;
        var values = input.split("/").map(function(v, i) {
          return v.replace(/\D/g, "");
        });
        var output = "";

        if (values.length == 3) {
          var year =
            values[2].length !== 4
              ? parseInt(values[2]) + 2000
              : parseInt(values[2]);
          var month = parseInt(values[1]) - 1;
          var day = parseInt(values[0]);
          var d = new Date(year, month, day);
          if (!isNaN(d)) {
            // document.getElementById(
            //     "result"
            // ).innerText = d.toString();
            var dates = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
            output = dates
              .map(function(v) {
                v = v.toString();
                return v.length == 1 ? "0" + v : v;
              })
              .join(" / ");
          }
        }
        let datevalid = dateValidation(output, self);
        if (datevalid == "") {
          output = "";
        }
        this.value = output;
        self.fillDob = output;
        self.field.value = output;
        // if (self.fillDob) {
        //     self.error.dob.errorMsg = "";
        //     self.error.dob.show = false;
        // }
      });
    }
  }
};
function dateValidation(data, self) {
  //dob format validation
  if (self.field.dob_format && self.field.dob_format == true && data) {
    const tmp = data.split("/");
    if (tmp && tmp.length > 0) {
      let d = tmp[1].trim() + "-" + tmp[0].trim() + "-" + tmp[2].trim();

      let dd = new Date(d);
      let now = moment();
      let not_before = now.valueOf() - 1893417120000; // till 60 years dates
      let not_after = now.valueOf() - 568025136000; //18 years before dates
      if (dd.valueOf() < not_before || dd.valueOf() > not_after) {
        return "";
      }
    }
  }
  // date not display after today
  else if (
    self.field.not_now_after &&
    self.field.not_now_after == true &&
    data
  ) {
    const tmp = data.split("/");
    if (tmp && tmp.length > 0) {
      let d = tmp[1].trim() + "-" + tmp[0].trim() + "-" + tmp[2].trim();

      let dd = new Date(d);
      let now = moment();
      let not_before = now.valueOf() - 3155695200000; //100 years before
      let not_after = now.valueOf(); //today
      if (dd.valueOf() < not_before || dd.valueOf() > not_after) {
        return "";
      }
    }
  }
  // date not display before today
  else if (
    self.field.not_now_before &&
    self.field.not_now_before == true &&
    data
  ) {
    const tmp = data.split("/");
    if (tmp && tmp.length > 0) {
      let d = tmp[1].trim() + "-" + tmp[0].trim() + "-" + tmp[2].trim();

      let dd = new Date(d);
      let now = moment();
      let not_before = now.valueOf(); //today
      let not_after = now.valueOf() + 3155695200000; //100 years after
      if (dd.valueOf() < not_before || dd.valueOf() > not_after) {
        return "";
      }
    }
  }
  // calender format date
  else {
    const tmp = data.split("/");
    if (tmp && tmp.length > 0) {
      let d = tmp[1].trim() + "-" + tmp[0].trim() + "-" + tmp[2].trim();

      let dd = new Date(d);
      let now = moment();
      let not_before = now.valueOf() - 3155695200000; //100 years before
      let not_after = now.valueOf() + 3155695200000; //100 years after
      if (dd.valueOf() < not_before || dd.valueOf() > not_after) {
        return "";
      }
    }
  }
}
function datesimpleformat(date) {
  if (date) {
    const tmp = date.split("-");
    if (tmp && tmp.length > 0) {
      let d = tmp[1] + "-" + tmp[0] + "-" + tmp[2];
      return d;
    }
  }
}
</script>
