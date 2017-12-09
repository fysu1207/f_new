import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../settings/settings.component.css', './profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private title: Title, private authService: AuthService, private validate: ValidateService) { }

  userId: string;
  userEmail: string;
  userName: string;
  userMobile: number;

  ngOnInit() {
    this.title.setTitle('Settings: Profile');
    const user = this.authService.getUserFromLocal();
    const user_parsed = JSON.parse(user);
    this.userEmail = user_parsed.email;
    this.userName = user_parsed.name;
    this.userMobile = user_parsed.mobile;
    this.userId = user_parsed.id;
  }
  profileUpdate(userEmail, userName, userMobile) {
    userEmail = userEmail.toLowerCase();
    this.userEmail = this.userEmail.toLowerCase();

    if (this.validate.validateInput(userEmail) && this.validate.validateInput(userName) && this.validate.validateInput(userMobile)) {
      if (this.validate.validateEmail(userEmail)) {
      }else {
        $('.err').html('Please enter proper email.');
      }
    }else {
      $('.err').html('All input fields are required.');
    }

    const user = {
      id: this.userId,
      name: this.userName,
      email: this.userEmail,
      mobile: this.userMobile
    };
    // Update in the backend
    this.authService.updateUser(user).subscribe(res => {
      if (res.success) {
        console.log(res.msg);
        $('.err').html('Updated Successfully');
        setTimeout(function() {
          $('.err').html('');
        }, 1000);
      }else {
        console.log(res.msg);
      }
    });
    localStorage.setItem('user', JSON.stringify(user));
  }

}
