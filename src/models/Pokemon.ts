import Ichain from './IChain';
interface status {
    hp:number,
    attack: number,
    defense: number,
    spAttack: number,
    spDefense: number,
    speed: number
}

export default class Pokemon{

    public stats:status = {hp:0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0};
    public description:string = '';


    constructor(
        public id: number,
        public name: string,
        public image: string,
        public evolveChain?: Ichain,
    ){}
}