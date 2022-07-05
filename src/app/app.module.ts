import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ManageMedicinesComponent } from './components/manage-medicines/manage-medicines.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { BillingComponent } from './components/billing/billing.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CardComponent } from './components/card/card.component';
import { ItemComponent } from './components/item/item.component';
import { CartComponent } from './components/cart/cart.component';
import { SelectAddressComponent } from './select-address/select-address.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ManageMedicinesComponent,
    AboutComponent,
    ErrorComponent,
    TableComponent,
    BillingComponent,
    CardComponent,
    ItemComponent,
    CartComponent,
    SelectAddressComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
