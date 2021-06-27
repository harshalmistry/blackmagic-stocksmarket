import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockeventemitterService {
  invokeWatchListStocks = new EventEmitter();
  subsVar!: Subscription;

  constructor() {}

  refreshWatchList() {
    this.invokeWatchListStocks.emit();
  }
}
