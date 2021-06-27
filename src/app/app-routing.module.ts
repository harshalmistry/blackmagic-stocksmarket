import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'stocks', component: StocksComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
