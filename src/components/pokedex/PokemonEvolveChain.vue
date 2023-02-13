<script setup lang="ts">
import { watch, watchEffect } from "@vue/runtime-core";
import Ichain from "../../models/IChain";


const props = defineProps<{
    pokeChain: Ichain | undefined
}>()


console.log(props.pokeChain);

function hasNext(){
    if(typeof props.pokeChain?.nextForm?.length !== 'undefined' && props.pokeChain.nextForm.length > 0){
        return true;
    }

    return false;
}

</script>

<template>
    <div class="pokemons" v-if="(typeof pokeChain !== 'undefined')">
        <div class="pokemon">
            <a :href='"/pokemon/" + pokeChain.pokemon.id'>
                <div class="pokemon-card">
                    <img :src="pokeChain.pokemon.image" :alt="pokeChain.pokemon.name" class="pokemon__image" />
                    <h4 class="pokemon__name">{{ pokeChain.pokemon.name }}</h4>
                </div>
            </a>
            <span v-if="hasNext()" class="material-symbols-outlined setas">
                arrow_forward
            </span>
        </div>
        
        <pokemon-evolve-chain v-for="poke of pokeChain.nextForm" :key="poke.pokemon.id" :poke-chain="poke"></pokemon-evolve-chain>
    </div>
</template>

<style lang="scss">

.pokemons{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.pokemon{
    display: flex;
    flex-direction: row;
    align-items: center;

    a{
        color: white;
    }
    &-card{
        float: left;
        width: 150px;
        margin: 10px;
        &:hover{
            background-color: #9999;
            transition: all 1.5s;
            border-radius: 25px;
        }
    }

    &__image{
        display: block;
        margin: auto;
    }

    &__name{
        text-align: center;
    }
}

@media screen and (max-width: 600px) {
    .pokemon-card{
        width: 70px;
    }

    .pokemon__image{
        width: 50px;
    }
}

</style>