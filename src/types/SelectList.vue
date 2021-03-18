<template>
  <div>
    <Select2
      v-model="field.value"
      :options="field.options"
      :name="field.id"
      :id="field.id"
      autocomplete="off"
      :disabled="disableData"
      @change="myChangeEvent(field, field.id)"
      @select="mySelectEvent($event)"
    />

    <!-- <select class="select-box" :name="field.name" :required="field.required" v-model="field.value">
        <option value>Please select an option</option>-->

    <!-- <option v-for="option in field.options" :key="option.key" :value="option.key">{{option.value}}</option>
        </select>-->
    <span v-if="this.error == '1'" class="valdate-error">{{
      arrormessage
    }}</span>
    <span v-if="this.eligibility_error == true" class="valdate-error">{{
      Message
    }}</span>
    <span v-if="this.firstError" class="error">{{ firstError }}</span>
  </div>
</template>
<script>
import validator from "../mixins/validator";
import Select2 from "v-select2-component";
export default {
  components: { Select2 },
  name: "SelectList",
  props: ["name", "field", "error", "eligibility_error", "Message"],
  mixins: [validator],

  mounted() {
    //sectionBox();

    // $(".select-box").select2({
    //   templateSelection: formatState
    // });
    // var _this = this;
    // function formatState(state) {
    //   if (!state.id) {
    //     return state.text;
    //   }
    //   _this.field.value = state.id;
    //   _this.$emit("input", state.id);

    //   return state.text;
    // }
    this.$nextTick(() => {
      if (this.prefilled) {
        this.filledData = this.prefilled;
        this.$emit("input", this.prefilled);
      }
    });
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
    updateForm(fieldName, value) {
      this.$emit("input", value.srcElement.value);
      this.$nextTick(() => {
        this.validate();
      });
    },
    myChangeEvent(val, id) {
      this.field["selectedId"] = id;
      if (val) {
        this.$store.commit("SELECT_BOX_DATA", this.field);
        this.$emit("error", val);
        this.$emit("error", this.eligibility_error);
      }
    },

    mySelectEvent({ id, text }) {}
  },
  destroyed: function() {
    // $(this.$refs.select)
    //     .off()
    //     .select2("destroy");
  }
};
</script>
