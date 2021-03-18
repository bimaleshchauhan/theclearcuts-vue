<template>
    <div class="radio" v-if="field">
        <label class="switch">
            <input
                type="checkbox"
                v-model="field.value"
                :disabled="disable"
                @click="clickcheckbtn(field.value, field)"
                :id="field.id"
            />
            <span class="slider round"></span>
        </label>

        <!-- <span v-if="this.error == '1'" class="valdate-error">{{
            arrormessage
        }}</span> -->
    </div>
</template>
<script>
export default {
    props: [
        "name",
        "field",
        "error",
        "eligibility_error",
        "Message",
        "disable"
    ],

    data() {
        return {
            filledData: "",
            toggleValues: ""
        };
    },
    computed: {
        arrormessage() {
            if (this.field.validators && this.field.validators.length > 0) {
                return _.first(this.field.validators).message;
            } else return;
        }
    },
    methods: {
        clickcheckbtn(val, data) {
            if (data.disable == "true") {
                document.getElementById(data.id).checked = false;
            } else {
                this.$emit("togglebtn", val);
                if (val) {
                    this.$emit("error", this.error);
                    this.$emit("error", this.eligibility_error);
                }
            }
        }
    }
};
</script>
<style>
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: -5px;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(50px);
    -ms-transform: translateX(50px);
    transform: translateX(50px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
.pdRightBox .switch {
    width: 80px;
    height: 34px;
    top: 4px;
}
</style>
