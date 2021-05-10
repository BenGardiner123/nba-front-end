import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  currentTab: string = 'MyTeams';
  constructor() { }
}
