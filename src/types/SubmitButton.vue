<template>
    <div>
        <div class="error error-show" id="errorShow22">
            <span
                v-if="errorshowdata==true && !this.$store.state.error_status"
                class="valdate-error"
            >{{ errorshow_message }}</span>
            <input type="text" id="errorShow" />
        </div>
        <input
            v-if="buttonloader==false"
            type="submit"
            :name="name"
            :onclick="onclick"
            :value="field.value"
            @input="updateForm(field.id, $event)"
        />
        <buttonloader v-if="buttonloader==true" />
        <span v-if="this.firstError">{{ firstError }}</span>
    </div>
</template>
<script>
import ErrorShow from "./ErrorShow";
import validator from "../mixins/validator";
import buttonloader from "../components/globalComponents/button-loader";
export default {
    components: { buttonloader, ErrorShow },
    name: "TextInput",
    props: [
        "placeholder",
        "label",
        "name",
        "value",
        "field",
        "data",
        "prefilled",
        "onclick",
        "buttonloader",
        "errorshow",
        "errorshow_message",
        "eligibility_error",
        "statusvalue"
    ],
    mixins: [validator],
    mounted() {
        this.$nextTick(() => {
            if (this.prefilled) {
                this.filledData = this.prefilled;
                this.$emit("input", this.value);
            }
        });
    },
    data() {
        return {
            filledData: ""
        };
    },
    computed: {
        errorshowdata() {
            let data = true;

            if (this.errorshow == true) {
                document.getElementById("errorShow").focus();
                return data;
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
        EdelweissForm: function() {}
    },
    watch: {
        "field.id": function(val) {
            this.filledData = this.prefilled;
            if (this.value) {
                this.$emit("input", this.value);
            }
        }
    }
};
</script>