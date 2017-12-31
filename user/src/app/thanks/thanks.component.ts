import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['../menu/menu.component.css', './thanks.component.css']
})
export class ThanksComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(public authService: AuthService, private title: Title, private router: Router, private datePipe: DatePipe, public appComponent: AppComponent) { }
  order_id: string;
  userEmail: string;
  fullName: string;
  userName: string;
  companyName: string;
  userMobile: string;
  userId: string;
  basket_num: number;
  today_one = moment();
  dateForHeader: string;
  ngOnInit() {
    this.order_id = localStorage.getItem('order_id');
    this.title.setTitle('Thanks ! - Fysu');
    if (this.order_id === undefined || this.order_id === null) {
        this.router.navigate(['/home']);
    }
    const user = this.authService.getUserFromLocal();
    const user_parsed = JSON.parse(user);
    this.userEmail = user_parsed.email;
    this.fullName = user_parsed.name;
    this.companyName = user_parsed.company_name;
    this.userMobile = user_parsed.mobile;
    this.userId = user_parsed.id;
    const fLength = this.fullName.split(' ');
    if (fLength.length > 1) {
      this.userName = this.fullName.split(' ').slice(0, -(this.fullName.split(' ').length - 1)).join(' ');
    }else {
      this.userName = this.fullName;
    }
    this.dateForHeader = this.datePipe.transform(this.today_one, 'EEE, MMM d');
    // tslint:disable-next-line:radix
    this.basket_num = parseInt(localStorage.getItem('basket_number'));
    if (this.basket_num === undefined || this.basket_num === null || this.basket_num === 0 || isNaN(this.basket_num) === true) {
      this.basket_num = 0;
    }
    if (this.authService.loggedIn() !== true) {
      this.basket_num = 0;
    }
  }
}
