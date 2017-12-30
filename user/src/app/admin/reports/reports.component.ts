import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';

import { AdminServicesService } from '../../services/admin-services.service';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css', '../admin/admin.component.css'],
})
export class ReportsComponent implements OnInit {
  public fromDate; toDate;

  allTodayOrders = []; allNextDayOrders = []; orders_of_these_sc_days = []; today_all_items = []; sc_all_items = []; un_items = [];
  today_active;
  day_one_orders = [];
  day_two_orders = [];
  day_three_orders = [];
  day_four_orders = [];
  day_five_orders = [];
  day_six_orders = [];
  total_orders: any;
  next_days: any;
  today_orders = [];
  next_total_orders = [];
  display_next_orders = [];
  display_today_orders = [];
  p_h_order = []; p_h_order_id; p_h_user_name; p_h_user_email;
  p_h_user_mobile;
  p_h_address;
  p_h_num_times;
  p_h_tab_one_times;
  p_h_tab_two_times;
  p_h_tab_three_times;
  p_h_time_slot;
  p_h_one_time_slot;
  p_h_two_time_slot;
  p_h_three_time_slot;
  now_exists;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };
  constructor(private getMenu: AdminServicesService, private router: Router, private title: Title, private datePipe: DatePipe) { }
  ngOnInit() {
    this.title.setTitle('Reports');
    // Get orders
    this.getMenu.getOrders().subscribe( res => {
      if (res.success) {
        // All today orders within brought orders
        res.msg.forEach(element => {
          if (element.order.order !== null || element.order.order !== undefined) {
            // push today orders
            this.allTodayOrders.push(element.order.order.today);
            // push next day orders
            this.allNextDayOrders.push(element.order.order.next_days);
          }
        });
      }
    });
    this.getMenu.getOrders().subscribe(res => {
      this.total_orders = res.msg;
      this.total_orders.forEach(element => {
        if (element.order.order) {
          const user_id = element.order.user_id;
          const order_time = element.order.order_time;
          const order_id = element.order.order_id;
          this.getMenu.getUserFromId(user_id).subscribe(ress => {
            if (ress.success) {
              const user = ress.msg;
              let username = '';
              let user_mobile = '';
              let user_email = '';
              if (user[0] !== undefined) {
                 username = user[0].name;
                 user_mobile = user[0].mobile;
                 user_email = user[0].email;
              }
              if (element.order.order.today !== null) {
                this.now_exists = true;
                  const today_arr = [];
                  if (element.order.order.today.tab_one !== null && element.order.order.today.tab_one !== undefined) {
                    // Getting time slot
                    const obj = {
                      name : element.order.order.today.tab_one.name,
                      time_slot : this.getTimeSlot(element.order.order.today.tab_one.time_slot),
                      num_of_items : element.order.order.today.tab_one.num_of_items,
                      price : element.order.order.today.tab_one.total_price
                    };
                    today_arr.push(obj);
                  }
                  if (element.order.order.today.tab_two !== null && element.order.order.today.tab_two !== undefined) {
                    const obj = {
                      name : element.order.order.today.tab_two.name,
                      time_slot : this.getTimeSlot(element.order.order.today.tab_two.time_slot),
                      num_of_items : element.order.order.today.tab_two.num_of_items,
                      price : element.order.order.today.tab_two.total_price
                    };
                    today_arr.push(obj);
                  }
                  if (element.order.order.today.tab_three !== null && element.order.order.today.tab_three !== undefined) {
                    const obj = {
                      name : element.order.order.today.tab_three.name,
                      time_slot : this.getTimeSlot(element.order.order.today.tab_three.time_slot),
                      num_of_items : element.order.order.today.tab_three.num_of_items,
                      price : element.order.order.today.tab_three.total_price
                    };
                    today_arr.push(obj);
                  }
                  // tslint:disable-next-line:max-line-length
                  const iind = { user_id: user_id, user_name: username, user_mobile: user_mobile, user_email: user_email, order_id: order_id, order_time: order_time, delivery_address: element.order.delivery_address, order: element.order.order.today, payment_type: element.order.payment_method, item_dets: today_arr, delivery_notes: element.order.delivery_notes };
                  this.today_orders.push(iind);
              }
              this.next_days = element.order.order.next_days;
              for (const key in this.next_days) {
                if (this.next_days.hasOwnProperty(key)) {
                  const e = this.next_days[key];
                  if (e != null) {
                        // tslint:disable-next-line:max-line-length
                        const indd = { user_id: user_id, user_name: username, user_mobile: user_mobile, user_email: user_email, order_id: order_id, order_time: order_time, delivery_address: element.order.delivery_address, order: e.menu, payment_type: element.order.payment_method, price: e.totalPrice, delivery_notes: element.order.delivery_notes, time_slot : this.getTimeSlot(e.timeSlot), num_of_items: e.numOfTimes };
                        this.day_one_orders.push(indd);
                  }
                }
              }
            }
          });
        }
      });
    });
  }
  getTimeSlot(slot_string) {
    switch (slot_string) {
      case 'slot_one':
        return '12:00 PM - 12:45 PM';
      case 'slot_two':
        return '12:45 PM - 1:30 PM';
      case 'slot_three':
        return '1:30 PM - 2:15 PM';
      case 'slot_four':
        return '2:15 PM - 3:00 PM';
      default:
        break;
    }
  }
  datesUpdated() {
    const datesArray: any = [];
    let unique_items = [];
    let filter_array = [];
    this.un_items = [];
    let all_items = [];
    const orders_of_todays: any = [];
    let orders_of_next_days: any = [];
    const for_from = this.fromDate.date.month + '/' +  this.fromDate.date.day + '/' + this.fromDate.date.year;
    const for_to = this.toDate.date.month + '/' + this.toDate.date.day + '/' + this.toDate.date.year;
    const from = this.datePipe.transform(for_from, 'fullDate');
    const to = this.datePipe.transform(for_to, 'fullDate');
    this.today_orders.forEach(to_e => {
    if (to_e !== null) {
      if (moment(to_e.order_time).isBefore(to, 'day') && moment(to_e.order_time).isAfter(from, 'day')) {
          this.display_today_orders.push(to_e);
        }
      }
    });
    this.day_one_orders.forEach(n_e => {
      if (n_e !== null) {
        if (moment(n_e.order_time).isBefore(to, 'day') && moment(n_e.order_time).isAfter(from, 'day')) {
            this.display_next_orders.push(n_e);
            console.log('success');
        }
      }
    });
    all_items.length = 0;
    all_items = [];
    filter_array.length = 0;
    filter_array = [];
    unique_items = [];
    unique_items.length = 0;
    orders_of_next_days = [];
    orders_of_next_days.length = 0;
  }
  ViewDetails(today, order_id, date) {
    this.p_h_order = [];
    $('.db').css({'display': 'flex'});
    if (today === 'today') {
      this.today_active = true;
      this.today_orders.forEach(element => {
        if (order_id === element.order_id) {
          this.p_h_order_id = element.order_id;
          this.p_h_user_name = element.user_name;
          this.p_h_user_email = element.user_email;
          this.p_h_user_mobile = element.user_mobile;
          this.p_h_address = element.delivery_address;
          this.p_h_time_slot = element.order.timeSlot;
          if (element.order.tab_one) {
            if (element.order.tab_one !== undefined || element.order.tab_one !== null) {
              this.p_h_order.push(element.order.tab_one.name);
              this.p_h_tab_one_times = element.order.tab_one.num_of_items;
              this.p_h_one_time_slot = element.order.tab_one.time_slot;
              switch (this.p_h_one_time_slot) {
                case 'slot_one':
                  this.p_h_one_time_slot = '12:00 PM - 12:45 PM';
                  break;
                case 'slot_two':
                  this.p_h_one_time_slot = '12:45 PM - 1:30 PM';
                  break;
                case 'slot_three':
                  this.p_h_one_time_slot = '1:30 PM - 2:15 PM';
                  break;
                case 'slot_four':
                  this.p_h_one_time_slot = '2:15 PM - 3:00 PM';
                  break;
                default:
                  break;
              }
            }
          }
          if (element.order.tab_two) {
            if (element.order.tab_two !== undefined || element.order.tab_two !== null) {
              this.p_h_order.push(element.order.tab_two.name);
              this.p_h_tab_two_times = element.order.tab_two.num_of_items;
              this.p_h_two_time_slot = element.order.tab_two.time_slot;
              switch (this.p_h_two_time_slot) {
                case 'slot_one':
                  this.p_h_two_time_slot = '12:00 PM - 12:45 PM';
                  break;
                case 'slot_two':
                  this.p_h_two_time_slot = '12:45 PM - 1:30 PM';
                  break;
                case 'slot_three':
                  this.p_h_two_time_slot = '1:30 PM - 2:15 PM';
                  break;
                case 'slot_four':
                  this.p_h_two_time_slot = '2:15 PM - 3:00 PM';
                  break;
                default:
                  break;
              }
            }
          }
          if (element.order.tab_three) {
            if (element.order.tab_three !== undefined || element.order.tab_three !== null) {
              this.p_h_order.push(element.order.tab_three.name);
              this.p_h_tab_three_times = element.order.tab_three.num_of_items;
              this.p_h_three_time_slot = element.order.tab_three.time_slot;
              switch (this.p_h_three_time_slot) {
                case 'slot_one':
                  this.p_h_three_time_slot = '12:00 PM - 12:45 PM';
                  break;
                case 'slot_two':
                  this.p_h_three_time_slot = '12:45 PM - 1:30 PM';
                  break;
                case 'slot_three':
                  this.p_h_three_time_slot = '1:30 PM - 2:15 PM';
                  break;
                case 'slot_four':
                  this.p_h_three_time_slot = '2:15 PM - 3:00 PM';
                  break;
                default:
                  break;
              }
            }
          }
        }
      });
    }else {
      this.today_active = false;
      this.next_total_orders.forEach(element => {
        if (order_id === element.order_id) {
          this.p_h_order_id = element.order_id;
          this.p_h_user_name = element.user_name;
          this.p_h_user_email = element.user_email;
          this.p_h_user_mobile = element.user_mobile;
          this.p_h_address = element.delivery_address;
          this.p_h_num_times = element.order.numOfTimes;
          this.p_h_time_slot = element.order.timeSlot;
          element.order.menu.forEach(el => {
            this.p_h_order.push(el);
          });
        }
      });
    }
    switch (this.p_h_time_slot) {
      case 'slot_one':
        this.p_h_time_slot = '12:00 PM - 12:45 PM';
        break;
      case 'slot_two':
        this.p_h_time_slot = '12:45 PM - 1:30 PM';
        break;
      case 'slot_three':
        this.p_h_time_slot = '1:30 PM - 2:15 PM';
        break;
      case 'slot_four':
        this.p_h_time_slot = '2:15 PM - 3:00 PM';
        break;
      default:
        break;
    }
  }
  closedb() {
    $('.db').hide();
  }

}
