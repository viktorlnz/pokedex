<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import Base from './components/pokedex/Base.vue';

import Pokemon from './models/Pokemon';

import {searchPokemons as sp} from './utils/apiPokemon';

const search = ref('');
const pokemons = ref<Pokemon[]>([])

const router = useRouter();

const changeSearch = (s:string) => {

  search.value = s;
  console.log(search.value);
}

const searchPokemons = async () => {
  router.push('/');

  pokemons.value = await sp(search.value);
}

</script>

<template>
  <Header :search-func="searchPokemons"  :search-change="changeSearch" />
  <router-view :pokemons="pokemons"></router-view>
</template>

<style lang="scss">
@import './style.scss';
</style>
