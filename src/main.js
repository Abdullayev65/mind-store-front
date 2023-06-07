import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import uiComponents from "@/ui-components/idex";
import store from "@/store";
import gallery from 'img-vuer3'
import 'img-vuer3/dist/style.css'

const app = createApp(App)

uiComponents.forEach((com) => {
    app.component(com.name, com)
})

app.use(gallery, {
    swipeThreshold: 150, // default 100
    isIndexShow: true, // show image index, default true
    useCloseButton: true, // trigger gallery close with close button, default true
    preload: true, // preload images in the same group, default true
    sliderBackgroundColor: 'rgba(0,0,0,0.6)',
    sliderZIndex: 1001,
})
app.use(router)
app.use(store)
app.mount('#app')
