import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    //TODO: add backend service.
    /* let url = 'http://localhost:8080/address/all';
    this.httpClient.get(url).subscribe(
      (res) => {
        console.log("if there are no addresses, then navigate to add address page and after saving that new address select that address and procees further for payment option from there itself.");
      }, (error) => {
        console.error(error);
      }
    ); */
    if(/* res.count < 1 */true) {
      this.router.navigate(['address'])
    } else {
      //TODO: show the list of addresses and give an option to select one address from the list.
    }
  }

}
