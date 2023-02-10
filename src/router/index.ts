import { createRouter, createWebHashHistory } from 'vue-router';
import VisualzeFlow from '../components/visualzeFlow.vue';

const routes: Array<any> = [
  { path: '/', name: 'visualzeFlow', component: VisualzeFlow },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;