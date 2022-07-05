import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  //Ng autocomplete : https://www.npmjs.com/package/angular-ng-autocomplete
  //FIXME: when clicked on search cancel, default search is not happening
  //FIXME: Add frontend validations before submitting.

  //FIXME: Add upload image option and show it in the billing and cart pages.
  constructor(private httpClient: HttpClient) { }

  @ViewChild('auto') auto;

  ngOnInit(): void {
    this.searchComplete();
  }

  obs:Subscription;

  keyword = 'name';
  data = [];


  selectEvent(item) {
    // do something with selected item
    console.log("item selected: " + JSON.stringify(item));
    this.searchComplete(item.name);
  }

  onChangeSearch(val) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

    console.log("need to fetch the list of products : " + val);
    if(val === '') {
      this.searchComplete();
    }
    this.search(val);
  }

  onFocused(e) {
    // do something when input is focused
    console.log(e.target.value);
  }

  searchComplete(name?) {
    let url = 'http://localhost:8080/medicine';
    if(name) {
      url += '/' + name;
    }
    this.httpClient.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.data = res.result;
        },
        error => {
          console.error(error);
        }
      );
  }

  search(name?) {
    let url = 'http://localhost:8080/medicine/like/';
    if(name) {
      url += name;
    }
    this.httpClient.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.data = res.result;
        },
        error => {
          console.error(error);
        }
      );
  }

  onInputCleared (e) {
    this.auto.close();
    this.searchComplete();
  }
}
