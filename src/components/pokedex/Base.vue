<script setup lang="ts">
import Pokemon from '../../models/Pokemon';
import PokemonVue from './Pokemon.vue';

defineProps<{
    pokemons: Pokemon[]
}>()


</script>


<template>

<p class="p-aviso-pesquisar" v-if="pokemons.length === 0">Utilize a barra de pesquisa para iniciar sua busca</p>
<section v-else class="pokemons">
    <PokemonVue v-for="pokemon in pokemons" :pokemon="pokemon" class="pokemon" />
</section>
</template>

<style lang="scss" scoped>
    .p-aviso-pesquisar{
        font-size: 1.5rem;
        text-align: justify;
        margin-left: 20px;
        margin-top: 15px;
    }

    .pokemons{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin: auto;
    }
</style>