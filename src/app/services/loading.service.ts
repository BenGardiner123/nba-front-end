import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
// import { ManagePlayersComponent } from '../routers/manage-players/manage-players.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new BehaviorSubject<boolean>(false);

  constructor(){}
    // public managePlayersComponent: ManagePlayersComponent) { }

  StartLoading(): void {
    this.isLoading.next(true);
  }

  StopLoading(): void {
    this.isLoading.next(false);
    // console.log('s')
    // this.managePlayersComponent.FreezeColumns();
  }
}
