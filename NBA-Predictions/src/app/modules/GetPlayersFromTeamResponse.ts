import { Player } from './player'
export interface GetPlayersFromTeamResponse {
    "pagedData": Player[],
    "dtr": number
}