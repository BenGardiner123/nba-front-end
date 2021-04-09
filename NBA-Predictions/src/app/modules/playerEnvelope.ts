import { Player } from './player'

export interface PlayerEvelope{
    data: Player[];
    errors: string[];
    message : string;
    succeeded : boolean;
}