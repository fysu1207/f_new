import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AdminServicesService } from '../../services/admin-services.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private getMenu: AdminServicesService, private router: Router, private title: Title, private flash: FlashMessagesService) { }
  allUsers: any;
  userName;
  points;
  ngOnInit() {
    // Set title
    this.title.setTitle('Reward Points');
    this.getMenu.getUsers().subscribe(res => {
      this.allUsers = res;
      console.log(res);
    });
  }

}
