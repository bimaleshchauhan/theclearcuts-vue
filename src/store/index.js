import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


// export const store = new Vuex.Store({
//     state,
//     getters,
//     mutations,

// })

const createStore = () => {
    return new Vuex.Store({
        state: state,
        mutations: {
            // resetState(state) {
            //     reset(state)
            // },

            PREMIUM_CALCULTION_WHOLE_DATA:(state, wholedata) => {
                state.whole_data = wholedata;
            }
        }
    })
}