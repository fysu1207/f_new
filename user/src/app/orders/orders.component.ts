import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminServicesService } from '../services/admin-services.service';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../settings/settings.component.css']
})
export class OrdersComponent implements OnInit {
  all_user_orders: any = [];
  userEmail: string;
  userName: string;
  companyName: string;
  userMobile: string;
  userId: string;
  orders_exist = false;
  user_day= [];
  orders = [];
  rorders = [];
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private adminAuth: AdminAuthService , private title: Title, private getadMenu: AdminServicesService, private authService: AuthService) { }
  ngOnInit() {
    this.title.setTitle('Settings: Orders');
    const user = this.authService.getUserFromLocal();
    const user_parsed = JSON.parse(user);
    this.userEmail = user_parsed.email;
    this.userName = user_parsed.name;
    this.companyName = user_parsed.company_name;
    this.userMobile = user_parsed.mobile;
    this.userId = user_parsed.id;
    this.getadMenu.getUserOrders(this.userId).subscribe(res => {
      if (res.success) {
        if (res.msg.length > 0) {
          this.orders_exist = true;
          this.all_user_orders = res.msg.orders;
          res.msg.forEach(element => {
            const nextday_dates = [];
            const user_items = [];
            if (element.order.order.today !== null && element.order.order.today !== undefined) {
              if (element.order.order.today.tab_one !== null && element.order.order.today.tab_one !== undefined) {
                user_items.push(element.order.order.today.tab_one.name);
              }
              if (element.order.order.today.tab_two !== null && element.order.order.today.tab_two !== undefined) {
                user_items.push(element.order.order.today.tab_two.name);
              }
              if (element.order.order.today.tab_three !== null && element.order.order.today.tab_three !== undefined) {
                user_items.push(element.order.order.today.tab_three.name);
              }
            }
            if (element.order.order.next_days !== null && element.order.order.next_days !== undefined) {
              if (element.order.order.next_days.day_one !== null && element.order.order.next_days.day_one !== undefined) {
                const day_one_temp = [];
                element.order.order.next_days.day_one.menu.forEach(el => {
                  day_one_temp.push(el.item_name);
                });
                const one_obj = {
                  date : element.order.order.next_days.day_one.date,
                  items : day_one_temp
                };
                nextday_dates.push(one_obj);
              }
              if (element.order.order.next_days.day_two !== null && element.order.order.next_days.day_two !== undefined) {
                const day_two_temp = [];
                element.order.order.next_days.day_two.menu.forEach(el => {
                  day_two_temp.push(el.item_name);
                });
                const two_obj = {
                  date : element.order.order.next_days.day_two.date,
                  items : day_two_temp
                };
                nextday_dates.push(two_obj);
              }
              if (element.order.order.next_days.day_three !== null && element.order.order.next_days.day_three !== undefined) {
                const day_three_temp = [];
                element.order.order.next_days.day_three.menu.forEach(el => {
                  day_three_temp.push(el.item_name);
                });
                const three_obj = {
                  date : element.order.order.next_days.day_three.date,
                  items : day_three_temp
                };
                nextday_dates.push(three_obj);
              }
              if (element.order.order.next_days.day_four !== null && element.order.order.next_days.day_four !== undefined) {
                const day_four_temp = [];
                element.order.order.next_days.day_four.menu.forEach(el => {
                  day_four_temp.push(el.item_name);
                });
                const four_obj = {
                  date : element.order.order.next_days.day_four.date,
                  items : day_four_temp
                };
                nextday_dates.push(four_obj);
              }
              if (element.order.order.next_days.day_five !== null && element.order.order.next_days.day_five !== undefined) {
                const day_five_temp = [];
                element.order.order.next_days.day_five.menu.forEach(el => {
                  day_five_temp.push(el.item_name);
                });
                const five_obj = {
                  date : element.order.order.next_days.day_five.date,
                  items : day_five_temp
                };
                nextday_dates.push(five_obj);
              }
            }
            const rounded_num = Math.round(element.order.total_price / 10);
            const points_earned = rounded_num;
            const obj = {
              order_id: element.order.order_id,
              time: element.order.order_time,
              payment_method: element.order.payment_method,
              price: element.order.total_price,
              earned : points_earned,
              items: user_items,
              next_dates : nextday_dates
            };
            this.orders.push(obj);
          });
          this.orders.reverse();
        }
      }
    });
  }
}
