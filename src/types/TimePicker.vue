<template>
    <div class="time-picker">
        <input
          type="time"
          :name="field.name"
          v-model="field.value"
          :required="field.required"
          />
        <span v-if="this.firstError" class="error">{{ firstError }}</span>
    </div>
</template>
<script>
import validator from "../mixins/validator";
export default {
    name: "TimePicker",
    props: ["field", "name", "eligibility_error", "Message"],
    mixins: [validator],
}
</script>