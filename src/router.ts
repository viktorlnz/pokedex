import Base from './components/pokedex/Base.vue';
import PokemonDetails from './components/pokedex/PokemonDetails.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Base
    },
    {
        path: '/pokemon/:id',
        name: 'Pokemon',
        component: PokemonDetails
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;