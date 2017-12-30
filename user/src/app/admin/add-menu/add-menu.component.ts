import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Category } from '../../models/category';
// importing service
import { AdminServicesService } from '../../services/admin-services.service';
import { GetMenuService } from '../../services/get-menu.service';

// importing momentjs
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css', '../admin/admin.component.css']
})
export class AddMenuComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private getMenu: AdminServicesService, private router: Router, private title: Title, private getMenuService: GetMenuService) { }

  items: any = [];
  selectedItemName: string;
  selectedItemPrice: string;
  selectedItemId: string;
  dateIsSelected = 'false';
  dateSelected: string;
  dates: any;

  categories: Category[] = [];
  subsOfCat: string[];
  selectedCat: string;
  catSelected = 'false';
  selectedSubCat: string;
  itemName: string;
  itemPrice: number;
  item_img: string;
  subSelected = 'false';


  addedItems: any[] = [];
  removedItems: any[] = [];

  itemsPosted: string;
  itemsDeleted: string;

  outCats= [];

  searchable_outCats= [];


  // date = new Date((60 * 60 * 24 * 1));
  today = moment().format('LLLL');
  day_one = moment().add(1, 'days');
  day_two = moment().add(2, 'days');
  day_three = moment().add(3, 'days');
  day_four = moment().add(4, 'days');
  day_five = moment().add(5, 'days');
  // day_six = moment().add(6, 'days');
  // day_seven = moment().add(7, 'days');

  dateItems= [];
  noItems= [];

  ngOnInit() {
    // Set title
    this.title.setTitle('Add Menu');

    // Get category
    this.getMenu.getCategories().subscribe(res => {
      this.categories = res.msg;
    });

    this.getMenu.getDates().subscribe(res => {
      this.dates = res;

      res.forEach(element => {
        this.getMenuService.getItemDetails(element.item_id).subscribe(re => {
          const json = {date_id: element._id, date: element.date, name: re.msg[0].item_name };
          this.outCats.push(json);
          const searchable_json = {date: element.date, name: re.msg[0].item_name, item_id: re.msg[0]._id};
          this.searchable_outCats.push(searchable_json);
        });
      });
    });
  }
  selectedDate(event) {
    this.dateIsSelected = 'false';
    this.catSelected = 'false';
    this.subSelected = 'false';
    $('#cat-select').prop('selectedIndex', 0);
    $('#sub-cat-select').prop('selectedIndex', 0);
    this.dateIsSelected = 'true';
    this.dateSelected = event;
  }

  catSelect(event) {
    this.catSelected = 'false';
    this.subSelected = 'false';
    // var cjson = {'catId':event};
    this.selectedCat = event;
    const cjson = event;
    this.getMenu.getSubs(cjson).subscribe(res => {
      if (res.msg !== 'failed') {
        this.subsOfCat = res;
        this.catSelected = 'true';
      } else {
        console.log(res);
      }
    });
  }

  subCatSelect(subCat) {
    this.subSelected = 'true';
    this.getMenu.getDateItems(this.selectedCat, this.selectedSubCat, this.dateSelected).subscribe(res => {
      if (res === 'failed') {
      } else {
        this.items = res.msg;
        this.items.forEach(element => {
          const find_json = {date: this.dateSelected, name: element.item_name, item_id: element._id};
          let found_arr = [];
          // tslint:disable-next-line:max-line-length
          found_arr = this.searchable_outCats.find(find => find.date === find_json.date && find_json.name === find.name && find_json.item_id === find.item_id);
          // console.log('dorikindi');
          // console.log(found_arr);
          if (found_arr === undefined) {
            element.checked = false;
          }else {
            this.dateItems.push(found_arr);
            element.checked = true;
            const temp_array = [find_json.date, find_json.item_id];
            this.addedItems.push(temp_array);
          }
        });
      }
    });
  }

  onCheckChange(dateSelected: string, cat_id: string, sub_name: string, item_id, isChecked: boolean) {
    if (isChecked === true) {
      const temp_array = [dateSelected, item_id];
      // Add to added items
      // check if it already exists
      for (let x = 0; x < this.addedItems.length; x++) {
        if (this.addedItems[x][0] === dateSelected && this.addedItems[x][1] === item_id) {
          this.addedItems.splice(x, 1);
        }
      }
      this.addedItems.push(temp_array);
      for (let x = 0; x < this.removedItems.length; x++) {
        if (this.removedItems[x][0] === dateSelected && this.removedItems[x][1] === item_id) {
          this.removedItems.splice(x, 1);
        }
      }
      // console.log(this.addedItems);
    } else {
      const tmp_array = [dateSelected, item_id];
      // Adding to removed items
      for (let x = 0; x < this.removedItems.length; x++) {
        if (this.removedItems[x][0] === dateSelected && this.removedItems[x][1] === item_id) {
          this.removedItems.splice(x, 1);
        }
      }
      this.removedItems.push(tmp_array);
      // Removing from added items
      for (let x = 0; x < this.addedItems.length; x++) {
        if (this.addedItems[x][0] === dateSelected && this.addedItems[x][1] === item_id) {
          this.addedItems.splice(x, 1);
        }
      }
    }
  }
  submitMenu() {
    this.getMenu.postSchedule(this.addedItems, this.removedItems).subscribe(res => {
      if (res) {
        $('.ad-alert').html('Added');
        setTimeout(() => {
          $('.ad-alert').html('');
        },500);
      }
    });

  }

  deleteDate(date_id) {
    this.getMenu.deleteDate(date_id).subscribe(res => {
      if (res.success) {
        window.location.reload();
      } else {}
    });
  }

}
