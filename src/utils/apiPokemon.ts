import axios from "axios";
import Pokemon from '../models/Pokemon';
import Ichain from '../models/IChain';
import { IPokemonChained } from '../models/IPokemonChain';

const url = 'https://pokeapi.co/api/v2/';

const listAllPokemons = async () => {

    const res:any = await axios.get(url + 'pokemon?limit=1');

    const count = res.data.count;

    const pokemonsListParse = localStorage.getItem('pokemons');

    let pokemonsList:{name:string, url: string}[] = [];
    if(pokemonsListParse !== null){
        pokemonsList = JSON.parse(pokemonsListParse);
    }

    
    if(pokemonsListParse === null || pokemonsList.length !== count){
        const res2:any = await axios.get(url + 'pokemon?limit=10000');
        console.log(res2);
        pokemonsList = res2.data.results;

        localStorage.setItem('pokemons', JSON.stringify(pokemonsList));
    }
    
    

    return pokemonsList;
}

const searchPokemons = async (search:string) =>{
    const listPokemons: {name:string, url: string}[] = await listAllPokemons();

    const listFiltered = listPokemons.filter( p => p.name.includes(search));

    const requisitions = [];

    for (const poke of listFiltered) {
        requisitions.push(axios.get(poke.url));
    }

    const pokemonList = await Promise.all(requisitions)
    .then( async responses => {

        const pokes:Pokemon[] = [];
        
        for (const res of responses) {
            const data = res.data;

            const pokemon:Pokemon = await getPokemon(data.id)
            .then( (res:Pokemon) => res);
            
            pokes.push(pokemon);
        }

        return pokes;
    });

    
    return pokemonList;
}

const getPokemonEvolveChain = async(url: string, pokemon:Pokemon) => {
    const res = await axios.get(url);

    const filteredChain = getPokePerChain(res.data.chain);

    const chainWithPokemons = await getPokemonsInChain(filteredChain, pokemon);

    return chainWithPokemons;

    function getPokePerChain(chain:any, arr:any[] = []){
        const specie = chain.species;

        const evolveChain:any = {
            specie
        };

        if(chain.evolves_to.length > 0){
            for (const evolution of chain.evolves_to) {
                arr.push(getPokePerChain(evolution, []));        
            }

            evolveChain.evolutions = arr;
        }
        
        return evolveChain;
    }


    async function getPokemonsInChain(filteredChain:any, samePokemon:Pokemon, pokemons: Ichain|null = null){
        let pokeChain:Ichain =  {pokemon: {...new Pokemon(1, '', ''), isMain:false}, nextForm: []};
        
        if(typeof filteredChain.evolutions !== 'undefined'){
            for (const evolution of filteredChain.evolutions) {
                pokeChain.nextForm?.push( await getPokemonsInChain(evolution, samePokemon));
            }
        }

        const res = await axios.get(filteredChain.specie.url);

        if (res.data.name === samePokemon.name){
            pokeChain.pokemon = {...samePokemon, isMain: true};
        }
        else{
            const res2 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + res.data.id);

            const data = res2.data;

            pokeChain.pokemon = {...new Pokemon(data.id, data.name, data.sprites.front_default, ), isMain: false};

        }

        
        return pokeChain;
    }
}

const getPokemon = async (id:number):Promise<Pokemon> =>{
    let res:any = await axios.get(url + 'pokemon/' + id);

    const pokeData = res.data;

    res = await axios.get(pokeData.species.url);

    pokeData.specie = res.data;

    const pokemon = new Pokemon(pokeData.id, pokeData.species.name, pokeData.sprites.front_default);

    pokemon.stats = {
        hp: pokeData.stats[0].base_stat,
        attack: pokeData.stats[1].base_stat,
        defense: pokeData.stats[2].base_stat,
        spAttack: pokeData.stats[3].base_stat,
        spDefense: pokeData.stats[4].base_stat,
        speed: pokeData.stats[5].base_stat,
    };

    if(typeof pokeData.specie.flavor_text_entries[0] !== 'undefined'){
        pokemon.description = pokeData.specie.flavor_text_entries[0].flavor_text;
    }
    
    pokemon.evolveChain = await getPokemonEvolveChain(pokeData.specie.evolution_chain.url, Object.assign({},pokemon));

    return pokemon;
}



export {searchPokemons, getPokemon}