import { IPokemonChained } from './IPokemonChain';

export default interface Ichain{
    pokemon: IPokemonChained,
    nextForm: Ichain[] | null
}