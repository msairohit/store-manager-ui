import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private commonService: CommonService, private httpClient: HttpClient) { }

  completeData = [];
  totalAmount = 0;
  ngOnInit(): void {
    this.search();
    //TODO: --done remove this logic of getting data from service and get from an endpoint and display all items in list with option to edit the quantity and display the total.
    //TODO: --done Update backend when changing the quantity in cart.
    //TODO: --done Update total and subtotal when changing the quantity.
    //--done add logic to remove the item once quantity reaches to 0.
    //--done add delete button logic to remove the item from the cart.
    //TODO: Add whishlist
    //TODO: Add save for later tab to move items from cart to save for later, so that later it can be directly moved to cart.
    //TODO: Next add a feature to print the finalized items in a proper bill format once the order is confirmed.
  }

  search() {
    //TODO: send the username from login. 
    let url = 'http://localhost:8080/cart/SYSTEM';
    this.httpClient.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          let result = res.result;
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            this.completeData.push(element);
            this.totalAmount += element.totalCost;
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  onQuantityChange(event, item) {
    console.log(item);
    let newQunatity = event.target.value;
    console.log(newQunatity);
    if(newQunatity == 0) {
      this.onDeleteItem(item);
      return;
    }
    let cart = this.generateCartObjectFromProductData(item, newQunatity);
    this.update(cart);

  }

  generateCartObjectFromProductData(item, quantity) {
    let cart = {
      productName : item.productName,
      quantity: quantity,
      price: item.price,
      description: item.description
    };

    return cart;

  }

  update(data) {
    let url = 'http://localhost:8080/cart/';
    this.httpClient.put(url, data)
      .subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.completeData);

          this.completeData.filter(a =>a.productName === res.result.productName).map(b => {
            this.totalAmount -= b.totalCost;
            this.totalAmount += res.result.totalCost;
            b.totalCost = res.result.totalCost;
          });
        },
        error => {
          console.error(error);
        }
      );
  }

  onDeleteItem(item) {
    let url = 'http://localhost:8080/cart/'+ item.productName;
    this.httpClient.delete(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.completeData);
          this.completeData = [];
          this.totalAmount = 0;
          this.search();
        },
        error => {
          console.error(error);
        }
      );
  }

}
