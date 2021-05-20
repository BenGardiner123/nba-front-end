import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  StartLoading(): void {
    this.isLoading.next(true);
  }

  StopLoading(): void {
    this.isLoading.next(false);
  }
}
