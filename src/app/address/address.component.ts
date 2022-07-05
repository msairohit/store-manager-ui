import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.addressForm = this.formBuilder.group({
      address:'',
      phoneNumber:''
    });
   }

  ngOnInit(): void {
    //TODO: show list of addresses and add an option to edit the existing addresses.
  }

  addAddress() {
    let url = 'http://localhost:8080/address';
    //TODO: write a backend service.
    /* this.httpClient.post(url, this.addressForm.value).subscribe(
      (res)=> {
        console.log(res);
      }, (error) => {
        console.error(error);
      }
    ); */
  }
}
