import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Stock } from '../model/stock';
import { StockService } from '../stock.service';
import { UserService } from '../user.service';
import { StockeventemitterService } from '../stockeventemitter.service';
import { WatchlistComponent } from '../watchlist/watchlist.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-stockdetail',
  templateUrl: './stockdetail.component.html',
  styleUrls: ['./stockdetail.component.css'],
})
export class StockdetailComponent implements OnInit, OnChanges {
  @Input() stock!: Stock;
  msg: string = '';
  constructor(
    private stockService: StockService,
    private userService: UserService,
    private eventEmitter: StockeventemitterService
  ) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.msg = '';
  }

  ngOnInit(): void {
    timer(0, 10000).subscribe((x) => {
      if (this.msg) {
        this.msg = '';
      }
    });
  }

  onAddToWatchList(): void {
    this.msg = '';
    if (this.stock.stockName !== undefined && this.stock.stockName != '') {
      this.stockService
        .addToWatchList({
          userId: this.userService.loggedInUserId,
          stockName: this.stock.stockName,
        })
        .subscribe(
          (data) => {
            this.eventEmitter.refreshWatchList();
            this.msg = 'Stock added to watchlist';
          },
          (error) => {
            let response = error.error;
            if (response != undefined && response.status == 409) {
              this.msg = 'Stock already present in watchlist';
            } else {
              this.msg = 'Error while adding stock to watchlist';
            }
          }
        );
    } else {
      this.msg = 'Please search stock name';
    }
  }
}
