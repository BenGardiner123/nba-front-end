import { Header } from "./header"

export interface HeadersResponse{
    data: Header[];
    succeeded : string;
    message: null;
    pages: number;
}