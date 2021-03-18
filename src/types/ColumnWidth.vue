<template>
  <div v-if="show">
    <component
      v-for="(field, index) in field.subchild"
      :key="index"
      :field="field"
      :is="field.type"
      :value="formData[field.id]"
      :data="data"
      v-bind="field"
      ref="elements"
      @input="updateForm(field.id, $event)"
    ></component>
  </div>
</template>

<script>
import Calendar from "./Calendar";
import RadioInput from "./RadioInput";
import ExtendRadioInput from "./ExtendRadioInput";
import NumberInput from "./NumberInput";
import SelectList from "./SelectList";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import ExtendCheckbox from "./ExtendCheckbox";
import RadioButton from "../types/RadioButton";
import HeaderText from "./HeaderText";
import SubContainer from "./SubContainer";
import SubmitButton from "../types/SubmitButton";
import HiddenText from "../types/HiddenText";

export default {
  name: "ColumnWidth",
  components: {
    NumberInput,
    SelectList,
    TextInput,
    Calendar,
    RadioInput,
    ExtendRadioInput,
    Checkbox,
    ExtendCheckbox,
    HeaderText,
    SubContainer,
    RadioButton,
    SubmitButton,
    HiddenText
  },
  props: ["field", "value", "data", "subchild"],
  data() {
    return {
      formData: this.value || {},
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
    },
    save() {
      /* this.validate();
            if (this.validationErrors.length <= 0) {
                this.$parent.nextStep();
            } */
    }
  },
  watch: {
    data: {
      handler(val) {
        if (this.field.showIf && this.field.showIf.indexOf("[]") >= 0) {
          var arr = _.split(this.field.showIf, "[]");
          let d = _.get(val, arr[0]);
          if (d.includes(arr[1])) {
            this.show = true;
          } else {
            this.show = false;
          }
        }
        if (this.field.showIf && this.field.showIf.indexOf("~") >= 0) {
          var arr = _.split(this.field.showIf, "~");
          let d = _.get(val, arr[0]);
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