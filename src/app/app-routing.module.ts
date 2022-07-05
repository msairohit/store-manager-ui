import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AboutComponent } from './components/about/about.component';
import { BillingComponent } from './components/billing/billing.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { ManageMedicinesComponent } from './components/manage-medicines/manage-medicines.component';
import { SelectAddressComponent } from './select-address/select-address.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'manage-medicines', component: ManageMedicinesComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'cart', component: CartComponent},
  {path: 'items', component: ItemComponent},
  {path: 'items/:name', component: ItemComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: AboutComponent},
  {path: 'select-address', component: SelectAddressComponent},
  {path: 'address', component: AddressComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
