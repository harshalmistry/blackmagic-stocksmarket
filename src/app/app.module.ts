import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StocksComponent } from './stocks/stocks.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DummyComponent } from './dummy/dummy.component';
import { SignupformComponent } from './signupform/signupform.component';
import { SearchstockComponent } from './searchstock/searchstock.component';
import { StockdetailComponent } from './stockdetail/stockdetail.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { AuthGuard } from './auth.guard';
import { SortDirective } from './sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StocksComponent,
    HeaderComponent,
    HomeComponent,
    DummyComponent,
    SignupformComponent,
    SearchstockComponent,
    StockdetailComponent,
    WatchlistComponent,
    SortDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
