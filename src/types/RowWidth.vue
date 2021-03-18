<template>
    <div v-if="show">
        <component
            v-for="(field, index) in field.child"
            :key="index"
            :field="field"
            :is="field.type"
            :value="formData[field.id]"
            :data="data"
            @input="updateForm(field.id, $event)"
            v-bind="field"
            ref="elements"
        ></component>
    </div>
</template>

<script>
import ColumnWidth from "./ColumnWidth";
import _ from "lodash";
export default {
    name: "RowWidth",
    components: {
        ColumnWidth
    },
    props: ["field", "value", "data", "child"],
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
</script>