import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user-service.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../menu/menu.component.css']
})
export class SettingsComponent implements OnInit {

  userEmail: string;
  userName: string;
  fullName: string;
  userMobile: string;
  userId: string;

  basket_num: number;
  today_one = moment();
  dateForHeader: string;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private title: Title, public authService: AuthService, private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.title.setTitle('Settings');

    this.dateForHeader = this.datePipe.transform(this.today_one, 'EEE, MMM d');

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
    // tslint:disable-next-line:radix
    this.basket_num = parseInt(localStorage.getItem('basket_number'));
    if (this.basket_num === undefined || this.basket_num === null || this.basket_num === 0 || isNaN(this.basket_num) === true) {
      // redirect to menu
      this.basket_num = 0;
      // alert('no');
    }else {
      // this.basket_num;
    }

    // Mobile Menu
    $('.mob-menu-trig-btn').click(function(){
      // alert('al');
      const mob_menu_offest = $('.mob-menu').offset().left;
      if (mob_menu_offest < 0) {
          // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'50vw' },200);
          $('.mob-menu').animate({'left': '0vw'}, 200);
      }else {
          // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'0vw' },200);
          $('.mob-menu').animate({'left': '-50vw' }, 200);
      }
    });
    $('.mob-menu li').click(function() {
      $('.mob-menu').animate({'left': '-50vw' }, 200);
    });
  }
  onLogoutClick() {
    // alert('reached');
    this.authService.logout();
    this.router.navigate(['/home']);
    return false;
  }

}
