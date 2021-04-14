import { Header } from "./header";

export interface HeaderEnvelope{
    data: Header[];
    message : string;
    succeeded : boolean;
    pages : number;
}