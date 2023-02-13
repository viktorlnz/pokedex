<script setup lang="ts">
import { watchEffect } from '@vue/runtime-core';
import Ichain from '../../models/IChain';
import Pokemon from '../../models/Pokemon';
import PokemonVue from './Pokemon.vue';

const props = defineProps<{
    pokemons: Pokemon[],
    loading: boolean
}>()
</script>


<template>

<p class="p-aviso-pesquisar" v-if="pokemons.length === 0 && !loading">Utilize a barra de pesquisa para iniciar sua busca</p>
<p class="p-carregando" v-if="loading">Carregando...</p>
<section v-else class="pokemons">
    <div v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonVue class="pokemon" :pokemon="pokemon"/>
    </div>
</section>
</template>

<style lang="scss" scoped>
    .p-aviso-pesquisar{
        font-size: 1.5rem;
        text-align: justify;
        margin-left: 20px;
        margin-top: 15px;
    }

    .p-carregando{
        font-size: 2rem;
        text-align: center;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }

    .pokemons{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin: auto;
    }
</style>