import Index from "./components/Index.vue";
import Account from "./components/Account";


const routes = [
    {
        path: "/",
        component: Index,
        name: "indexPage",
        meta: {}
    },
    {
        path: "/account",
        component: Account,
        name: "accountPage",
        meta: {}
    },

];

export default routes;