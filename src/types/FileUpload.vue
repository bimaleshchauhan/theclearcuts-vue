<template>
    <div>
        <input
            type="file"
            :name="field.name"
            :id="field.id"
            ref="file"
            @input="updateForm(field.id, $event)"
            :placeholder="field.placeholder"
            @click="eligibilityvalid(field.value)"
            @change="handleFileUpload"
        />
        <div class="ulpoadfile" v-bind:class="checkvisibledata ? 'inactive' : ''">
            <input
                type="text"
                value="No file chosen"
                readonly
                :id="'text' + field.id"
                :required="field.required"
            />

            <div class="sptepform btn">
                <input
                    type="button"
                    value="Choose File"
                    @click="customUpload"
                    :name="field.name"
                    :id="field.id"
                />
            </div>
        </div>

        <span
            class="hint-file"
            v-if="
                field.allowed_file_type &&
                    this.error != '1' &&
                    this.eligibility_error != true &&
                    !this.firstError
            "
        >({{ field.allowed_file_type }})</span>

        <span v-if="this.error == '1'" class="valdate-error">{{ arrormessage }}</span>
        <span v-if="this.eligibility_error == true" class="valdate-error">{{ Message }}</span>

        <span v-if="this.firstError" class="error">{{ firstError }}</span>
    </div>
</template>
<script>
import validator from "../mixins/validator";
import moment from "moment";
import _ from "lodash";
export default {
    name: "FileUpload",
    props: [
        "field",
        "name",
        "eligibility_error",
        "Message",
        "error",
        "myevent"
    ],
    data() {
        return {
            fileupload: "",
            datafield: []
            //  field.value = "text";
        };
    },
    mixins: [validator],
    mounted() {
        //this.datafield.push(this.field);
        this.$nextTick(() => {
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
        checkvisibledata() {
            // let data = this.$store.state.select_box_data;
            // let val = [];
            // if (data.length > 0) {
            //     for (let i = 0; i < data.length; i++) {
            //         let dataid = data[i].id + "_file";
            //         if (dataid == this.field.id) {
            //             val = false;
            //         } else {

            //             // val = true;
            //             return val;
            //         }
            //     }
            // } else {
            //     //  this.datafield.push(this.field);
            //     return val;
            // }
            return false;
        },
        arrormessage() {
            if (this.field.validators) {
                return _.first(this.field.validators).message;
            } else return;
        }
    },

    methods: {
        updateForm(fieldName, value) {
            // this.$nextTick(() => {
            //     this.validate();
            // });
        },
        customUpload(e) {
            let customedata = document.getElementById(e.target.id);
            customedata.click();
        },
        handleFileUpload(e) {
            this.fileValidation();
            let filedata = {};
            let file = _.first(e.target.files);

            if (file) {
                filedata.value = file.name;
                filedata.size = file.size;
                filedata.type = file.type;
                if (file.name) {
                    document.getElementById("text" + e.target.id).value =
                        file.name;
                } else {
                    document.getElementById("text" + e.target.id).value =
                        "No file chosen";
                }
                filedata.modifiedDate = moment(file.lastModifiedDate).format(
                    "DD-MM-YYYY"
                );
                var reader = new FileReader();

                reader.onloadend = function() {
                    filedata.data = reader.result;
                };

                if (file) {
                    reader.readAsDataURL(file);
                } else {
                }
                this.field.value = filedata;
            } else {
                this.field.value = "";
                document.getElementById("text" + e.target.id).value =
                    "No file chosen";
            }
            if (e) {
                this.$emit("error", e);
                this.$emit("error", this.eligibility_error);
            }
        },
        focusAfterMount: function() {
            textfocus();
        },
        eligibilityvalid(val) {
            if (val) {
                this.$emit("error", this.eligibility_error);
            }
        },
        fileValidation() {
            this.$nextTick(() => {
                this.validate();
            });
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
span.hint-file {
    bottom: -5px;
    top: unset;
    color: #b0abab;
    font-weight: 300;
}
</style>
