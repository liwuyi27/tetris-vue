import App from "./App.vue"
import Vue from "vue"

const root = document.createElement("div");
document.body.appendChild(root);

new Vue({
    render:h=>h(App)
}).$mount(root);