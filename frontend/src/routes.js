import Index from "./components/Index.vue";
import Account from "./components/Account";
import Check_page from "./components/Check_page";
import History_page from "./components/History_page";


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
    {
        path: "/work/:student_fio",
        component: Check_page,
        name: "checkPage",
        meta: {}
    },
    {
        path: "/history",
        component: History_page,
        name: "historyPage",
        meta: {}
    },

];

export default routes;