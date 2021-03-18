<template>
  <div>
    <input
      type="text"
      :name="field.name"
      autocomplete="off"
      ref="typeBox"
      :readonly="disableData"
      :maxLength="field.maxLength"
      :minLength="field.minLength"
      :required="field.required"
      v-model="field.value"
      @input="updateForm(field.id, $event)"
      :placeholder="field.placeholder"
      @click="eligibilityvalid(field.value)"
    />
    <span v-if="this.eligibility_error == true" class="valdate-error">{{
      Message
    }}</span>
    <span v-if="this.firstError" class="error">{{ firstError }}</span>
  </div>
</template>
<script>
import validator from "../mixins/validator";

export default {
  name: "TextInput",
  props: ["field", "name", "eligibility_error", "Message"],
  mixins: [validator],
  mounted() {
    this.$nextTick(() => {
      if(this.field.value){
          this.validate();
        }
      if (this.field.prefilled) {
        // this.field.value = this.field.prefilled;

        this.filledData = this.prefilled;
        this.$emit("input", this.value);
        this.$emit(this.name, this.field.value);
      }
    });
    this.$nextTick(this.focusAfterMount);
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
  data() {
    return {
      //  field.value = "text";
    };
  },
  methods: {
    updateForm(fieldName, value) {
      // if(value.target && value.target.value.length >= this.field.maxLength){
      //     return;
      // }
      
      this.$nextTick(() => {
        
        this.validate();
        
        if(this.firstError==undefined){
           this.$emit("onInput", this.field);
        }
        
      });
    },
    focusAfterMount: function() {
      textfocus();
    },
    eligibilityvalid(val) {
      if (val) {
        this.$emit("error", this.eligibility_error);
      }
    }
  },

  watch: {
    "field.id": function(val) {
      this.filledData = this.prefilled;
      if (this.value) {
        this.$emit("input", this.field.value);
      }
    }
  }
};

function textfocus() {
  $(".sptepform input").focus(function() {
    $(this)
      .parents()
      .next(".inputlabel")
      .addClass("active");
  });
  $(".sptepform input").blur(function() {
    if ($(this).val() == "") {
      $(this)
        .parents()
        .next(".inputlabel")
        .removeClass("active");
    }
  });
}
</script>
<style scoped>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance:none;
}
