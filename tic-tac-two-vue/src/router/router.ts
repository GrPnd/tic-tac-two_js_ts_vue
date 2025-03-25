import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import CreateGame from '../components/CreateGame.vue';
import PlayGame from '../components/PlayGame.vue';
import WinScreen from '../components/WinScreen.vue';



const routes = [
    {
        path: '/', 
        name: 'Home', 
        component: Home
    },
    {
        path: '/creategame', 
        name: 'CreateGame', 
        component: CreateGame
    },
    {
        path: '/playgame', 
        name: 'PlayGame', 
        component: PlayGame
    },
    {
        path: '/winscreen', 
        name: 'WinSreen', 
        component: WinScreen
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;