import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() dataFromParent=[];
  addedToCart: boolean = false;
  //FIXME: Make all cards as same height and width

  constructor(private commonService: CommonService, private httpClient : HttpClient) { }

  ngOnInit(): void {
    console.log(this.dataFromParent);
  }

  ngAfterViewInit() {
    console.log(this.dataFromParent);
  }

  addToCart(name) {
    //need to implement add to cart functionality and add this item to cart.

  //TODO: --done insert into DB for add to cart.and test complete functionality 1st.
    console.log("add to cart called for item : " + name);
    console.log(this.dataFromParent);
    let cart = this.generateCartObjectFromProductData(name);
    this.add(cart);
    
    
    let currentProduct = this.dataFromParent.filter(product => product.name !== name);
    if(!currentProduct)
    {
      return;
    }

     this.dataFromParent.filter(a =>a.name === name).map(b => {
      b.addedToCart = true;
    }); 
  }
  
  generateCartObjectFromProductData(name) {
    let currentProduct = this.dataFromParent.find(product => product.name === name);
    if(!currentProduct)
    {
      return null;
    } 
    let cart = {
      productName : name,
      quantity: 1,
      price: currentProduct.price,
      description: currentProduct.description
    };

    return cart;

  }

  add(data) {
    let url = 'http://localhost:8080/cart/';
    this.httpClient.post(url, data)
      .subscribe(
        (res: any) => {
          console.log(res);
           this.dataFromParent.filter(a =>a.name === res.result.productName).map(b => {
            b.cartQuantity = res.result.quantity;
          }); 
        },
        error => {
          console.error(error);
        }
      );
  }

  onQuantityChange(event, item) {
    event.preventDefault();
    event.stopPropagation();
    console.log(item);
    let newQunatity = event.target.value;
    console.log(newQunatity);
    if(newQunatity == 0) {
      this.onDeleteItem(item);
      return;
    }
    let cart = this.generateCartObjectFromProductData1(item, newQunatity);
    this.update(cart);
  }

  generateCartObjectFromProductData1(item, quantity) {
    let cart = {
      productName : item.name,
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
        },
        error => {
          console.error(error);
        }
      );
  }

  onDeleteItem(item) {
    let url = 'http://localhost:8080/cart/'+ item.name;
    this.httpClient.delete(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.dataFromParent.filter(a =>a.name === item.name).map(b => {
            b.cartQuantity = null;
            b.addedToCart = false;
          }); 
        },
        error => {
          console.error(error);
        }
      );
  }
  
}

