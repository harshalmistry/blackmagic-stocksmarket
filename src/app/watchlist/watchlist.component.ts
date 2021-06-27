import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { StockService } from '../stock.service';
import { UserService } from '../user.service';
import { Stock } from '../model/stock';
import { StockeventemitterService } from '../stockeventemitter.service';
import { timer } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  stocks: Stock[] = [];
  msg: string = '';
  refreshOnlyData: boolean = false;
  deleted: number[] = [];
  skip: boolean = false;
  refreshRate = environment.refreshRate;
  constructor(
    private stockService: StockService,
    private userService: UserService,
    private eventEmitter: StockeventemitterService
  ) {}

  ngOnInit(): void {
    if (this.eventEmitter.subsVar === undefined) {
      this.eventEmitter.subsVar = this.eventEmitter.invokeWatchListStocks.subscribe(
        () => this.getWatchListStocks()
      );
    }
    timer(0, this.refreshRate).subscribe((x) => {
      this.getWatchListStocks();
    });
  }

  ngOnDestroy() {
    this.eventEmitter.subsVar.unsubscribe();
  }

  getWatchListStocks() {
    this.msg = '';
    if (this.skip) return;
    this.stockService
      .getWatchListStocks(this.userService.loggedInUserId)
      .subscribe(
        (data) => {
          if (this.refreshOnlyData) {
            for (let j = 0; j < data.length; j++) {
              const tempStock = data[j];
              let isFound = false;
              for (let i = 0; i < this.stocks.length; i++) {
                let findStock = this.stocks[i];
                if (tempStock.stockName === findStock.stockName) {
                  findStock.current = tempStock.current;
                  findStock.todayGain = tempStock.todayGain;
                  findStock.lastWeekGain = tempStock.lastWeekGain;
                  findStock.twoWeeksGain = tempStock.twoWeeksGain;
                  findStock.threeWeeksGain = tempStock.threeWeeksGain;
                  findStock.monthGain = tempStock.monthGain;
                  isFound = true;
                  break;
                }
              }
              if (!isFound) this.stocks.push(tempStock);
            }
          } else {
            this.stocks = [...data];
            this.refreshOnlyData = true;
          }
        },
        (error) => {
          this.msg = 'Error while refreshing stocks details';
        }
      );
  }

  onDelete(index: any, id: any) {
    this.skip = true;
    this.stockService.removeWatchListStock(id).subscribe(
      (data) => {
        this.stocks.splice(index, 1);
        this.skip = false;
      },
      (error) => {
        if (
          error.error != undefined &&
          error.error.status == 500 &&
          error.error.errors[0].search('entity with id') > -1
        ) {
          this.stocks.splice(index, 1);
        }
        this.msg = 'Error while removing stock';
        this.skip = false;
      }
    );
  }

  onSave(stock: Stock) {
    this.stockService.saveWatchlistStock(stock).subscribe(
      (data) => {
        this.getWatchListStocks();
      },
      (error) => {
        this.msg = 'Error while saving stock details';
      }
    );
  }
}
