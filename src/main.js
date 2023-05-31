import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import uiComponents from "@/ui-components/idex";
import store from "@/store";

const app = createApp(App)

uiComponents.forEach((com) => {
    app.component(com.name, com)
})

app.use(router)
app.use(store)
app.mount('#app')
