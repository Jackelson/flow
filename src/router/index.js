import { createRouter, createWebHashHistory } from "vue-router";
import VisualzeFlow from "../components/visualzeFlow.vue";
const routes = [
  { path: "/", redirect: "/intro", name: "home", component: VisualzeFlow },
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
export default router;
//# sourceMappingURL=index.js.map
