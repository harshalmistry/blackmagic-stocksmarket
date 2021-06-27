import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  stock?: Stock;
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stock = new Stock();
  }

  onSearch(stock: Stock) {
    this.stock = stock;
  }
}
