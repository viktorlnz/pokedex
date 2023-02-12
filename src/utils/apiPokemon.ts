import axios from "axios";
import Pokemon from "../models/Pokemon";

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

    let ret:any;

    for (const poke of listFiltered) {
        requisitions.push(axios.get(poke.url));
    }

    const pokemonList = await Promise.all(requisitions)
    .then( responses => {
        const pokes = responses.map(res => {
            const data = res.data;
            return new Pokemon(data.id, data.name, data.sprites.front_default);
        });
        return pokes;
    });

    /*
    const requisitions2 = [];

    for (const poke of pokemonList) {
        requisitions2.push(axios.get(url + 'evolution-chain/' + poke.id));
    }

    const pokemonWithEvolveChain = await Promise.all(requisitions2)
    .then( responses => {
        pokemonList.forEach( p => {
            const evolveChain = responses.find(r => r.data.id === p.id);
            p.evolveChain = evolveChain?.data;
            console.log(p);
        });
        console.log(pokemonList);
        return pokemonList;
    });

    const requisitions3 = [];

    for (const poke of pokemonList) {
        requisitions3.push(axios.get(url + 'pokemon-species/' + poke.id));
    }

    const pokemonWithPreEvolution = await Promise.all(requisitions3)
    .then(responses => {
        pokemonWithEvolveChain.forEach( p => {
            const evolveFrom = responses.find( res => p.id === res.data.id);

            p.evolveFrom = evolveFrom?.data.evolves_from_species;
        });

        return pokemonWithEvolveChain;
    });

    */
    return pokemonList;
}

const getPokemonEvolveChain = async(url: string, name:string) => {
    const res = await axios.get(url);

    const filteredChain = getPokePerChain(res.data.chain);

    const chainWithPokemons = getPokemonsInChain(filteredChain, name);

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

    function getPokemonsInChain(filteredChain:any, name:string, pokemons: Pokemon[] = []){
        const specieName = filteredChain.specie.name;

        if(specieName !== name){

        }
    }
}

const getPokemon = async (id:number):Promise<Pokemon> =>{
    let res:any = await axios.get(url + 'pokemon/' + id);

    const pokeData = res.data;

    res = await axios.get(pokeData.species.url);

    pokeData.specie = res.data;

    console.log(await getPokemonEvolveChain(pokeData.specie.evolution_chain.url, pokeData.name));
    /*
    if(typeof pokeData.specie.evolution_chain !== 'undefined'){
        res = await axios.get(pokeData.specie.evolution_chain.url);

        pokeData.evolutionChain = res.data;

        const requisitions = [];
        for (const evolution of pokeData.evolutionChain.chain.evolves_to) {
            const requisition = axios.get(evolution.species.url);
            requisitions.push(requisition);
        }

        const evolutions = await Promise.all(requisitions)
        .then(responses =>{
            const evolutions = [];

            for (const res of responses) {
                evolutions.push(res.data);
            }

            return evolutions;
        });

        pokeData.evolutionChain = evolutions;
        
    }
    
    if(typeof pokeData.specie.evolves_from_species !== 'undefined' && pokeData.specie.evolves_from_species !== null){
        res = await axios.get(pokeData.specie.evolves_from_species.url);

        pokeData.evolvesFrom = res.data;

    }*/
    
    console.log(pokeData);

    const pokemon = new Pokemon(pokeData.id, pokeData.species.name, pokeData.sprites.front_default);

    pokemon.stats = {
        hp: pokeData.stats[0].base_stat,
        attack: pokeData.stats[1].base_stat,
        defense: pokeData.stats[2].base_stat,
        spAttack: pokeData.stats[3].base_stat,
        spDefense: pokeData.stats[4].base_stat,
        speed: pokeData.stats[5].base_stat,
    };

    pokemon.description = pokeData.specie.flavor_text_entries[0].flavor_text;

    return pokemon;
}



export {searchPokemons, getPokemon}