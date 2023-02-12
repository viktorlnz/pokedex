<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineProps<{
    searchChange: Function,
    searchFunc: Function
}>()

const router = useRouter();

const search = ref('');



</script>


<template>
    <header class="header">
        <h1 @click="() => router.push('/')" class="header__title">Pokedex</h1>
        <section class="header-search">
            <input class="header-search__input" v-model="search" @input="searchChange(search)" type="text" placeholder="Pesquisar" />
            <button class="header-search__button" @click="searchFunc()" type="button">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
        </section>
    </header>
</template>

<style lang="scss" scoped>

    $corTitulo:rgb(218, 218, 42);

    .header{

        background-color: #666;
        min-height: 100px;
        margin: 0;
        border-bottom: 1px solid #666;

        &__title{

            font-size: 26pt;

            color: $corTitulo;
            padding: 20px;
            cursor: pointer;

            &:hover{
                color: #ff6;
            }
        }

        &-search{
            max-width: 400px;
            &__input{
                background-color: #ffe;
                border: unset;
                border-bottom: 1px solid #ccc;
                margin-left: 15px;
                
            }

            &__button{
                background-color: #f43b;
                color: white;
                border: 1px solid #666a;

                &:hover{
                    background-color: #f86b;
                }
            }

            &__input, &__button{
                font-size: 1.2rem;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }
        }
    }
</style>