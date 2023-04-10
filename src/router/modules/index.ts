import Workspace from './workspace'
const Home = () => import('@/pages/index.vue')

export default {
  Home,
  ...Workspace,
}
