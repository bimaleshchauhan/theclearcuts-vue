
export default { 
    data() {
        return {
            validationErrors: []
        };
    },
    methods: {
        create_dropdown_option(min, max, step = 1, key) {
            var options = [];
            if (key) {
                for (let i = min; i <= max; i += step) {
                    options.push({
                        id: i,
                        text: i + " "+key
                    });
                }
            } else {
                for (let i = min; i <= max; i += step) {
                    options.push({
                        id: i,
                        text: i > 150 ? sum_assured(i) : i + " Years"
                    });
                }
            }
            function sum_assured(i) {
                var v = i;
                if (v.toString().length == 7 || v.toString().length == 6) {
                    v = v / 100000 + " lakh";
                } else if (
                    v.toString().length == 9 ||
                    v.toString().length == 8
                ) {
                    v = v / 10000000 + " crore";
                } else if (
                    v.toString().length == 4 ||
                    v.toString().length == 5
                ) {
                    v = v / 1000 + " thousand";
                }
                return v;
            }
            return options;
        } 
    }
}