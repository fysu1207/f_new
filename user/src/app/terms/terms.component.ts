import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css', '../menu/menu.component.css']
})
export class TermsComponent implements OnInit {

  userEmail: string;
  userName: string;
  fullName: string;
  userMobile: string;
  userId: string;
  basket_num: number;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private title: Title, private appComponent: AppComponent, public authService: AuthService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.title.setTitle('Terms - Fysu');

    // tslint:disable-next-line:radix
    this.basket_num = parseInt(localStorage.getItem('basket_number'));
    if (this.authService.loggedIn() === true) {
      const user = this.authService.getUserFromLocal();
      const user_parsed = JSON.parse(user);
      this.userEmail = user_parsed.email;
      this.fullName = user_parsed.name;
      this.userMobile = user_parsed.mobile;
      this.userId = user_parsed.id;
      const fLength = this.fullName.split(' ');
      if (fLength.length > 1) {
        this.userName = this.fullName.split(' ').slice(0, -(this.fullName.split(' ').length - 1)).join(' ');
      }else {
        this.userName = this.fullName;
      }
    }else {
      this.basket_num = 0;
    }
    if (this.basket_num === undefined || this.basket_num === null || this.basket_num === 0 || isNaN(this.basket_num) === true) {
      // redirect to menu
      this.basket_num = 0;
    }else {
      // this.basket_num;
    }
  }

}
