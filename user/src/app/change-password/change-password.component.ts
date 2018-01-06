import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../settings/settings.component.css', './change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private title: Title, private validate: ValidateService, private authService: AuthService) { }

  oldPassword: string;
  newPassword: string;
  conNewPassword: string;
  userId: string;

  ngOnInit() {

    this.title.setTitle('Settings: Profile');
    const user = this.authService.getUserFromLocal();
    const user_parsed = JSON.parse(user);
    this.userId = user_parsed.id;

  }
  changePwd() {
    // tslint:disable-next-line:max-line-length
    if (this.validate.validateInput(this.oldPassword) && this.validate.validateInput(this.newPassword) && this.validate.validateInput(this.conNewPassword)) {
      if (this.newPassword === this.conNewPassword) {

        if (this.newPassword.length > 5) {
          const obj = {
            u_id: this.userId,
            password: this.oldPassword,
            new_password: this.newPassword
          };
          // Update password
          this.authService.updatePassword(obj).subscribe(res => {
            if (res.success) {
              $('.err').html('Password changed successfully');
              this.oldPassword = '';
              this.newPassword = '';
              this.conNewPassword = '';
            }else {
              $('.err').html('Incorrect old password');
            }
          });
        }else {
          $('.err').html('New password must have at least 6 characters');
        }

      }else {
        $('.err').html('New and Confirm passwords do not match');
      }
    }else {
      $('.err').html('All fields are required');
    }
  }

}
