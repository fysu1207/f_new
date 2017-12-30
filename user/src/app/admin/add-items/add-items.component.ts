import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Category } from '../../models/category';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

import { AdminServicesService } from '../../services/admin-services.service';

declare var $: any;

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css', '../admin/admin.component.css']
})
export class AddItemsComponent implements OnInit {

  categories: Category[] = [];
  subsOfCat: string[];
  items: object;
  selectedCat: string;
  catSelected = 'false';
  selectedSubCat: string;
  itemName: string;
  itemPrice: number;
  item_img: string;

  constructor(private getMenu: AdminServicesService, private router: Router, private title: Title, private flash: FlashMessagesService) { }

  ngOnInit() {
    // Set title
    this.title.setTitle('Add Items');

    this.getMenu.getCategories().subscribe(res => {
      if (res.success) {
        this.categories = res.msg;
      }
    });
  }
  catSelect(event) {
    this.catSelected = 'false';
    // var cjson = {'catId':event};
    this.selectedCat = event;
    const cjson = event;
    this.getMenu.getSubs(cjson).subscribe(res => {
      if (res.msg !== 'failed') {
        this.subsOfCat = res;
        this.catSelected = 'true';
      } else {
        console.log(res.msg);
      }
    });
  }
  // When SubCat is selected
  subCatSelect(event) {
    this.selectedSubCat = event;
    this.getMenu.getItems(this.selectedCat, this.selectedSubCat).subscribe(res => {
      console.log(res);
      this.items = res;
    });
  }

  AddItem(itemName: string, itemPrice: number) {
    // selected category
    // this.selectedCat;
    // selected sub category
    // this.selectedSubCat;
    // Item Name
    this.itemName = itemName;
    // Item Price
    this.itemPrice = itemPrice;
    // Item image
    this.item_img = 'img/img.jpg';

    this.getMenu.addItem(this.selectedCat, this.selectedSubCat, this.itemName, this.itemPrice, this.item_img).subscribe(res => {
      if (res.msg === 'success') {
        this.flash.show('Item Added !', {
          cssClass: 'alert-success',
          timeout: 500
        });
      } else {
        console.log(res);
      }
    });
  }

  deleteItem(item_id: string) {
    this.getMenu.deleteItem(item_id).subscribe(res => {
      if (res.success) {
        window.location.reload();
      } else {
        console.log(res.msg);
      }
    });
  }

}
