import Vue from "vue";
import Router from "vue-router"
import Home from "@/views/Home";
import Basket from "@/views/Basket";

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            props: true
        },
        {
            path: "/basket",
            name: "Basket",
            component: Basket,
            props: true
        },
        {
            path: "/details/:slug",
            name: "CategoryDetails",
            props: true,
            component: () =>
                import(/*webpackChunkName: "DestinationDetails" */ "./views/CategoryDetails"),
        },
    ]
})