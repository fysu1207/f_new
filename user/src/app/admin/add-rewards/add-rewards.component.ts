import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AdminServicesService } from '../../services/admin-services.service';

declare var $: any;

@Component({
  selector: 'app-add-rewards',
  templateUrl: './add-rewards.component.html',
  styleUrls: ['./add-rewards.component.css', '../admin/admin.component.css']
})
export class AddRewardsComponent implements OnInit {

  allUsers: any;
  userName;
  points;
  constructor(private getMenu: AdminServicesService, private router: Router, private title: Title, private flash: FlashMessagesService) { }
  ngOnInit() {
    // Set title
    this.title.setTitle('Reward Points');
    this.getMenu.getUsers().subscribe(res => {
      this.allUsers = res;
      console.log(res);
    });
  }
  addRewardPoints() {
    // alert(this.points);
    this.getMenu.postRewards(this.userName, this.points).subscribe(res => {
      if (res.success) {
        this.flash.show('Updated', {
          cssClass: 'alert-success',
          timeout: 700
        });
        this.userName = '';
        this.points = '';
      }
    });
  }

}
