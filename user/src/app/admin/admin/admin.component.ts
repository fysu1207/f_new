import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminAuthService } from '../../services/admin-auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public authService: AdminAuthService,
    private router: Router, private title: Title, private flash: FlashMessagesService) { }

  ngOnInit() {
    // Title
    this.title.setTitle('Admin');
    // Mobile menu on menu click
    $('.mob-menu-trig-btn').click(function () {
      $('.mob-menu').css({'left': '-40vw'});
      const mob_menu_offest = $('.mob-menu-admin').offset().left;
      if (mob_menu_offest < 0) {
        $('.main-container').animate({
          'margin-left': '50vw'
        }, 200);
        $('.mob-menu-admin').animate({
          'left': '0'
        }, 200);
      } else {
        $('.main-container').animate({
          'margin-left': '0vw'
        }, 200);
        $('.mob-menu-admin').animate({
          'left': '-50vw'
        }, 200);
      }
    });

    // $('.left-menu a').click(function () {
    //   // $('.left-menu li').removeClass('selected-li');
    //   // this.classList.add('selected-li');
    // });
  }
  onLogoutClick() {
    this.authService.logout();
    this.flash.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/admin/login']);
    return false;
  }
}
