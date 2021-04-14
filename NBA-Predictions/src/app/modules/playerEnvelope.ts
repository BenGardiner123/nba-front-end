import { Player } from './player'

export interface PlayerEnvelope{
    data: Player[];
    message : string;
    succeeded : boolean;
    pages : number;
}