import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Department from '@/views/Department.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import DepartmentEdit from '@/views/DepartmentEdit.vue'
import DepartmentCreate from '@/views/DepartmentCreate.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/department',
    name: 'Departments',
    component: Department,
  },
  {
    path: '/departmentEdit/:id',
    name: 'DepartmentsEdit',
    component: DepartmentEdit,
  },
  {
    path: '/departmentCreate',
    name: 'DepartmentsCreate',
    component: DepartmentCreate,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
