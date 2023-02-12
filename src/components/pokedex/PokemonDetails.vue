<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import{getPokemon} from '../../utils/apiPokemon';
import Pokemon from '../../models/Pokemon';
    const router = useRouter();
    const route = useRoute();

    const id = route.params.id;

    const pokemon = ref<Pokemon>();

    onMounted(async() => {
        pokemon.value = await getPokemon(Number(id));

        console.log(pokemon.value);
    });
</script>

<template>

    <main class="pokemon">
        <div class="pokemon-icone">
            <h2 class="pokemon-icone__title">{{ pokemon?.name }}</h2>
            <img class="pokemon-icone__image" :src="pokemon?.image" :alt="pokemon?.name" />
        </div>
        <div class="pokemon-stats">
            <h3 class="pokemon-stats__title">Status</h3>
            <span class="pokemon-stats__hp">HP: {{ pokemon?.stats.hp }}</span>
            <span class="pokemon-stats__attack">Ataque: {{ pokemon?.stats.attack }}</span>
            <span class="pokemon-stats__defense">Defesa: {{ pokemon?.stats.defense }}</span>
            <span class="pokemon-stats__sp-attack">Ataque especial: {{ pokemon?.stats.spAttack }}</span>
            <span class="pokemon-stats__sp-defense">Defesa especial: {{ pokemon?.stats.spDefense }}</span>
            <span class="pokemon-stats__speed">Velocidade: {{ pokemon?.stats.speed }}</span>
        </div>
        <div class="pokemon-description">
            <p>{{ pokemon?.description }}</p>
        </div>
    </main>

    <button @click="() => router.push('/')" class="btn-voltar">Voltar</button>
</template>

<style lang="scss" scoped>

    .btn-voltar{
        background-color: #666;
        border: 1px solid #ddda;
        color: #fff;
        box-shadow: 1px 2px 1px #111d;

        font-size: 1.4rem;
        padding: 10px 20px;
        margin: 20px;

        cursor: pointer;
        &:hover{
            background-color: #999;
        }
    }

    .pokemon{
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        min-width: 300px;
        margin: 30px auto;
        padding: 20px;
        box-shadow: 1px 2px 1px #000a;
        background-color: #9998;

        &-icone{
            display: inline-block;
            width: 50%;
            min-width: 280px;
            &__title{
                font-size: 2rem;
                text-align: center;
            }
            &__image{
                width: 250px;
                margin: auto;
                display: block;
                background-color: #999a;
                border-radius: 15px;

                &:hover{
                    background-color: #aaaa;
                }
            }
        }

        &-stats{
            width: 200px;
            display: inline-block;
            padding: 30px;

            & > *{
                display: block;
                margin-top: 5px;

                font-weight: bold;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }

            &__title{
                margin-bottom: 10px;
            }
            
            &__hp{
                color: rgb(222, 46, 46);
            }

            &__attack{
                color: rgb(193, 35, 225);
            }

            &__defense{
                color: rgb(246, 246, 29);
            }

            &__sp-attack{
                color: rgb(242, 142, 27);
            }

            &__sp-defense{
                color: rgb(20, 231, 20);
            }

            &__speed{
                color: rgb(111, 111, 255);
            }
        }

        &-description{
            margin: 20px;

            p{
                font-family: 'Courier New', Courier, monospace;
            }
        }
    }

</style>