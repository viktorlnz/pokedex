<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import Base from './components/pokedex/Base.vue';
import Ichain from './models/IChain';

import Pokemon from './models/Pokemon';

import {searchPokemons as sp} from './utils/apiPokemon';

const search = ref('');
const pokemons = ref<Pokemon[]>([])

const loading = ref(false);

const router = useRouter();

const changeSearch = (s:string) => {

  search.value = s;
  console.log(search.value);
}

const searchPokemons = async () => {
  router.push('/');

  loading.value = true;

  pokemons.value = searchPokemonsByEvolutionLine(await sp(search.value));

  loading.value = false;
}


const searchPokemonsByEvolutionLine = (pokes:Pokemon[]) => {
  const evolutionPokes = [];
    for (const pokemon of pokes) {
        const getEvolveLine = (line:Ichain, pokes:Pokemon[] = []) => {
            if(line.nextForm !== null)
            for (const evolves of line.nextForm) {
                getEvolveLine(evolves, pokes);
            }

            pokes.push(line.pokemon);

            return pokes;
        }

        if(typeof pokemon.evolveChain !== 'undefined')
        evolutionPokes.push(getEvolveLine(pokemon.evolveChain));
    }

    console.log(evolutionPokes);

    const pokemonList:Pokemon[] = [];
    for (let evolutionChain of evolutionPokes) {
      evolutionChain = evolutionChain.reverse();
        for (const pokemon of evolutionChain) {
            if(!pokemonList.find(p => pokemon.name === p.name))
            pokemonList.push(pokemon);
        }
    }

    return pokemonList;
}

</script>

<template>
  <div>
    <Header :search-func="searchPokemons"  :search-change="changeSearch" />
    <router-view :pokemons="pokemons" :loading="loading"></router-view>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
