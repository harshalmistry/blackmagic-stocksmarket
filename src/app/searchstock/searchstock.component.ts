import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-searchstock',
  templateUrl: './searchstock.component.html',
  styleUrls: ['./searchstock.component.css'],
})
export class SearchstockComponent implements OnInit {
  searchStock: string = '';
  @Output() searchedStock = new EventEmitter<Stock>();
  stock: Stock = new Stock();
  msg: string = '';
  constructor(private stockService: StockService) {}

  ngOnInit(): void {}

  getEmptyStock() {
    this.stock.lastAccessTime = '';
    this.stock.yearHigh = 0;
    this.stock.price = 0;
    this.stock.yearLow = 0;
    this.stock.open = 0;
    this.stock.previousClose = 0;
    this.stock.id = 0;
    this.stock.userId = 0;
    this.stock.stockName = '';
  }

  onSubmit() {
    if (this.validate()) {
      this.msg = '';
      this.stockService.getStock(this.searchStock).subscribe(
        (stock: Stock) => {
          stock.stockName = this.searchStock;
          this.searchedStock.emit(stock);
        },
        (error) => {
          this.searchedStock.emit(this.stock);
          this.msg = error.error.errors[0];
        }
      );
    } else {
      this.searchedStock.emit(this.stock);
    }
  }
  private validate() {
    let isValid = true;
    if (this.searchStock === '') {
      this.msg = 'Stock name requried';
      isValid = false;
    }
    return isValid;
  }
}
