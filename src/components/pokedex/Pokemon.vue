<script lang="ts" setup>
    import Pokemon from '../../models/Pokemon';

    import { useRouter } from 'vue-router';

    defineProps<{pokemon: Pokemon}>();

    const router = useRouter();

    const detalhesPokemon = (idPokemon:number) => {
        router.push('/pokemon/' + idPokemon);
    }
</script>

<template>
    <div @click="detalhesPokemon(pokemon.id)" class="pokemon">
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon__image" />
        <h4 class="pokemon__name">{{ pokemon.name.split('-').join(' ') }}</h4>
    </div>
</template>

<style lang="scss" scoped>
    .pokemon{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px;
        padding: 20px 10px;

        background-color: #6666;

        border-radius: 30px;

        cursor: pointer;

        &:hover{
            background-color: #999;
        }

        &__name{
            font-size: 1.2rem;
            text-align: center;
        }
        &__image{
            width: 120px;
        }
    }
</style>