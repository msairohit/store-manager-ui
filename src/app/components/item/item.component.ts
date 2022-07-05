import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemName='';
  data;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.route.params.subscribe( params => {
      console.log(params);
      this.itemName= params.name;
    });
   }

  ngOnInit(): void {
    this.search(this.itemName);
  }

  search(name?) {
    //TODO : some other endpoint getting all the details to be displayed here for a particular item like reviews, comments, etc..
    //TODO: Add "Add to cart button along with quantity" 
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

}
