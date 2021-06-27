import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from './model/stock';
import { environment } from '../environments/environment';
// const STOCK_URL = 'http://192.168.0.105:5000/api/stocks';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  STOCK_URL = environment.stockServiceBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getStock(stockName: string): Observable<Stock> {
    return this.http.get<Stock>(this.STOCK_URL + '/' + stockName);
  }

  addToWatchList(stock: Stock): Observable<Stock> {
    return this.http.post(this.STOCK_URL, stock, this.httpOptions);
  }

  getWatchListStocks(loggedInUserId: any): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.STOCK_URL + '?userId=' + loggedInUserId);
  }

  removeWatchListStock(id: any) {
    return this.http.delete(this.STOCK_URL + '/' + id);
  }

  // optimize later to only send necessary data and update
  saveWatchlistStock(stock: Stock): Observable<Stock> {
    return this.http.put(
      this.STOCK_URL + '/' + stock.id,
      {
        stockName: stock.stockName,
        userId: stock.userId,
        userNote: stock.userNote,
      },
      this.httpOptions
    );
  }
}
