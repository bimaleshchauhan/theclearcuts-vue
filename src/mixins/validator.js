import moment from "moment";
export default {
    data() {
        return {
            validationErrors: []
        };
    },
    methods: {
        validate() {

            this.validationErrors = [];
            if (!this.field) {
                return;
            }
            if(this.field.validators){
            this.field.validators.forEach(validator => {
                let error = undefined;
                if (validator.name == 'required') {
                    error = this.requiredValidate(validator);
                } else if (validator.name == 'regex') {
                    error = this.regexValidate(validator);
                } else if (validator.name == 'custom') {
                    error = this.customeValidator(validator);
                }
                if (error) {
                    this.validationErrors.push(error);
                }
            });
        }
        },
        regexValidate(validator) {

            let res = this.checkEmpty(validator.message);
            if (res != null) return res;

            if (!_.isNil(validator.expression)) {
                let expression = validator.expression;
                let re = new RegExp(_.trim(expression, '/'));
                if (this.field.type == "FileUpload") {
                    if (!re.test(this.field.value.value)) {
                        return this.msg(validator.message);
                    }
                } else {
                    if (!re.test(this.field.value)) {
                        return this.msg(validator.message);
                    }
                }
            }
        },
        requiredValidate(validator) {
            let res = this.checkEmpty(validator.message);
            if (res != null) return this.msg(validator.message);
        },
        checkEmpty(message) {

            if (_.isNil(this.field.value) || this.field.value === '') {
                if (this.field.required) {
                    return this.msg(message);
                } else {
                    return;
                }
            }


            return null;
        },
        msg(text) {
            if (text != null && arguments.length > 1) {
                for (let i = 1; i < arguments.length; i++) {
                    text = text.replace('{' + (i - 1) + '}', arguments[i]);
                }
            }
            return text;
        },
        customeValidator(validator) {
            return this.msg(validator.message);
        }
    },
    computed: {
        firstError() {
            return _.first(this.validationErrors);

        }

    }
};