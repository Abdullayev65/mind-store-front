import {createRouter, createWebHistory} from 'vue-router'
import all from "@/views/index.js"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: all.HomeView
        },
        {
            path: "/sign-up",
            name: "register",
            component: all.RegisterView
        },
        {
            path: "/log-in",
            name: "login",
            component: all.LoginView
        },
        {
            path: "/search",
            name: "search",
            component: all.SearchView
        },
        {
            path: "/mind/:mind_id",
            name: "userMind",
            component: all.MindView
        },
        {
            path: "/:username",
            name: "userMinds",
            component: all.UserMindView
        },

    ]
})

export default router
