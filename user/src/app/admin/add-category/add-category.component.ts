import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Http, Headers, HttpModule } from '@angular/http';

import { Category } from '../../models/category';

import { AdminServicesService } from '../../services/admin-services.service';

declare var $: any;

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['../admin/admin.component.css', './add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categories: Category[] = [];
  catName;
  res;

  constructor(private getMenu: AdminServicesService, private router: Router, private title: Title) { }

  ngOnInit() {
    // Set title
    this.title.setTitle('Add Category');
    this.getMenu.getCategories().subscribe(res => {
      console.log(res);
      if (res.success) {
        this.categories = res.msg;
      }
    });
  }
  addCategory(catName) {
    const json = { 'name': catName };
    this.getMenu.addCategory(json).subscribe(res => {
      if (res.msg === 'success') {
        // Category added
        window.location.reload();
      }
    });
  }
  deleteCategory(id: string) {
    this.getMenu.deleteCategory(id).subscribe(res => {
      if (res === 'success') {
        window.location.reload();
      }
    });
  }

}
