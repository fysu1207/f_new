import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GetMenuService } from '../services/get-menu.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { element } from 'protractor';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: any;
  subs: any;
  rotiItems: any;
  tab_one_text: string;
  tab_two_text: string;
  tab_three_text: string;
  // Three menus
  tab_one = 'Rajin-e ka Roti';
  tab_two = 'Kohil-e ka Khaana';
  tab_three = 'Mode-e ka Meals';
  // Today
  today_books = [];
  today_c_books = [];
  today_tab_one_books: object;
  today_tab_two_books: object;
  today_tab_three_books: object;
  today_slot: string;
  today_tab_one_slot: string = null;
  today_tab_two_slot: string = null;
  today_tab_three_slot: string = null;
  num_today_items = 0;
  num_tab_one_items = 0;
  num_tab_two_items = 0;
  num_tab_three_items = 0;
  num_tab_one = 0;
  num_tab_two = 0;
  num_tab_three = 0;

  tab_one_cost = 79;
  tab_two_cost = 89;
  tab_three_cost = 99;


  today_one = moment();
  day_one = moment().add(1, 'days');
  day_two = moment().add(2, 'days');
  day_three = moment().add(3, 'days');
  day_four = moment().add(4, 'days');
  day_five = moment().add(5, 'days');
  day_six = moment().add(6, 'days');
  day_seven = moment().add(7, 'days');

  last_today_one = moment().subtract(7, 'days');
  last_day_one = moment().subtract(6, 'days');
  last_day_two = moment().subtract(5, 'days');
  last_day_three = moment().subtract(4, 'days');
  last_day_four = moment().subtract(3, 'days');
  last_day_five = moment().subtract(2, 'days');
  last_day_six = moment().subtract(1, 'days');
  p_today_one: any;
  p_day_one: any;
  p_day_two: any;
  p_day_three: any;
  p_day_four: any;
  p_day_five: any;
  p_day_six: any;
  p_day_seven: any;
  p_last_today_one: any;
  p_last_day_one: any;
  p_last_day_two: any;
  p_last_day_three: any;
  p_last_day_four: any;
  p_last_day_five: any;
  p_last_day_six: any;
  today_menu: any;
  day_one_menu: any;
  day_two_menu: any;
  day_three_menu: any;
  day_four_menu: any;
  day_five_menu: any;
  day_six_menu: any;
  today_item_dets = [];
  day_one_item_dets = [];
  day_two_item_dets = [];
  day_three_item_dets = [];
  day_four_item_dets = [];
  day_five_item_dets = [];
  day_six_item_dets = [];
  numberOfItems: number;
  day_one_books= [];
  day_two_books= [];
  day_three_books= [];
  day_four_books= [];
  day_five_books= [];
  day_six_books= [];
  day_one_c_books= [];
  day_two_c_books= [];
  day_three_c_books= [];
  day_four_c_books= [];
  day_five_c_books= [];
  day_six_c_books= [];
  day_one_slot: string;
  day_two_slot: string;
  day_three_slot: string;
  day_four_slot: string;
  day_five_slot: string;
  day_six_slot: string;
  num_day_one_items = 0;
  num_day_two_items = 0;
  num_day_three_items = 0;
  num_day_four_items = 0;
  num_day_five_items = 0;
  num_day_six_items = 0;
  today_status: boolean;
  day_one_status: boolean;
  day_two_status: boolean;
  day_three_status: boolean;
  day_four_status: boolean;
  day_five_status: boolean;
  day_six_status: boolean;
  today_price = 0;
  day_one_price = 0;
  day_two_price  = 0;
  day_three_price  = 0;
  day_four_price  = 0;
  day_five_price  = 0;
  day_six_price  = 0;
  total_today_price = 0;
  total_day_one_price  = 0;
  total_day_two_price  = 0;
  total_day_three_price  = 0;
  total_day_four_price  = 0;
  total_day_five_price  = 0;
  total_day_six_price  = 0;
  place_holder_price= 0;
  menu_to_be_loaded: any;
  basketNumber = 0;
  tab_one_status = false;
  tab_two_status = false;
  tab_three_status = false;
  tab_one_sold_out: boolean;
  tab_two_sold_out: boolean;
  tab_three_sold_out: boolean;
  tab_one_total_price: number;
  tab_two_total_price: number;
  tab_three_total_price: number;
  userEmail: string;
  userName: string;
  fullName: string;
  companyName: string;
  userMobile: string;
  userId: string;
  allOrders = {
    day_one: null,
    day_two: null,
    day_three: null,
    day_four: null,
    day_five: null,
  };
  roti_img = '../assets/menu-icons/roti_b.png';
  roti_r_img = '../assets/menu-icons/roti_r.png';
  rice_img = '../assets/menu-icons/rice_b.png';
  rice_r_img = '../assets/menu-icons/rice_r.png';
  rice_roti_img = '../assets/menu-icons/rice_roti_b.png';
  rice_roti_r_img = '../assets/menu-icons/rice_roti_r.png';
  curry_img = '../assets/menu-icons/cur_b.png';
  curry_r_img = '../assets/menu-icons/cur_r.png';
  dal_img = '../assets/menu-icons/dal_b.png';
  dal_r_img = '../assets/menu-icons/dal_r.png';
  curd_img = '../assets/menu-icons/curd_b.png';
  curd_r_img = '../assets/menu-icons/curd_r.png';
  fry_img = '../assets/menu-icons/fry_b.png';
  fry_r_img = '../assets/menu-icons/fry_r.png';
  desserts_img = '../assets/menu-icons/sweets_b.png';
  desserts_r_img = '../assets/menu-icons/sweets_r.png';
  time_slot_one_status = true;
  time_slot_two_status = true;
  time_slot_three_status = true;
  time_slot_four_status = true;
  dateForHeader: string;
  letter_added = false;
  letter_price = 0;
  // Base
  day_one_base_items= [];
  day_two_base_items= [];
  day_three_base_items= [];
  day_four_base_items= [];
  day_five_base_items= [];
  // Dry curry
  day_one_dry_curries = [];
  day_two_dry_curries = [];
  day_three_dry_curries = [];
  day_four_dry_curries = [];
  day_five_dry_curries = [];
  // Wet curry
  day_one_wet_curries = [];
  day_two_wet_curries = [];
  day_three_wet_curries = [];
  day_four_wet_curries = [];
  day_five_wet_curries = [];
  // Dal
  day_one_dal = [];
  day_two_dal = [];
  day_three_dal = [];
  day_four_dal = [];
  day_five_dal = [];
  // curd
  day_one_curd = [];
  day_two_curd = [];
  day_three_curd = [];
  day_four_curd = [];
  day_five_curd = [];
  day_one_sweets = [];
  day_two_sweets = [];
  day_three_sweets = [];
  day_four_sweets = [];
  day_five_sweets = [];
  curtime;
  hover_alert: string;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private title: Title, private appComponent: AppComponent, public authService: AuthService, private getMenuItems: GetMenuService, private datePipe: DatePipe) {}
  ngOnInit() {
    this.getMenuItems.getTabStatus('tab_one').subscribe(res => {
      if (res.success) {
        this.tab_one_sold_out = true;
        $('#tab-one-sold-out').css({'display': 'flex'});
        $('#tab-one-add-btn').prop('disabled', true);
        $('#tab-one-add-btn').css({'background-color': '#b2b2b2'});
      }else {
        this.tab_one_sold_out = false;
      }
    });
    this.getMenuItems.getTabStatus('tab_two').subscribe(res => {
      if (res.success) {
        this.tab_two_sold_out = true;
        $('#tab-two-sold-out').css({'display': 'flex'});
        $('#tab-two-add-btn').prop('disabled', true);
        $('#tab-two-add-btn').css({'background-color': '#b2b2b2'});
      }else {
        this.tab_two_sold_out = false;
      }
    });
    this.getMenuItems.getTabStatus('tab_three').subscribe(res => {
      if (res.success) {
        this.tab_three_sold_out = true;
        $('#tab-three-sold-out').css({'display': 'flex'});
        $('#tab-three-add-btn').prop('disabled', true);
        $('#tab-three-add-btn').css({'background-color': '#b2b2b2'});
      }else {
        this.tab_three_sold_out = false;
      }
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    $('.mob-menu-trig-btn').click(function(){
      const mob_menu_offest = $('.mob-menu').offset().left;
      if (mob_menu_offest < 0) {
          $('.mob-menu').animate({'left': '0vw' }, 200);
      }else {
          $('.mob-menu').animate({'left': '-50vw' }, 200);
      }
    });
    $('.mob-menu li').click(function() {
      $('.mob-menu').animate({'left': '-50vw' }, 200);
    });
    const om_cur_time = moment(new Date());
    const last_time = moment('2:14pm', 'h:mma');
    const slot_three_end_time = moment('1:29pm', 'h:mma');
    const slot_two_end_time = moment('12:44pm', 'h:mma');
    const slot_one_end_time = moment('11:59am', 'h:mma');
    if (om_cur_time.isAfter(last_time)) {
      // Disable all today slots
      $('#slot_one_option').prop('disabled', true);
      $('#slot_two_option').prop('disabled', true);
      $('#slot_three_option').prop('disabled', true);
      $('#slot_four_option').prop('disabled', true);
      $('#today-add-btn').prop('disabled', true);
    }else if (om_cur_time.isAfter(slot_three_end_time)) {
      // Diable first three slots
      $('#slot_one_option').prop('disabled', true);
      $('#slot_two_option').prop('disabled', true);
      $('#slot_three_option').prop('disabled', true);
    }else if (om_cur_time.isAfter(slot_two_end_time)) {
      // Diable first two slots
      $('#slot_one_option').prop('disabled', true);
      $('#slot_two_option').prop('disabled', true);
    }else if (om_cur_time.isAfter(slot_one_end_time)) {
      // Diable first slot
      $('#slot_one_option').prop('disabled', true);
    }
    $(document).keydown(function(e) {
      if (e === 27) {
        this.tdClose();
        this.schHoverClose();
        this.scClose();
      }
    });
    $(document).ready(function(){
      const tdown_time = moment('11:59am', 'h:mma');
      setInterval(function(){
        const m_cur_time = moment(new Date());
        const tup_time = moment('12:00am', 'h:mma');
        if (m_cur_time.isAfter(tup_time)) {
        }
        if (m_cur_time.isAfter(last_time)) {
          $('#slot_one_option').prop('disabled', true);
          $('#slot_two_option').prop('disabled', true);
          $('#slot_three_option').prop('disabled', true);
          $('#slot_four_option').prop('disabled', true);
          $('#today-add-btn').prop('disabled', true);
        }else if (m_cur_time.isAfter(slot_three_end_time)) {
          $('#slot_one_option').prop('disabled', true);
          $('#slot_two_option').prop('disabled', true);
          $('#slot_three_option').prop('disabled', true);
        }else if (m_cur_time.isAfter(slot_two_end_time)) {
          $('#slot_one_option').prop('disabled', true);
          $('#slot_two_option').prop('disabled', true);
        }else if (m_cur_time.isAfter(slot_one_end_time)) {
          $('#slot_one_option').prop('disabled', true);
        }
      }, 2000);
    });
    localStorage.removeItem('all_orders');
    localStorage.removeItem('today_orders');
    localStorage.removeItem('basket_number');
    localStorage.removeItem('letter_added');
    this.title.setTitle('Fysu - Menu');
    if (this.authService.loggedIn() === true) {
      const user = this.authService.getUserFromLocal();
      const user_parsed = JSON.parse(user);
      console.log(user_parsed);
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
    }
    this.numberOfItems = 1;
    this.place_holder_price = 0;
    this.p_today_one = this.datePipe.transform(this.today_one, 'fullDate');
    this.p_day_one = this.datePipe.transform(this.day_one, 'fullDate');
    this.p_day_two = this.datePipe.transform(this.day_two, 'fullDate');
    this.p_day_three = this.datePipe.transform(this.day_three, 'fullDate');
    this.p_day_four = this.datePipe.transform(this.day_four, 'fullDate');
    this.p_day_five = this.datePipe.transform(this.day_five, 'fullDate');
    this.p_day_six = this.datePipe.transform(this.day_six, 'fullDate');
    this.p_last_today_one = this.datePipe.transform(this.last_today_one, 'fullDate');
    this.p_last_day_one = this.datePipe.transform(this.last_day_one, 'fullDate');
    this.p_last_day_two = this.datePipe.transform(this.last_day_two, 'fullDate');
    this.p_last_day_three = this.datePipe.transform(this.last_day_three, 'fullDate');
    this.p_last_day_four = this.datePipe.transform(this.last_day_four, 'fullDate');
    this.p_last_day_five = this.datePipe.transform(this.last_day_five, 'fullDate');
    this.p_last_day_six = this.datePipe.transform(this.last_day_six, 'fullDate');
    this.dateForHeader = this.datePipe.transform(this.today_one, 'EEE, MMM d');
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $('.schedule-menu-back').css({ 'display': 'none' });
      }
    });
    this.getMenuItems.getCats().subscribe(res => {
      if (res.success) {
        this.categories = res.msg;
      }else {
        window.location.reload();
      }
    });
    this.getMenuItems.getDatesMenu(this.p_day_one, this.p_last_day_one).subscribe(do_res => {
      if (do_res.success) {
        this.day_one_menu = do_res.msg;
        if (this.day_one_menu.length < 1) {
          // Menu does't exist for today
        } else {

          const un = [];
          this.day_one_menu.forEach(e => {
            if (un.length < 1) {
              un.push(e.item_id);
            } else {
              if (un.includes(e.item_id)) {
                // Do nothing
              } else {
                un.push(e.item_id);
              }
            }
          });

          if (un.length > 0) {
            // For each item id
            un.forEach(el => {
              this.getMenuItems.getItemDetails(el).subscribe(idets => {
                if (idets.success) {
                  idets.msg[0].checked = false;
                  idets.msg[0].date = this.p_day_one;
                  this.day_one_item_dets.push(idets.msg);
                  // console.log(idets.msg[0].sub_name);
                  switch (idets.msg[0].sub_name) {
                    // Base
                    case 'Base' || 'base':
                      this.day_one_base_items.push(idets.msg[0]);
                      break;
                    // Dry curry
                    case 'Dry Curry' || 'dry curry' || 'Dry curries' || 'Dry curry':
                      this.day_one_dry_curries.push(idets.msg[0]);
                      break;
                    // Wet curry
                    case 'Wet Curry' || 'wet curry' || 'Wet curries' || 'Wet curry':
                      this.day_one_wet_curries.push(idets.msg[0]);
                      break;
                    // Dal
                    case 'Dal' || 'dal':
                      this.day_one_dal.push(idets.msg[0]);
                      break;
                    // Sweet
                    case 'Sweet' || 'sweet' || 'Sweets' || 'sweets':
                      this.day_one_sweets.push(idets.msg[0]);
                      break;
                    // Curd
                    case 'Curd' || 'curd':
                      this.day_one_curd.push(idets.msg[0]);
                      break;
                    default:
                      break;
                  }
                }
              });
            });
            this.day_one_books = this.day_one_item_dets;
          }
        }
      }
    });
    this.getMenuItems.getDatesMenu(this.p_day_two, this.p_last_day_two).subscribe(dt_res => {
      if (dt_res.success) {
        this.day_two_menu = dt_res.msg;
        if (this.day_two_menu.length < 1) {
          // Menu does't exist for today
        } else {

          const un = [];
          this.day_two_menu.forEach(e => {

            if (un.length < 1) {
              un.push(e.item_id);
            } else {
              if (un.includes(e.item_id)) {
                // Do nothing
              } else {
                un.push(e.item_id);
              }
            }
          });

          if (un.length > 0) {
            // For each item id
            un.forEach(el => {
              this.getMenuItems.getItemDetails(el).subscribe(idets => {
                if (idets.success) {
                  idets.msg[0].checked = false;
                  idets.msg[0].date = this.p_day_two;
                  this.day_two_item_dets.push(idets.msg);
                  switch (idets.msg[0].sub_name) {
                    // Base
                    case 'Base' || 'base':
                      this.day_two_base_items.push(idets.msg[0]);
                      break;
                    // Dry curry
                    case 'Dry Curry' || 'dry curry' || 'Dry curries' || 'Dry curry':
                      this.day_two_dry_curries.push(idets.msg[0]);
                      break;
                    // Wet curry
                    case 'Wet Curry' || 'wet curry' || 'Wet curries' || 'Wet curry':
                      this.day_two_wet_curries.push(idets.msg[0]);
                      break;
                    // Dal
                    case 'Dal' || 'dal':
                      this.day_two_dal.push(idets.msg[0]);
                      break;
                    // Sweet
                    case 'Sweet' || 'sweet' || 'Sweets' || 'sweets':
                      this.day_two_sweets.push(idets.msg[0]);
                      break;
                    // Curd
                    case 'Curd' || 'curd':
                      this.day_two_curd.push(idets.msg[0]);
                      break;
                    default:
                      break;
                  }
                }
              });
            });
            this.day_two_books = this.day_two_item_dets;
          }
        }
      }else {
      }
    });
    this.getMenuItems.getDatesMenu(this.p_day_three, this.p_last_day_three).subscribe(dth_res => {
      if (dth_res.success) {
        this.day_three_menu = dth_res.msg;
        if (this.day_three_menu.length < 1) {
          // Menu does't exist for today
        } else {

          const un = [];
          this.day_three_menu.forEach(e => {
            if (un.length < 1) {
              un.push(e.item_id);
            } else {
              if (un.includes(e.item_id)) {
                // Do nothing
              } else {
                un.push(e.item_id);
              }
            }
          });

          if (un.length > 0) {
            // For each item id
            un.forEach(el => {
              this.getMenuItems.getItemDetails(el).subscribe(idets => {
                if (idets.success) {
                  idets.msg[0].checked = false;
                  idets.msg[0].date = this.p_day_three;
                  this.day_three_item_dets.push(idets.msg);
                  switch (idets.msg[0].sub_name) {
                    // Base
                    case 'Base' || 'base':
                      this.day_three_base_items.push(idets.msg[0]);
                      break;
                    // Dry curry
                    case 'Dry Curry' || 'dry curry' || 'Dry curries' || 'Dry curry':
                      this.day_three_dry_curries.push(idets.msg[0]);
                      break;
                    // Wet curry
                    case 'Wet Curry' || 'wet curry' || 'Wet curries' || 'Wet curry':
                      this.day_three_wet_curries.push(idets.msg[0]);
                      break;
                    // Dal
                    case 'Dal' || 'dal':
                      this.day_three_dal.push(idets.msg[0]);
                      break;
                    // Sweet
                    case 'Sweet' || 'sweet' || 'Sweets' || 'sweets':
                      this.day_three_sweets.push(idets.msg[0]);
                      break;
                    // Curd
                    case 'Curd' || 'curd':
                      this.day_three_curd.push(idets.msg[0]);
                      break;
                    default:
                      break;
                  }
                }
              });
            });
            this.day_three_books = this.day_three_item_dets;
          }


        }
      }
    });
    this.getMenuItems.getDatesMenu(this.p_day_four, this.p_last_day_four).subscribe(df_res => {
      if (df_res.success) {
        // console.log(df_res);
        this.day_four_menu = df_res.msg;
        if (this.day_four_menu.length < 1) {
          // Menu does't exist for today
        } else {
          const un = [];
            this.day_four_menu.forEach(e => {
              if (un.length < 1) {
                un.push(e.item_id);
              }else {
                if (un.includes(e.item_id)) {
                  // Do nothing
                } else {
                  un.push(e.item_id);
                }
              }
            });

            if (un.length > 0) {
              // For each item id
              un.forEach(el => {
                this.getMenuItems.getItemDetails(el).subscribe(idets => {
                  if (idets.success) {
                    idets.msg[0].checked = false;
                    idets.msg[0].date = this.p_day_four;
                    this.day_four_item_dets.push(idets.msg);
                    switch (idets.msg[0].sub_name) {
                      // Base
                      case 'Base' || 'base':
                        this.day_four_base_items.push(idets.msg[0]);
                        break;
                      // Dry curry
                      case 'Dry Curry' || 'dry curry' || 'Dry curries' || 'Dry curry':
                        this.day_four_dry_curries.push(idets.msg[0]);
                        break;
                      // Wet curry
                      case 'Wet Curry' || 'wet curry' || 'Wet curries' || 'Wet curry':
                        this.day_four_wet_curries.push(idets.msg[0]);
                        break;
                      // Dal
                      case 'Dal' || 'dal':
                        this.day_four_dal.push(idets.msg[0]);
                        break;
                      // Sweet
                      case 'Sweet' || 'sweet' || 'Sweets' || 'sweets':
                        this.day_four_sweets.push(idets.msg[0]);
                        break;
                      // Curd
                      case 'Curd' || 'curd':
                        this.day_four_curd.push(idets.msg[0]);
                        break;
                      default:
                        break;
                    }
                  }
                });
              });
              this.day_four_books = this.day_four_item_dets;
            }
        }
      }
    });
    this.getMenuItems.getDatesMenu(this.p_day_five, this.p_last_day_five).subscribe(dfi_res => {
      if (dfi_res.success) {
        // console.log(dfi_res.msg[0]);
        this.day_five_menu = dfi_res.msg;
        if (this.day_five_menu.length < 1) {
          // Menu does't exist for today
        } else {

          const un = [];
          this.day_five_menu.forEach(e => {
            if (un.length < 1) {
              un.push(e.item_id);
            } else {
              if (un.includes(e.item_id)) {
                // Do nothing
              } else {
                un.push(e.item_id);
              }
            }
          });

          if (un.length > 0) {
            // For each item id
            un.forEach(el => {
              this.getMenuItems.getItemDetails(el).subscribe(idets => {
                if (idets.success) {
                  idets.msg[0].checked = false;
                  idets.msg[0].date = this.p_day_five;
                  this.day_five_item_dets.push(idets.msg);
                  switch (idets.msg[0].sub_name) {
                    // Base
                    case 'Base' || 'base':
                      this.day_five_base_items.push(idets.msg[0]);
                      break;
                    // Dry curry
                    case 'Dry Curry' || 'dry curry' || 'Dry curries' || 'Dry curry':
                      this.day_five_dry_curries.push(idets.msg[0]);
                      break;
                    // Wet curry
                    case 'Wet Curry' || 'wet curry' || 'Wet curries' || 'Wet curry':
                      this.day_five_wet_curries.push(idets.msg[0]);
                      break;
                    // Dal
                    case 'Dal' || 'dal':
                      this.day_five_dal.push(idets.msg[0]);
                      break;
                    // Sweet
                    case 'Sweet' || 'sweet' || 'Sweets' || 'sweets':
                      this.day_five_sweets.push(idets.msg[0]);
                      break;
                    // Curd
                    case 'Curd' || 'curd':
                      this.day_five_curd.push(idets.msg[0]);
                      break;
                    default:
                      break;
                  }

                }
              });
            });
            this.day_five_books = this.day_five_item_dets;

          }


        }
      }
    });
    this.getMenuItems.getRotiItems().subscribe(rotiis => {
      if (rotiis.success) {
        this.rotiItems = rotiis.msg;
      }else {
      }
    });
  }
  postMenuAvailable() {
    this.getMenuItems.postTabStatus('tab_one', event).subscribe(res => {
      if (res.success) {
      }
    });
    this.getMenuItems.postTabStatus('tab_two', event).subscribe(res => {
      if (res.success) {
      }
    });
    this.getMenuItems.postTabStatus('tab_three', event).subscribe(res => {
      if (res.success) {
      }
    });
  }
  loadDay(date, origin) {
    if (origin === 'btn_clicked') {
      const pdate = this.datePipe.transform(date, 'fullDate');
      if (pdate.includes('Sunday')) {
        $('.sc-ch-db').css({'display': 'flex'});
      }else {
        $('.sc-ch-db').css({'display': 'none'});
      }
      $('.calender-li').removeClass('selected-date-li');
      switch (this.datePipe.transform(date, 'fullDate')) {
        case this.p_day_one:
          $('#top-calender-li').addClass('selected-date-li');
          this.menu_to_be_loaded = this.day_one_books;
          $('.sc-ch-mid').hide();
          $('#day-one-div').show();
          this.numberOfItems = this.num_day_one_items;
          this.place_holder_price = this.total_day_one_price;
          this.day_one_status = true;
          this.day_two_status = false;
          this.day_three_status = false;
          this.day_four_status = false;
          this.day_five_status = false;
          this.day_six_status = false;
          break;
        case this.p_day_two:
          $('#calender-two').addClass('selected-date-li');
          this.menu_to_be_loaded = this.day_two_books;
          $('.sc-ch-mid').hide();
          $('#day-two-div').show();
          this.numberOfItems = this.num_day_two_items;
          this.place_holder_price = this.total_day_two_price;
          this.day_one_status = false;
          this.day_two_status = true;
          this.day_three_status = false;
          this.day_four_status = false;
          this.day_five_status = false;
          this.day_six_status = false;
          break;
        case this.p_day_three:
          $('#calender-three').addClass('selected-date-li');
          this.menu_to_be_loaded = this.day_three_books;
          $('.sc-ch-mid').hide();
          $('#day-three-div').show();
          this.numberOfItems = this.num_day_three_items;
          this.place_holder_price = this.total_day_three_price;
          this.day_one_status = false;
          this.day_two_status = false;
          this.day_three_status = true;
          this.day_four_status = false;
          this.day_five_status = false;
          this.day_six_status = false;
          break;
        case this.p_day_four:
          $('#calender-four').addClass('selected-date-li');
            this.menu_to_be_loaded = this.day_four_books;
            $('.sc-ch-mid').hide();
            $('#day-four-div').show();
            this.numberOfItems = this.num_day_four_items;
            this.place_holder_price = this.total_day_four_price;
          this.day_one_status = false;
          this.day_two_status = false;
          this.day_three_status = false;
          this.day_four_status = true;
          this.day_five_status = false;
          this.day_six_status = false;
          break;
        case this.p_day_five:
          $('#calender-five').addClass('selected-date-li');
           $('.sc-ch-mid').hide();
           $('#day-five-div').show();
          this.numberOfItems = this.num_day_five_items;
          this.place_holder_price = this.total_day_five_price;
          this.day_one_status = false;
          this.day_two_status = false;
          this.day_three_status = false;
          this.day_four_status = false;
          this.day_five_status = true;
          this.day_six_status = false;
          break;
        default:
          break;
      }
    }else {
      switch (true) {
        case this.day_one_status:
          if (this.day_one_c_books.length > 1) {
            if (this.allOrders['day_one'] == null) {
              this.hover_alert = 'You have\'t added to basket';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                    $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                  $('#calender-five').addClass('selected-date-li');
                  // Day five menu
                  // this.menu_to_be_loaded = this.day_five_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                case this.p_day_six:
                  // Day six menu
                  this.menu_to_be_loaded = this.day_six_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-six-div').show();
                  this.numberOfItems = this.num_day_six_items;
                  this.place_holder_price = this.total_day_six_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = true;
                  break;
                default:
                  break;
              }
            }
          } else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                  $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                  $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                  $('#calender-five').addClass('selected-date-li');
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                default:
                  break;
              }
          }
          break;
        case this.day_two_status:
          if (this.day_two_c_books.length > 1) {
            if (this.allOrders['day_two'] == null) {
              this.hover_alert = 'You have\'t added to basket';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                  $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                    $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                  $('#calender-five').addClass('selected-date-li');
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                case this.p_day_six:
                  $('#calender-six').addClass('selected-date-li');
                  // Day six menu
                  this.menu_to_be_loaded = this.day_six_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-six-div').show();
                  this.numberOfItems = this.num_day_six_items;
                  this.place_holder_price = this.total_day_six_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = true;
                  break;
                default:
                  break;
              }
            }
          } else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                  $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                    $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                  $('#calender-five').addClass('selected-date-li');
                  // Day five menu
                  // this.menu_to_be_loaded = this.day_five_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                default:
                  break;
              }
          }
        break;
        case this.day_three_status:
          if (this.day_three_c_books.length > 1) {
            if (this.allOrders['day_three'] == null) {
              this.hover_alert = 'You have\'t added to basket';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                  $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                  $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                  $('#calender-five').addClass('selected-date-li');
                  // Day five menu
                  // this.menu_to_be_loaded = this.day_five_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                default:
                  break;
              }
            }
          } else {
            const pdate = this.datePipe.transform(date, 'fullDate');
            if (pdate.includes('Sunday')) {
              $('.sc-ch-db').css({'display': 'flex'});
            }else {
              $('.sc-ch-db').css({'display': 'none'});
            }
            $('.calender-li').removeClass('selected-date-li');
            switch (this.datePipe.transform(date, 'fullDate')) {
              case this.p_day_one:
                $('#top-calender-li').addClass('selected-date-li');
                // Day one menu
                this.menu_to_be_loaded = this.day_one_books;
                $('.sc-ch-mid').hide();
                $('#day-one-div').show();
                this.numberOfItems = this.num_day_one_items;
                this.place_holder_price = this.total_day_one_price;
                // Update active day status
                this.day_one_status = true;
                this.day_two_status = false;
                this.day_three_status = false;
                this.day_four_status = false;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_two:
              $('#calender-two').addClass('selected-date-li');
                // Day two menu
                this.menu_to_be_loaded = this.day_two_books;
                // Experiment
                $('.sc-ch-mid').hide();
                $('#day-two-div').show();
                this.numberOfItems = this.num_day_two_items;
                this.place_holder_price = this.total_day_two_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = true;
                this.day_three_status = false;
                this.day_four_status = false;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_three:
              $('#calender-three').addClass('selected-date-li');
                // Day three menu
                this.menu_to_be_loaded = this.day_three_books;
                // Experiment
                $('.sc-ch-mid').hide();
                $('#day-three-div').show();
                this.numberOfItems = this.num_day_three_items;
                this.place_holder_price = this.total_day_three_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = false;
                this.day_three_status = true;
                this.day_four_status = false;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_four:
              $('#calender-four').addClass('selected-date-li');
                // Day four menu
                  this.menu_to_be_loaded = this.day_four_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-four-div').show();
                  this.numberOfItems = this.num_day_four_items;
                  this.place_holder_price = this.total_day_four_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = false;
                this.day_three_status = false;
                this.day_four_status = true;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_five:
              $('#calender-five').addClass('selected-date-li');
                // Day five menu
                // this.menu_to_be_loaded = this.day_five_books;
                 // Experiment
                 $('.sc-ch-mid').hide();
                 $('#day-five-div').show();
                this.numberOfItems = this.num_day_five_items;
                this.place_holder_price = this.total_day_five_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = false;
                this.day_three_status = false;
                this.day_four_status = false;
                this.day_five_status = true;
                this.day_six_status = false;
                break;
              default:
                break;
            }
          }
        break;
        case this.day_four_status:
          if (this.day_four_c_books.length > 1) {
            if (this.allOrders['day_four'] == null) {
              this.hover_alert = 'You have\'t added to basket';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                  $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                  $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                $('#calender-five').addClass('selected-date-li');
                  // Day five menu
                  // this.menu_to_be_loaded = this.day_five_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                default:
                  break;
              }
            }
          } else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                $('#calender-five').addClass('selected-date-li');
                  // Day five menu
                  // this.menu_to_be_loaded = this.day_five_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                default:
                  break;
              }
          }
        break;
        case this.day_five_status:
          if (this.day_five_c_books.length > 1) {
            if (this.allOrders['day_five'] == null) {
              this.hover_alert = 'You have\'t added to basket';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              const pdate = this.datePipe.transform(date, 'fullDate');
              if (pdate.includes('Sunday')) {
                $('.sc-ch-db').css({'display': 'flex'});
              }else {
                $('.sc-ch-db').css({'display': 'none'});
              }
              $('.calender-li').removeClass('selected-date-li');
              switch (this.datePipe.transform(date, 'fullDate')) {
                case this.p_day_one:
                  $('#top-calender-li').addClass('selected-date-li');
                  // Day one menu
                  this.menu_to_be_loaded = this.day_one_books;
                  $('.sc-ch-mid').hide();
                  $('#day-one-div').show();
                  this.numberOfItems = this.num_day_one_items;
                  this.place_holder_price = this.total_day_one_price;
                  // Update active day status
                  this.day_one_status = true;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_two:
                  $('#calender-two').addClass('selected-date-li');
                  // Day two menu
                  this.menu_to_be_loaded = this.day_two_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-two-div').show();
                  this.numberOfItems = this.num_day_two_items;
                  this.place_holder_price = this.total_day_two_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = true;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_three:
                  $('#calender-three').addClass('selected-date-li');
                  // Day three menu
                  this.menu_to_be_loaded = this.day_three_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-three-div').show();
                  this.numberOfItems = this.num_day_three_items;
                  this.place_holder_price = this.total_day_three_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = true;
                  this.day_four_status = false;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_four:
                    $('#calender-four').addClass('selected-date-li');
                  // Day four menu
                    this.menu_to_be_loaded = this.day_four_books;
                    // Experiment
                    $('.sc-ch-mid').hide();
                    $('#day-four-div').show();
                    this.numberOfItems = this.num_day_four_items;
                    this.place_holder_price = this.total_day_four_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = true;
                  this.day_five_status = false;
                  this.day_six_status = false;
                  break;
                case this.p_day_five:
                  $('#calender-five').addClass('selected-date-li');
                  // Day five menu
                  // this.menu_to_be_loaded = this.day_five_books;
                   // Experiment
                   $('.sc-ch-mid').hide();
                   $('#day-five-div').show();
                  this.numberOfItems = this.num_day_five_items;
                  this.place_holder_price = this.total_day_five_price;
                  // Update active day status
                  this.day_one_status = false;
                  this.day_two_status = false;
                  this.day_three_status = false;
                  this.day_four_status = false;
                  this.day_five_status = true;
                  this.day_six_status = false;
                  break;
                default:
                  break;
              }
            }
          } else {
            const pdate = this.datePipe.transform(date, 'fullDate');
            if (pdate.includes('Sunday')) {
              $('.sc-ch-db').css({'display': 'flex'});
            }else {
              $('.sc-ch-db').css({'display': 'none'});
            }
            $('.calender-li').removeClass('selected-date-li');
            switch (this.datePipe.transform(date, 'fullDate')) {
              case this.p_day_one:
                $('#top-calender-li').addClass('selected-date-li');
                this.menu_to_be_loaded = this.day_one_books;
                $('.sc-ch-mid').hide();
                $('#day-one-div').show();
                this.numberOfItems = this.num_day_one_items;
                this.place_holder_price = this.total_day_one_price;
                this.day_one_status = true;
                this.day_two_status = false;
                this.day_three_status = false;
                this.day_four_status = false;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_two:
                $('#calender-two').addClass('selected-date-li');
                // Day two menu
                this.menu_to_be_loaded = this.day_two_books;
                // Experiment
                $('.sc-ch-mid').hide();
                $('#day-two-div').show();
                this.numberOfItems = this.num_day_two_items;
                this.place_holder_price = this.total_day_two_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = true;
                this.day_three_status = false;
                this.day_four_status = false;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_three:
                $('#calender-three').addClass('selected-date-li');
                // Day three menu
                this.menu_to_be_loaded = this.day_three_books;
                // Experiment
                $('.sc-ch-mid').hide();
                $('#day-three-div').show();
                this.numberOfItems = this.num_day_three_items;
                this.place_holder_price = this.total_day_three_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = false;
                this.day_three_status = true;
                this.day_four_status = false;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_four:
                $('#calender-four').addClass('selected-date-li');
                // Day four menu
                  this.menu_to_be_loaded = this.day_four_books;
                  // Experiment
                  $('.sc-ch-mid').hide();
                  $('#day-four-div').show();
                  this.numberOfItems = this.num_day_four_items;
                  this.place_holder_price = this.total_day_four_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = false;
                this.day_three_status = false;
                this.day_four_status = true;
                this.day_five_status = false;
                this.day_six_status = false;
                break;
              case this.p_day_five:
                $('#calender-five').addClass('selected-date-li');
                // Day five menu
                // this.menu_to_be_loaded = this.day_five_books;
                 // Experiment
                 $('.sc-ch-mid').hide();
                 $('#day-five-div').show();
                this.numberOfItems = this.num_day_five_items;
                this.place_holder_price = this.total_day_five_price;
                // Update active day status
                this.day_one_status = false;
                this.day_two_status = false;
                this.day_three_status = false;
                this.day_four_status = false;
                this.day_five_status = true;
                this.day_six_status = false;
                break;
              default:
                break;
            }

          }
        break;
        default:
          break;
      }
    }
  }
  decNumberOfItems() {
    switch (true) {
      case this.today_status:
        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_today_items = 1;
          // this.today_price = 1;
        } else {
          // console.log('Num today Items :'+ this.num_today_items);
          this.numberOfItems--;
          this.num_today_items--;
          console.log('Num today Items updated :' + this.num_today_items);

          if (this.num_today_items === 1) {
            this.total_today_price = this.place_holder_price = this.today_price;
            console.log('Number of items is one' + this.total_today_price);
          }else {
            this.total_today_price = this.place_holder_price = this.total_today_price - this.today_price;
            console.log(this.today_price);
          }
        }

        break;
      case this.day_one_status:

        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_day_one_items = 1;
        } else {
          this.numberOfItems--;
          this.num_day_one_items--;
          if (this.num_day_one_items === 1) {
            this.total_day_one_price = this.place_holder_price = this.day_one_price;
            console.log('Number of items is one' + this.total_day_one_price);
          } else {
            this.total_day_one_price = this.place_holder_price = this.total_day_one_price - this.day_one_price;
            // console.log(this.today_price);
          }
        }
        break;

      case this.day_two_status:

        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_day_two_items = 1;
        } else {
          this.numberOfItems--;
          this.num_day_two_items--;

          if (this.num_day_two_items === 1) {
            this.total_day_two_price = this.place_holder_price = this.day_two_price;
            console.log('Number of items is one' + this.total_day_two_price);
          } else {
            this.total_day_two_price = this.place_holder_price = this.total_day_two_price - this.day_two_price;
            // console.log(this.today_price);
          }
        }

        break;
      case this.day_three_status:

        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_day_three_items = 1;
        } else {
          this.numberOfItems--;
          this.num_day_three_items--;
          if (this.num_day_three_items === 1) {
            this.total_day_three_price = this.place_holder_price = this.day_three_price;
            console.log('Number of items is one' + this.total_day_three_price);
          } else {
            this.total_day_three_price = this.place_holder_price = this.total_day_three_price - this.day_three_price;
            // console.log(this.today_price);
          }
        }

        break;
      case this.day_four_status:

        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_day_four_items = 1;
        } else {
          this.numberOfItems--;
          this.num_day_four_items--;

          if (this.num_day_four_items === 1) {
            this.total_day_four_price = this.place_holder_price = this.day_four_price;
            console.log('Number of items is one' + this.total_day_four_price);
          } else {
            this.total_day_four_price = this.place_holder_price = this.total_day_four_price - this.day_four_price;
            // console.log(this.today_price);
          }
        }

        break;
      case this.day_five_status:

        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_day_five_items = 1;
        } else {
          this.numberOfItems--;
          this.num_day_five_items--;

          if (this.num_day_five_items === 1) {
            this.total_day_five_price = this.place_holder_price = this.day_five_price;
            console.log('Number of items is one' + this.total_day_five_price);
          } else {
            this.total_day_five_price = this.place_holder_price = this.total_day_five_price - this.day_five_price;
            // console.log(this.today_price);
          }

        }

        break;
      case this.day_six_status:

        if (this.numberOfItems === 1) {
          this.numberOfItems = 1;
          this.num_day_six_items = 1;
        } else {
          this.numberOfItems--;
          this.num_day_six_items--;

          if (this.num_day_six_items === 1) {
            this.total_day_six_price = this.place_holder_price = this.day_six_price;
            console.log('Number of items is one' + this.total_day_six_price);
          } else {
            this.total_day_six_price = this.place_holder_price = this.total_day_six_price - this.day_six_price;
            // console.log(this.today_price);
          }
        }

        break;

      default:
        break;
      }
  }
  incNumberOfItems() {

    switch (true) {
      case this.today_status:
        this.numberOfItems++;
        this.num_today_items++;
        // Increase the cost as well
        if (this.num_today_items === 0) {
          this.total_today_price = this.place_holder_price = this.today_price * 1;
          console.log(this.total_today_price);
        }else {
          this.total_today_price = this.place_holder_price = this.today_price * this.num_today_items;
          console.log(this.total_today_price);
        }
        break;
      case this.day_one_status:
        this.numberOfItems++;
        this.num_day_one_items++;
        // Increase the cost as well
        if (this.num_day_one_items === 0) {
          this.total_day_one_price = this.place_holder_price = this.day_one_price * 1;
          // console.log(this.total_today_price);
        } else {
          this.total_day_one_price = this.place_holder_price = this.day_one_price * this.num_day_one_items;
          // console.log(this.total_today_price);
        }
        break;
      case this.day_two_status:
        this.numberOfItems++;
        this.num_day_two_items++;
        // Increase the cost as well
        if (this.num_day_two_items === 0) {
          this.total_day_two_price = this.place_holder_price = this.day_two_price * 1;
          // console.log(this.total_today_price);
        } else {
          this.total_day_two_price = this.place_holder_price = this.day_two_price * this.num_day_two_items;
          // console.log(this.total_today_price);
        }
        break;
      case this.day_three_status:
        this.numberOfItems++;
        this.num_day_three_items++;
        // Increase the cost as well
        if (this.num_day_three_items === 0) {
          this.total_day_three_price = this.place_holder_price = this.day_three_price * 1;
          // console.log(this.total_today_price);
        } else {
          this.total_day_three_price = this.place_holder_price = this.day_three_price * this.num_day_three_items;
          // console.log(this.total_today_price);
        }
        break;
      case this.day_four_status:
        this.numberOfItems++;
        this.num_day_four_items++;
        // Increase the cost as well
        if (this.num_day_four_items === 0) {
          this.total_day_four_price = this.place_holder_price = this.day_four_price * 1;
          // console.log(this.total_today_price);
        } else {
          this.total_day_four_price = this.place_holder_price = this.day_four_price * this.num_day_four_items;
          // console.log(this.total_today_price);
        }
        break;
      case this.day_five_status:
        this.numberOfItems++;
        this.num_day_five_items++;
        // Increase the cost as well
        if (this.num_day_five_items === 0) {
          this.total_day_five_price = this.place_holder_price = this.day_five_price * 1;
          // console.log(this.total_today_price);
        } else {
          this.total_day_five_price = this.place_holder_price = this.day_five_price * this.num_day_five_items;
          // console.log(this.total_today_price);
        }
        break;
      case this.day_six_status:
        this.numberOfItems++;
        this.num_day_six_items++;
        // Increase the cost as well
        if (this.num_day_six_items === 0) {
          this.total_day_six_price = this.place_holder_price = this.day_six_price * 1;
          // console.log(this.total_today_price);
        } else {
          this.total_day_six_price = this.place_holder_price = this.day_six_price * this.num_day_six_items;
          // console.log(this.total_today_price);
        }
        break;
      default:
        break;
    }
  }
  letterCheck(e) {
    console.log(e.target.checked);
    switch (e.target.checked) {
      case true:
        // Add 5 rupees to the total
        this.letter_added = true;
        this.letter_price = 5;
        localStorage.setItem('letter_added', 'true');
        break;
      case false:
        // Deduct 5 rupees from the total
        this.letter_added = false;
        this.letter_price = 0;
        localStorage.setItem('letter_added', 'false');
        break;
      default:
        break;
    }
  }
  onCheckChange(menu, event, mevent) {
    menu.checked = event;
    const tar = mevent.target;
    if (event === true) {
      if ($(tar).parent().find('img').hasClass('roti-cl')) {
        $(tar).parent().find('img').attr('src', this.roti_r_img);
        $(tar).parent().parent().parent().parent().parent().find('img.rice-roti-cl').attr('src', this.rice_roti_img);
        $(tar).parent().parent().parent().parent().parent().find('img.rice-cl').attr('src', this.rice_img);
      }
      if ($(tar).parent().find('img').hasClass('rice-roti-cl')) {
        $(tar).parent().parent().parent().parent().parent().find('img.rice-roti-cl').attr('src', this.rice_roti_img);
        $(tar).parent().parent().parent().parent().parent().find('img.roti-cl').attr('src', this.roti_img);
        $(tar).parent().parent().parent().parent().parent().find('img.rice-cl').attr('src', this.rice_img);
        $(tar).parent().find('img').attr('src', this.rice_roti_r_img);
      }
      if ($(tar).parent().find('img').hasClass('rice-cl')) {
        $(tar).parent().find('img').attr('src', this.rice_r_img);
        $(tar).parent().parent().parent().parent().parent().find('img.rice-roti-cl').attr('src', this.rice_roti_img);
        $(tar).parent().parent().parent().parent().parent().find('img.roti-cl').attr('src', this.roti_img);
      }
      if ($(tar).parent().find('img').hasClass('curry-cl')) {
        $(tar).parent().find('img').attr('src', this.curry_r_img);
      }
      if ($(tar).parent().find('img').hasClass('dal-cl')) {
        $(tar).parent().find('img').attr('src', this.dal_r_img);
      }
      if ($(tar).parent().find('img').hasClass('curd-cl')) {
        $(tar).parent().find('img').attr('src', this.curd_r_img);
      }
      if ($(tar).parent().find('img').hasClass('fry-cl')) {
        $(tar).parent().find('img').attr('src', this.fry_r_img);
      }
      if ($(tar).parent().find('img').hasClass('dessert-cl')) {
        $(tar).parent().find('img').attr('src', this.desserts_r_img);
      }
    }else {
      if ($(tar).parent().find('img').hasClass('roti-cl')) {
        $(tar).parent().find('img').attr('src', this.roti_img);
      }
      if ($(tar).parent().find('img').hasClass('rice-roti-cl')) {
        $(tar).parent().find('img').attr('src', this.rice_roti_img);
      }
      if ($(tar).parent().find('img').hasClass('curry-cl')) {
        $(tar).parent().find('img').attr('src', this.curry_img);
      }
      if ($(tar).parent().find('img').hasClass('dal-cl')) {
        $(tar).parent().find('img').attr('src', this.dal_img);
      }
      if ($(tar).parent().find('img').hasClass('rice-cl')) {
        $(tar).parent().find('img').attr('src', this.rice_img);
      }
      if ($(tar).parent().find('img').hasClass('curd-cl')) {
        $(tar).parent().find('img').attr('src', this.curd_img);
      }

      if ($(tar).parent().find('img').hasClass('fry-cl')) {
        $(tar).parent().find('img').attr('src', this.fry_img);
      }

      if ($(tar).parent().find('img').hasClass('dessert-cl')) {
        $(tar).parent().find('img').attr('src', this.desserts_img);
      }
    }
    switch (true) {
      case this.day_one_status:
        if (menu.sub_name === 'Base') {
          this.day_one_c_books.forEach(element => {
            if (element.sub_name === menu.sub_name && element.date === menu.date) {
              const ind = this.day_one_c_books.indexOf(element, 0);
              if (ind > -1) {
                this.day_one_c_books.splice(ind, 1);
                this.day_one_price -= element.item_price;
                const to_be_added_price = this.num_day_one_items * element.item_price;
                this.total_day_one_price -= to_be_added_price;
                this.place_holder_price = this.total_day_one_price;
              }
            }
          });
          // Adding current one to basket
          this.day_one_c_books.push(menu);
          // Update prices
          if (this.num_day_one_items === 0) {
            this.num_day_one_items++;
            this.numberOfItems = this.num_day_one_items;
            const to_be_added_price = this.num_day_one_items * menu.item_price;
            this.day_one_price += +menu.item_price;
            this.total_day_one_price += +menu.item_price;
            this.place_holder_price = this.total_day_one_price;
          } else {
            const to_be_added_price = this.num_day_one_items * menu.item_price;
            this.day_one_price += +menu.item_price;
            this.total_day_one_price += +to_be_added_price;
            this.place_holder_price = this.total_day_one_price;
          }
        }else {
          if (event) {
            // checked
            // Add to added items
            this.day_one_c_books.push(menu);
            // Update prices
            if (this.num_day_one_items === 0) {
              this.num_day_one_items++;
              this.numberOfItems = this.num_day_one_items;
              const to_be_added_price = this.num_day_one_items * menu.item_price;
              this.day_one_price += +menu.item_price;
              this.total_day_one_price += +menu.item_price;
              this.place_holder_price = this.total_day_one_price;
            } else {
              const to_be_added_price = this.num_day_one_items * menu.item_price;
              this.day_one_price += +menu.item_price;
              this.total_day_one_price += +to_be_added_price;
              this.place_holder_price = this.total_day_one_price;
            }
          } else {
            // must remove from added items if exists
            this.day_one_c_books.forEach(element => {
              if (element._id === menu._id && element.date === menu.date) {
                const ind = this.day_one_c_books.indexOf(element, 0);
                if (ind > -1) {
                  this.day_one_c_books.splice(ind, 1);
                  this.day_one_price -= menu.item_price;
                  const to_be_added_price = this.num_day_one_items * menu.item_price;
                  this.total_day_one_price -= to_be_added_price;
                  this.place_holder_price = this.total_day_one_price;
                }
              }
            });
          }
        }

        break;
      case this.day_two_status:
        if (menu.sub_name === 'Base') {
          this.day_two_c_books.forEach(element => {
            if (element.sub_name === menu.sub_name && element.date === menu.date) {
              const ind = this.day_two_c_books.indexOf(element, 0);
              if (ind > -1) {
                this.day_two_c_books.splice(ind, 1);
                this.day_two_price -= element.item_price;
                const to_be_added_price = this.num_day_two_items * element.item_price;
                this.total_day_two_price -= to_be_added_price;
                this.place_holder_price = this.total_day_two_price;
              }
            }
          });
          this.day_two_c_books.push(menu);
          if (this.num_day_two_items === 0) {
            this.num_day_two_items++;
            this.numberOfItems = this.num_day_two_items;
            const to_be_added_price = this.num_day_two_items * menu.item_price;
            this.day_two_price += +menu.item_price;
            this.total_day_two_price += +menu.item_price;
            this.place_holder_price = this.total_day_two_price;
          } else {
            const to_be_added_price = this.num_day_two_items * menu.item_price;
            this.day_two_price += +menu.item_price;
            this.total_day_two_price += +to_be_added_price;
            this.place_holder_price = this.total_day_two_price;
          }
        }else {
          if (event) {
            this.day_two_c_books.push(menu);
            if (this.num_day_two_items === 0) {
              this.num_day_two_items++;
              this.numberOfItems = this.num_day_two_items;
              const to_be_added_price = this.num_day_two_items * menu.item_price;
              this.day_two_price += +menu.item_price;
              this.total_day_two_price += +menu.item_price;
              this.place_holder_price = this.total_day_two_price;
            } else {
              const to_be_added_price = this.num_day_two_items * menu.item_price;
              this.day_two_price += +menu.item_price;
              this.total_day_two_price += +to_be_added_price;
              this.place_holder_price = this.total_day_two_price;
            }

          } else {
            this.day_two_c_books.forEach(element => {
              if (element._id === menu._id && element.date === menu.date) {
                const ind = this.day_two_c_books.indexOf(element, 0);
                if (ind > -1) {
                  this.day_two_c_books.splice(ind, 1);
                  this.day_two_price -= menu.item_price;
                  const to_be_added_price = this.num_day_two_items * menu.item_price;
                  this.total_day_two_price -= to_be_added_price;
                  this.place_holder_price = this.total_day_two_price;
                }
              }
            });
          }
        }
        break;
      case this.day_three_status:
        this.day_three_books = this.menu_to_be_loaded;
        if (menu.sub_name === 'Base') {
          this.day_three_c_books.forEach(element => {
            if (element.sub_name === menu.sub_name && element.date === menu.date) {
              const ind = this.day_three_c_books.indexOf(element, 0);
              if (ind > -1) {
                this.day_three_c_books.splice(ind, 1);
                this.day_three_price -= element.item_price;
                const to_be_added_price = this.num_day_three_items * element.item_price;
                this.total_day_three_price -= to_be_added_price;
                this.place_holder_price = this.total_day_three_price;
              }
            }
          });
          this.day_three_c_books.push(menu);
          if (this.num_day_three_items === 0) {
            this.num_day_three_items++;
            this.numberOfItems = this.num_day_three_items;
            const to_be_added_price = this.num_day_three_items * menu.item_price;
            this.day_three_price += +menu.item_price;
            this.total_day_three_price += +menu.item_price;
            this.place_holder_price = this.total_day_three_price;
          } else {
            const to_be_added_price = this.num_day_three_items * menu.item_price;
            this.day_three_price += +menu.item_price;
            this.total_day_three_price += +to_be_added_price;
            this.place_holder_price = this.total_day_three_price;
          }
        }else {
          if (event) {
            this.day_three_c_books.push(menu);
            if (this.num_day_three_items === 0) {
              this.num_day_three_items++;
              this.numberOfItems = this.num_day_three_items;
              const to_be_added_price = this.num_day_three_items * menu.item_price;
              this.day_three_price += +menu.item_price;
              this.total_day_three_price += +menu.item_price;
              this.place_holder_price = this.total_day_three_price;
            } else {
              const to_be_added_price = this.num_day_three_items * menu.item_price;
              this.day_three_price += +menu.item_price;
              this.total_day_three_price += +to_be_added_price;
              this.place_holder_price = this.total_day_three_price;
            }
          } else {
            this.day_three_c_books.forEach(element => {
              if (element._id === menu._id && element.date === menu.date) {
                const ind = this.day_three_c_books.indexOf(element, 0);
                if (ind > -1) {
                  this.day_three_c_books.splice(ind, 1);
                  this.day_three_c_books.splice(ind, 1);
                  this.day_three_price -= menu.item_price;
                  const to_be_added_price = this.num_day_three_items * menu.item_price;
                  this.total_day_three_price -= to_be_added_price;
                  this.place_holder_price = this.total_day_three_price;
                }
              }
            });
          }
        }
        break;
      case this.day_four_status:
        if (menu.sub_name === 'Base') {
          this.day_four_c_books.forEach(element => {
            if (element.sub_name === menu.sub_name && element.date === menu.date) {
              const ind = this.day_four_c_books.indexOf(element, 0);
              if (ind > -1) {
                this.day_four_c_books.splice(ind, 1);
                this.day_four_price -= element.item_price;
                const to_be_added_price = this.num_day_four_items * element.item_price;
                this.total_day_four_price -= to_be_added_price;
                this.place_holder_price = this.total_day_four_price;
              }
            }
          });
          this.day_four_c_books.push(menu);
          if (this.num_day_four_items === 0) {
            this.num_day_four_items++;
            this.numberOfItems = this.num_day_four_items;
            const to_be_added_price = this.num_day_four_items * menu.item_price;
            this.day_four_price += +menu.item_price;
            this.total_day_four_price += +menu.item_price;
            this.place_holder_price = this.total_day_four_price;
          } else {
            const to_be_added_price = this.num_day_four_items * menu.item_price;
            this.day_four_price += +menu.item_price;
            this.total_day_four_price += +to_be_added_price;
            this.place_holder_price = this.total_day_four_price;
          }
        }else {
          if (event) {
            this.day_four_c_books.push(menu);
            if (this.num_day_four_items === 0) {
              this.num_day_four_items++;
              this.numberOfItems = this.num_day_four_items;
              const to_be_added_price = this.num_day_four_items * menu.item_price;
              this.day_four_price += +menu.item_price;
              this.total_day_four_price += +menu.item_price;
              this.place_holder_price = this.total_day_four_price;
            } else {
              const to_be_added_price = this.num_day_four_items * menu.item_price;
              this.day_four_price += +menu.item_price;
              this.total_day_four_price += +to_be_added_price;
              this.place_holder_price = this.total_day_four_price;
            }
          }else {
            this.day_four_c_books.forEach(element => {
              if (element._id === menu._id && element.date === menu.date) {
                const ind = this.day_four_c_books.indexOf(element, 0);
                if (ind > -1) {
                  this.day_four_c_books.splice(ind, 1);
                  this.day_four_price -= menu.item_price;
                  const to_be_added_price = this.num_day_four_items * menu.item_price;
                  this.total_day_four_price -= to_be_added_price;
                  this.place_holder_price = this.total_day_four_price;
                }
              }
            });
          }
        }

        break;
      case this.day_five_status:
      if (menu.sub_name === 'Base') {
        this.day_five_c_books.forEach(element => {
          if (element.sub_name === menu.sub_name && element.date === menu.date) {
            const ind = this.day_five_c_books.indexOf(element, 0);
            if (ind > -1) {
              this.day_five_c_books.splice(ind, 1);
              this.day_five_price -= element.item_price;
              const to_be_added_price = this.num_day_five_items * element.item_price;
              this.total_day_five_price -= to_be_added_price;
              this.place_holder_price = this.total_day_five_price;
            }
          }
        });
        this.day_five_c_books.push(menu);
        if (this.num_day_five_items === 0) {
          this.num_day_five_items++;
          this.numberOfItems = this.num_day_five_items;
          const to_be_added_price = this.num_day_five_items * menu.item_price;
          this.day_five_price += +menu.item_price;
          this.total_day_five_price += +menu.item_price;
          this.place_holder_price = this.total_day_five_price;
        } else {
          const to_be_added_price = this.num_day_five_items * menu.item_price;
          this.day_five_price += +menu.item_price;
          this.total_day_five_price += +to_be_added_price;
          this.place_holder_price = this.total_day_five_price;
        }
      }else {
        if (event) {
          this.day_five_c_books.push(menu);
          if (this.num_day_five_items === 0) {
            this.num_day_five_items++;
            this.numberOfItems = this.num_day_five_items;
            const to_be_added_price = this.num_day_five_items * menu.item_price;
            this.day_five_price += +menu.item_price;
            this.total_day_five_price += +menu.item_price;
            this.place_holder_price = this.total_day_five_price;
          } else {
            const to_be_added_price = this.num_day_five_items * menu.item_price;
            this.day_five_price += +menu.item_price;
            this.total_day_five_price += +to_be_added_price;
            this.place_holder_price = this.total_day_five_price;
          }
        } else {
          this.day_five_c_books.forEach(element => {
            if (element._id === menu._id && element.date === menu.date) {
              const ind = this.day_five_c_books.indexOf(element, 0);
              if (ind > -1) {
                this.day_five_c_books.splice(ind, 1);
                this.day_five_price -= menu.item_price;
                const to_be_added_price = this.num_day_five_items * menu.item_price;
                this.total_day_five_price -= to_be_added_price;
                this.place_holder_price = this.total_day_five_price;
              }
            }
          });
        }
      }
        break;
      default:
        break;
    }
  }
  addCartClicked() {
    switch (true) {
      case this.day_one_status:
        if (this.day_one_c_books.length < 5) {
          this.hover_alert = 'Please choose at least four';
          $('.added-db').css({'display': 'flex'});
          setTimeout(function() {
            $('.added-db').css({'display': 'none'});
          }, 3000);
        }else {
          if (this.day_one_slot === undefined || this.day_one_slot === null) {
            $('.slot-select').css({'border-color': '#fa0000'});
            this.hover_alert = 'Please Select Delivery Slot';
            $('.added-db').css({'display': 'flex'});
            setTimeout(function() {
              $('.added-db').css({'display': 'none'});
            }, 3000);
          }else {
            let day_one_check = false;
            this.day_one_c_books.forEach(element => {
              if (element.sub_name === 'Base') {
                day_one_check = true;
              }
            });
            if (day_one_check) {
            $('.slot-select').css({'border-color': '#666'});
            let day_one: object, day_two: object, day_three: object, day_four: object, day_five: object;
                    if (this.num_day_one_items > 0) {
                      if (this.day_one_c_books.length > 4) {
                        day_one = {
                          date: this.p_day_one,
                          rawDate : this.day_one,
                          menu: this.day_one_c_books,
                          numOfTimes: this.num_day_one_items,
                          perPortionPrice: this.day_one_price,
                          timeSlot: this.day_one_slot,
                          totalPrice: this.total_day_one_price
                        };
                      }else {
                        if ((this.allOrders['day_one'] != null)) {
                          day_one = this.allOrders['day_one'];
                        }else {
                          day_one = null;
                        }
                      }
                    } else {
                      if ((this.allOrders['day_one'] != null)) {
                        day_one = this.allOrders['day_one'];
                      }else {
                        day_one = null;
                      }
                    }
                    if (this.num_day_two_items > 0) {
                      if (this.day_two_c_books.length > 4) {
                        day_two = {
                          date: this.p_day_two,
                          rawDate: this.day_two,
                          menu: this.day_two_c_books,
                          numOfTimes: this.num_day_two_items,
                          perPortionPrice: this.day_two_price,
                          timeSlot: this.day_two_slot,
                          totalPrice: this.total_day_two_price
                        };
                      }else {
                        if ((this.allOrders['day_two'] != null)) {
                          day_two = this.allOrders['day_two'];
                        }else {
                          day_two = null;
                        }
                      }
                    } else {
                      if ((this.allOrders['day_two'] != null)) {
                        day_two = this.allOrders['day_two'];
                      }else {
                        day_two = null;
                      }
                    }
                    if (this.num_day_three_items > 0) {
                      if (this.day_three_c_books.length > 4) {
                        day_three = {
                          date: this.p_day_three,
                          rawDate: this.day_three,
                          menu: this.day_three_c_books,
                          numOfTimes: this.num_day_three_items,
                          perPortionPrice: this.day_three_price,
                          timeSlot: this.day_three_slot,
                          totalPrice: this.total_day_three_price
                        };
                      } else {
                        if ((this.allOrders['day_three'] != null)) {
                          day_three = this.allOrders['day_three'];
                        }else {
                          day_three = null;
                        }
                      }
                    } else {
                      if ((this.allOrders['day_three'] != null)) {
                        day_three = this.allOrders['day_three'];
                      }else {
                        day_three = null;
                      }
                    }
                    if (this.num_day_four_items > 0) {
                      if (this.day_four_c_books.length > 4) {
                        day_four = {
                          date: this.p_day_four,
                          rawDate: this.day_four,
                          menu: this.day_four_c_books,
                          numOfTimes: this.num_day_four_items,
                          perPortionPrice: this.day_four_price,
                          timeSlot: this.day_four_slot,
                          totalPrice: this.total_day_four_price
                        };
                      }else {
                        if ((this.allOrders['day_four'] != null)) {
                          day_four = this.allOrders['day_four'];
                        }else {
                          day_four = null;
                        }
                      }
                    } else {
                      if ((this.allOrders['day_four'] != null)) {
                        day_four = null;
                      }else {
                        day_four = this.allOrders['day_four'];
                      }
                    }
                    if (this.num_day_five_items > 0) {
                      if (this.day_five_c_books.length > 4) {
                        day_five = {
                          date: this.p_day_five,
                          rawDate : this.day_five,
                          menu: this.day_five_c_books,
                          numOfTimes: this.num_day_five_items,
                          perPortionPrice: this.day_five_price,
                          timeSlot: this.day_five_slot,
                          totalPrice: this.total_day_five_price
                        };
                      }else {
                        if ((this.allOrders['day_five'] != null)) {
                          day_five = this.allOrders['day_five'];
                        }else {
                          day_five = null;
                        }
                      }
                    } else {
                      if ((this.allOrders['day_five'] != null)) {
                        day_five = this.allOrders['day_five'];
                      }else {
                        day_five = null;
                      }
                    }
                    switch (true) {
                      case this.day_one_status:
                        this.basketNumber++;
                        this.appComponent.basket_num = this.basketNumber;
                        localStorage.setItem('basket_number', this.basketNumber.toString());
                        break;
                      case this.day_two_status:
                        this.basketNumber++;
                        this.appComponent.basket_num = this.basketNumber;
                        localStorage.setItem('basket_number', this.basketNumber.toString());
                        break;
                      case this.day_three_status:
                        this.basketNumber++;
                        this.appComponent.basket_num = this.basketNumber;
                        localStorage.setItem('basket_number', this.basketNumber.toString());
                        break;
                      case this.day_four_status:
                        this.basketNumber++;
                        this.appComponent.basket_num = this.basketNumber;
                        localStorage.setItem('basket_number', this.basketNumber.toString());
                        break;
                      case this.day_five_status:
                        this.basketNumber++;
                        this.appComponent.basket_num = this.basketNumber;
                        localStorage.setItem('basket_number', this.basketNumber.toString());
                        break;
                      default:
                        break;
                    }
                    this.allOrders = {
                      day_one: day_one,
                      day_two: day_two,
                      day_three: day_three,
                      day_four: day_four,
                      day_five: day_five,
                    };
                    localStorage.setItem('all_orders', JSON.stringify(this.allOrders));
                    this.hover_alert = 'Added !';
                    $('.added-db').css({'display': 'flex'});
                    setTimeout(function() {
                      $('.added-db').css({'display': 'none'});
                    }, 3000);
              }else {
                this.hover_alert = 'Please select one Base item';
                $('.added-db').css({'display': 'flex'});
                setTimeout(function() {
                  $('.added-db').css({'display': 'none'});
                }, 3000);
              }
          }
        }
      break;
      case this.day_two_status:
        if (this.day_two_c_books.length < 5) {
          this.hover_alert = 'Please choose at least four';
          $('.added-db').css({'display': 'flex'});
          setTimeout(function() {
            $('.added-db').css({'display': 'none'});
          }, 3000);
        }else {
        if (this.day_two_slot === undefined || this.day_two_slot === null) {
          //  Show error
          $('.slot-select').css({'border-color': '#fa0000'});
          this.hover_alert = 'Please Select Delivery Slot';
          $('.added-db').css({'display': 'flex'});
          setTimeout(function() {
            $('.added-db').css({'display': 'none'});
          }, 3000);
        }else {
          let day_two_check = false;
          this.day_two_c_books.forEach(element => {
            if (element.sub_name === 'Base') {
              day_two_check = true;
            }
          });
          if (day_two_check) {
            $('.slot-select').css({'border-color': '#666'});
          let day_one: object, day_two: object, day_three: object, day_four: object, day_five: object;
                // If day one's items are active
                if (this.num_day_one_items > 0) {
                  // let date, menu, numOfTimes, totalPrice;
                  if (this.day_one_c_books.length > 4) {
                    day_one = {
                      // Get Date
                      date: this.p_day_one,
                      // Raw date for reports
                      rawDate : this.day_one,
                      // Get the booked menu
                      menu: this.day_one_c_books,
                      // Get the number of times menu has been booked
                      numOfTimes: this.num_day_one_items,
                      // Price per portion
                      perPortionPrice: this.day_one_price,
                      // Time slot
                      timeSlot: this.day_one_slot,
                      // Total price
                      totalPrice: this.total_day_one_price
                    };
                  }else {
                    if ((this.allOrders['day_one'] != null)) {
                      day_one = this.allOrders['day_one'];
                    }else {
                      day_one = null;
                    }
                  }
                } else {
                  if ((this.allOrders['day_one'] != null)) {
                    day_one = null;
                  }else {
                    day_one = this.allOrders['day_one'];
                  }
                }
                // If day two's items are active
                if (this.num_day_two_items > 0) {
                  // let date, menu, numOfTimes, totalPrice;
                  if (this.day_two_c_books.length > 4) {
                    day_two = {
                      // Get Date
                      date: this.p_day_two,
                      // Raw date for reports
                      rawDate: this.day_two,
                      // Get the booked menu
                      menu: this.day_two_c_books,
                      // Get the number of times menu has been booked
                      numOfTimes: this.num_day_two_items,
                      // Price per portion
                      perPortionPrice: this.day_two_price,
                      // Time slot
                      timeSlot: this.day_two_slot,
                      // Total price
                      totalPrice: this.total_day_two_price
                    };
                  }else {
                    if ((this.allOrders['day_two'] != null)) {
                      day_two = this.allOrders['day_two'];
                    }else {
                      day_two = null;
                    }
                  }
                } else {
                  if ((this.allOrders['day_two'] != null)) {
                    day_two = this.allOrders['day_two'];
                  }else {
                    day_two = null;
                  }
                }
                // If day three's items are active
                if (this.num_day_three_items > 0) {
                  if (this.day_three_c_books.length > 4) {
                    day_three = {
                      // Get Date
                      date: this.p_day_three,
                      // Raw date for reports
                      rawDate: this.day_three,
                      // Get the booked menu
                      menu: this.day_three_c_books,
                      // Get the number of times menu has been booked
                      numOfTimes: this.num_day_three_items,
                      // Price per portion
                      perPortionPrice: this.day_three_price,
                      // Time slot
                      timeSlot: this.day_three_slot,
                      // Total price
                      totalPrice: this.total_day_three_price
                    };
                  } else {
                    if ((this.allOrders['day_three'] != null)) {
                      day_three = this.allOrders['day_three'];
                    }else {
                      day_three = null;
                    }
                  }
                } else {
                  if ((this.allOrders['day_three'] != null)) {
                    day_three = this.allOrders['day_three'];
                  }else {
                    day_three = null;
                  }
                }
                // If day four's items are active
                if (this.num_day_four_items > 0) {
                  if (this.day_four_c_books.length > 4) {
                    day_four = {
                      // Get Date
                      date: this.p_day_four,
                      // Raw date for reports
                      rawDate: this.day_four,
                      // Get the booked menu
                      menu: this.day_four_c_books,
                      // Get the number of times menu has been booked
                      numOfTimes: this.num_day_four_items,
                      // Price per portion
                      perPortionPrice: this.day_four_price,
                      // Time slot
                      timeSlot: this.day_four_slot,
                      // Total price
                      totalPrice: this.total_day_four_price
                    };
                  }else {
                    if ((this.allOrders['day_four'] != null)) {
                      day_four = this.allOrders['day_four'];
                    }else {
                      day_four = null;
                    }
                  }
                } else {
                  if ((this.allOrders['day_four'] != null)) {
                    day_four = this.allOrders['day_four'];
                  }else {
                    day_four = null;
                  }
                }
                // If day five's items are active
                if (this.num_day_five_items > 0) {
                  if (this.day_five_c_books.length > 4) {
                    day_five = {
                      // Get Date
                      date: this.p_day_five,
                      // Raw date for reports
                      rawDate : this.day_five,
                      // Get the booked menu
                      menu: this.day_five_c_books,
                      // Get the number of times menu has been booked
                      numOfTimes: this.num_day_five_items,
                      // Price per portion
                      perPortionPrice: this.day_five_price,
                      // Time slot
                      timeSlot: this.day_five_slot,
                      // Total price
                      totalPrice: this.total_day_five_price
                    };
                  }else {
                    if ((this.allOrders['day_five'] != null)) {
                      day_five = this.allOrders['day_five'];
                    }else {
                      day_five = null;
                    }
                  }
                } else {
                  if ((this.allOrders['day_five'] != null)) {
                    day_five = this.allOrders['day_five'];
                  }else {
                    day_five = null;
                  }
                }
                switch (true) {
                  case this.today_status:
                    this.basketNumber++;
                    this.appComponent.basket_num = this.basketNumber;
                    localStorage.setItem('basket_number', this.basketNumber.toString());
                    break;
                  case this.day_one_status:
                    this.basketNumber++;
                    this.appComponent.basket_num = this.basketNumber;
                    localStorage.setItem('basket_number', this.basketNumber.toString());
                    break;
                  case this.day_two_status:
                    this.basketNumber++;
                    this.appComponent.basket_num = this.basketNumber;
                    localStorage.setItem('basket_number', this.basketNumber.toString());
                    break;
                  case this.day_three_status:
                    this.basketNumber++;
                    this.appComponent.basket_num = this.basketNumber;
                    localStorage.setItem('basket_number', this.basketNumber.toString());
                    break;
                  case this.day_four_status:
                    this.basketNumber++;
                    this.appComponent.basket_num = this.basketNumber;
                    localStorage.setItem('basket_number', this.basketNumber.toString());
                    break;
                  case this.day_five_status:
                    this.basketNumber++;
                    this.appComponent.basket_num = this.basketNumber;
                    localStorage.setItem('basket_number', this.basketNumber.toString());
                    break;
                  default:
                    break;
                }
                this.allOrders = {
                  day_one: day_one,
                  day_two: day_two,
                  day_three: day_three,
                  day_four: day_four,
                  day_five: day_five,
                };
                localStorage.setItem('all_orders', JSON.stringify(this.allOrders));
                this.hover_alert = 'Added !';
                $('.added-db').css({'display': 'flex'});
                setTimeout(function() {
                  $('.added-db').css({'display': 'none'});
                }, 3000);
              }else {
                this.hover_alert = 'Please select one Base Item';
                $('.added-db').css({'display': 'flex'});
                setTimeout(function() {
                  $('.added-db').css({'display': 'none'});
                }, 3000);
              }
            }
          }
      break;
      case this.day_three_status:
            if (this.day_three_c_books.length < 5) {
              this.hover_alert = 'Please choose at least four';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              if (this.day_three_slot === undefined || this.day_three_slot === null) {
                //  Show error
                $('.slot-select').css({'border-color': '#fa0000'});
                this.hover_alert = 'Please Select Delivery Slot';
                $('.added-db').css({'display': 'flex'});
                setTimeout(function() {
                  $('.added-db').css({'display': 'none'});
                }, 3000);
              }else {
                let day_three_check = false;
                this.day_three_c_books.forEach(element => {
                  if (element.sub_name === 'Base') {
                    day_three_check = true;
                  }
                });
                if (day_three_check) {
                $('.slot-select').css({'border-color': '#666'});
              let day_one: object, day_two: object, day_three: object, day_four: object, day_five: object;
                      // If day one's items are active
                      if (this.num_day_one_items > 0) {
                        if (this.day_one_c_books.length > 4) {
                          day_one = {
                            // Get Date
                            date: this.p_day_one,
                            // Raw date for reports
                            rawDate : this.day_one,
                            // Get the booked menu
                            menu: this.day_one_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_one_items,
                            // Price per portion
                            perPortionPrice: this.day_one_price,
                            // Time slot
                            timeSlot: this.day_one_slot,
                            // Total price
                            totalPrice: this.total_day_one_price
                          };
                        }else {
                          if ((this.allOrders['day_one'] != null)) {
                            day_one = this.allOrders['day_one'];
                          }else {
                            day_one = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_one'] != null)) {
                          day_one = this.allOrders['day_one'];
                        }else {
                          day_one = null;
                        }
                      }
                      // If day two's items are active
                      if (this.num_day_two_items > 0) {
                        if (this.day_two_c_books.length > 4) {
                          day_two = {
                            // Get Date
                            date: this.p_day_two,
                            // Raw date for reports
                            rawDate: this.day_two,
                            // Get the booked menu
                            menu: this.day_two_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_two_items,
                            // Price per portion
                            perPortionPrice: this.day_two_price,
                            // Time slot
                            timeSlot: this.day_two_slot,
                            // Total price
                            totalPrice: this.total_day_two_price
                          };
                        }else {
                          if ((this.allOrders['day_two'] != null)) {
                            day_two = this.allOrders['day_two'];
                          }else {
                            day_two = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_two'] != null)) {
                          day_two = this.allOrders['day_two'];
                        }else {
                          day_two = null;
                        }
                      }
                      // If day three's items are active
                      if (this.num_day_three_items > 0) {
                        if (this.day_three_c_books.length > 4) {
                          day_three = {
                            // Get Date
                            date: this.p_day_three,
                            // Raw date for reports
                            rawDate: this.day_three,
                            // Get the booked menu
                            menu: this.day_three_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_three_items,
                            // Price per portion
                            perPortionPrice: this.day_three_price,
                            // Time slot
                            timeSlot: this.day_three_slot,
                            // Total price
                            totalPrice: this.total_day_three_price
                          };
                        } else {
                          if ((this.allOrders['day_three'] != null)) {
                            day_three = this.allOrders['day_three'];
                          }else {
                            day_three = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_three'] != null)) {
                          day_three = this.allOrders['day_three'];
                        }else {
                          day_three = null;
                        }
                      }
                      // If day four's items are active
                      if (this.num_day_four_items > 0) {
                        if (this.day_four_c_books.length > 4) {
                          day_four = {
                            // Get Date
                            date: this.p_day_four,
                            // Raw date for reports
                            rawDate: this.day_four,
                            // Get the booked menu
                            menu: this.day_four_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_four_items,
                            // Price per portion
                            perPortionPrice: this.day_four_price,
                            // Time slot
                            timeSlot: this.day_four_slot,
                            // Total price
                            totalPrice: this.total_day_four_price
                          };
                        }else {
                          if ((this.allOrders['day_four'] != null)) {
                            day_four = this.allOrders['day_four'];
                          }else {
                            day_four = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_four'] != null)) {
                          day_four = this.allOrders['day_four'];
                        }else {
                          day_four = null;
                        }
                      }
                      // If day five's items are active
                      if (this.num_day_five_items > 0) {
                        if (this.day_five_c_books.length > 4) {
                          day_five = {
                            // Get Date
                            date: this.p_day_five,
                            // Raw date for reports
                            rawDate : this.day_five,
                            // Get the booked menu
                            menu: this.day_five_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_five_items,
                            // Price per portion
                            perPortionPrice: this.day_five_price,
                            // Time slot
                            timeSlot: this.day_five_slot,
                            // Total price
                            totalPrice: this.total_day_five_price
                          };
                        }else {
                          if ((this.allOrders['day_five'] != null)) {
                            day_five = this.allOrders['day_five'];
                          }else {
                            day_five = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_five'] != null)) {
                          day_five = this.allOrders['day_five'];
                        }else {
                          day_five = null;
                        }
                      }
                      switch (true) {
                        case this.today_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_one_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_two_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_three_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_four_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_five_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        default:
                          break;
                      }
                      this.allOrders = {
                        day_one: day_one,
                        day_two: day_two,
                        day_three: day_three,
                        day_four: day_four,
                        day_five: day_five,
                      };
                      localStorage.setItem('all_orders', JSON.stringify(this.allOrders));
                      this.hover_alert = 'Added !';
                      $('.added-db').css({'display': 'flex'});
                      setTimeout(function() {
                        $('.added-db').css({'display': 'none'});
                      }, 3000);
                    }else {
                      this.hover_alert = 'Please select one Base item';
                      $('.added-db').css({'display': 'flex'});
                      setTimeout(function() {
                        $('.added-db').css({'display': 'none'});
                      }, 3000);
                    }
            }
          }
        break;
      case this.day_four_status:
            if (this.day_four_c_books.length < 5) {
              this.hover_alert = 'Please choose at least four';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              if (this.day_four_slot === undefined || this.day_four_slot === null) {
                //  Show error
                $('.slot-select').css({'border-color': '#fa0000'});
                this.hover_alert = 'Please Select Delivery Slot';
                $('.added-db').css({'display': 'flex'});
                setTimeout(function() {
                  $('.added-db').css({'display': 'none'});
                }, 3000);
              }else {
              let day_four_check = false;
              this.day_four_c_books.forEach(element => {
                if (element.sub_name === 'Base') {
                  day_four_check = true;
                }
              });
              if (day_four_check) {
              $('.slot-select').css({'border-color': '#666'});
              let day_one: object, day_two: object, day_three: object, day_four: object, day_five: object;
                      // If day one's items are active
                      if (this.num_day_one_items > 0) {
                        if (this.day_one_c_books.length > 4) {
                          day_one = {
                            // Get Date
                            date: this.p_day_one,
                            // Raw date for reports
                            rawDate : this.day_one,
                            // Get the booked menu
                            menu: this.day_one_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_one_items,
                            // Price per portion
                            perPortionPrice: this.day_one_price,
                            // Time slot
                            timeSlot: this.day_one_slot,
                            // Total price
                            totalPrice: this.total_day_one_price
                          };
                        }else {
                          if ((this.allOrders['day_one'] != null)) {
                            day_one = this.allOrders['day_one'];
                          }else {
                            day_one = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_one'] != null)) {
                          day_one = this.allOrders['day_one'];
                        }else {
                          day_one = null;
                        }
                      }
                      // If day two's items are active
                      if (this.num_day_two_items > 0) {
                        if (this.day_two_c_books.length > 4) {
                          day_two = {
                            // Get Date
                            date: this.p_day_two,
                            // Raw date for reports
                            rawDate: this.day_two,
                            // Get the booked menu
                            menu: this.day_two_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_two_items,
                            // Price per portion
                            perPortionPrice: this.day_two_price,
                            // Time slot
                            timeSlot: this.day_two_slot,
                            // Total price
                            totalPrice: this.total_day_two_price
                          };
                        }else {
                          if ((this.allOrders['day_two'] != null)) {
                            day_two = this.allOrders['day_two'];
                          }else {
                            day_two = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_two'] != null)) {
                          day_two = this.allOrders['day_two'];
                        }else {
                          day_two = null;
                        }
                      }
                      // If day three's items are active
                      if (this.num_day_three_items > 0) {
                        if (this.day_three_c_books.length > 4) {
                          day_three = {
                            // Get Date
                            date: this.p_day_three,
                            // Raw date for reports
                            rawDate: this.day_three,
                            // Get the booked menu
                            menu: this.day_three_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_three_items,
                            // Price per portion
                            perPortionPrice: this.day_three_price,
                            // Time slot
                            timeSlot: this.day_three_slot,
                            // Total price
                            totalPrice: this.total_day_three_price
                          };
                        } else {
                          if ((this.allOrders['day_three'] != null)) {
                            day_three = this.allOrders['day_three'];
                          }else {
                            day_three = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_three'] != null)) {
                          day_three = this.allOrders['day_three'];
                        }else {
                          day_three = null;
                        }
                      }
                      // If day four's items are active
                      if (this.num_day_four_items > 0) {
                        if (this.day_four_c_books.length > 4) {
                          day_four = {
                            // Get Date
                            date: this.p_day_four,
                            // Raw date for reports
                            rawDate: this.day_four,
                            // Get the booked menu
                            menu: this.day_four_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_four_items,
                            // Price per portion
                            perPortionPrice: this.day_four_price,
                            // Time slot
                            timeSlot: this.day_four_slot,
                            // Total price
                            totalPrice: this.total_day_four_price
                          };
                        }else {
                          if ((this.allOrders['day_four'] != null)) {
                            day_four = null;
                          }else {
                            day_four = this.allOrders['day_four'];
                          }
                        }
                      } else {
                        if ((this.allOrders['day_four'] != null)) {
                          day_four = null;
                        }else {
                          day_four = this.allOrders['day_four'];
                        }
                      }
                      if (this.num_day_five_items > 0) {
                        if (this.day_five_c_books.length > 4) {
                          day_five = {
                            date: this.p_day_five,
                            rawDate : this.day_five,
                            menu: this.day_five_c_books,
                            numOfTimes: this.num_day_five_items,
                            perPortionPrice: this.day_five_price,
                            timeSlot: this.day_five_slot,
                            totalPrice: this.total_day_five_price
                          };
                        }else {
                          if ((this.allOrders['day_five'] != null)) {
                            day_five = this.allOrders['day_five'];
                          }else {
                            day_five = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_five'] != null)) {
                          day_five = this.allOrders['day_five'];
                        }else {
                          day_five = null;
                        }
                      }
                      switch (true) {
                        case this.today_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_one_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_two_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_three_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_four_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_five_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        default:
                          break;
                      }
                      this.allOrders = {
                        day_one: day_one,
                        day_two: day_two,
                        day_three: day_three,
                        day_four: day_four,
                        day_five: day_five,
                      };
                      localStorage.setItem('all_orders', JSON.stringify(this.allOrders));
                      this.hover_alert = 'Added !';
                      $('.added-db').css({'display': 'flex'});
                      setTimeout(function() {
                        $('.added-db').css({'display': 'none'});
                      }, 3000);

                    } else {
                      this.hover_alert = 'Please select one Base Item';
                      $('.added-db').css({'display': 'flex'});
                      setTimeout(function() {
                        $('.added-db').css({'display': 'none'});
                      }, 3000);
                  }
            }
          }
        break;
      case this.day_five_status:
            if (this.day_five_c_books.length < 5) {
              this.hover_alert = 'Please choose at least four';
              $('.added-db').css({'display': 'flex'});
              setTimeout(function() {
                $('.added-db').css({'display': 'none'});
              }, 3000);
            }else {
              if (this.day_five_slot === undefined || this.day_five_slot === null) {
                //  Show error
                $('.slot-select').css({'border-color': '#fa0000'});
                this.hover_alert = 'Please Select Delivery Slot';
                $('.added-db').css({'display': 'flex'});
                setTimeout(function() {
                  $('.added-db').css({'display': 'none'});
                }, 3000);
              }else {
                let day_five_check = false;
                this.day_five_c_books.forEach(element => {
                  if (element.sub_name === 'Base') {
                    day_five_check = true;
                  }
                });
                if (day_five_check) {
                $('.slot-select').css({'border-color': '#666'});
                let day_one: object, day_two: object, day_three: object, day_four: object, day_five: object;
                      if (this.num_day_one_items > 0) {
                        if (this.day_one_c_books.length > 4) {
                          day_one = {
                            date: this.p_day_one,
                            rawDate : this.day_one,
                            menu: this.day_one_c_books,
                            numOfTimes: this.num_day_one_items,
                            perPortionPrice: this.day_one_price,
                            timeSlot: this.day_one_slot,
                            totalPrice: this.total_day_one_price
                          };
                        }else {
                          if ((this.allOrders['day_one'] != null)) {
                            day_one = this.allOrders['day_one'];
                          }else {
                            day_one = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_one'] != null)) {
                          day_one = this.allOrders['day_one'];
                        }else {
                          day_one = null;
                        }
                      }
                      if (this.num_day_two_items > 0) {
                        if (this.day_two_c_books.length > 4) {
                          day_two = {
                            date: this.p_day_two,
                            rawDate: this.day_two,
                            menu: this.day_two_c_books,
                            numOfTimes: this.num_day_two_items,
                            perPortionPrice: this.day_two_price,
                            timeSlot: this.day_two_slot,
                            totalPrice: this.total_day_two_price
                          };
                        }else {
                          if ((this.allOrders['day_two'] != null)) {
                            day_two = this.allOrders['day_two'];
                          }else {
                            day_two = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_two'] != null)) {
                          day_two = this.allOrders['day_two'];
                        }else {
                          day_two = null;
                        }
                      }
                      if (this.num_day_three_items > 0) {
                        if (this.day_three_c_books.length > 4) {
                          day_three = {
                            date: this.p_day_three,
                            rawDate: this.day_three,
                            menu: this.day_three_c_books,
                            numOfTimes: this.num_day_three_items,
                            perPortionPrice: this.day_three_price,
                            timeSlot: this.day_three_slot,
                            totalPrice: this.total_day_three_price
                          };
                        } else {
                          if ((this.allOrders['day_three'] != null)) {
                            day_three = this.allOrders['day_three'];
                          }else {
                            day_three = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_three'] != null)) {
                          day_three = this.allOrders['day_three'];
                        }else {
                          day_three = null;
                        }
                      }
                      // If day four's items are active
                      if (this.num_day_four_items > 0) {
                        if (this.day_four_c_books.length > 4) {
                          day_four = {
                            // Get Date
                            date: this.p_day_four,
                            // Raw date for reports
                            rawDate: this.day_four,
                            // Get the booked menu
                            menu: this.day_four_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_four_items,
                            // Price per portion
                            perPortionPrice: this.day_four_price,
                            // Time slot
                            timeSlot: this.day_four_slot,
                            // Total price
                            totalPrice: this.total_day_four_price
                          };
                        }else {
                          if ((this.allOrders['day_four'] != null)) {
                            day_four = this.allOrders['day_four'];
                          }else {
                            day_four = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_four'] != null)) {
                          day_four = this.allOrders['day_four'];
                        }else {
                          day_four = null;
                        }
                      }
                      // If day five's items are active
                      if (this.num_day_five_items > 0) {
                        if (this.day_five_c_books.length > 4) {
                          day_five = {
                            // Get Date
                            date: this.p_day_five,
                            // Raw date for reports
                            rawDate : this.day_five,
                            // Get the booked menu
                            menu: this.day_five_c_books,
                            // Get the number of times menu has been booked
                            numOfTimes: this.num_day_five_items,
                            // Price per portion
                            perPortionPrice: this.day_five_price,
                            // Time slot
                            timeSlot: this.day_five_slot,
                            // Total price
                            totalPrice: this.total_day_five_price
                          };
                        }else {
                          if ((this.allOrders['day_five'] != null)) {
                            day_five = this.allOrders['day_five'];
                          }else {
                            day_five = null;
                          }
                        }
                      } else {
                        if ((this.allOrders['day_five'] != null)) {
                          day_five = this.allOrders['day_five'];
                        }else {
                          day_five = null;
                        }
                      }
                      switch (true) {
                        case this.today_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_one_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_two_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_three_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_four_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        case this.day_five_status:
                          this.basketNumber++;
                          this.appComponent.basket_num = this.basketNumber;
                          localStorage.setItem('basket_number', this.basketNumber.toString());
                          break;
                        default:
                          break;
                      }
                      this.allOrders = {
                        day_one: day_one,
                        day_two: day_two,
                        day_three: day_three,
                        day_four: day_four,
                        day_five: day_five,
                      };
                      localStorage.setItem('all_orders', JSON.stringify(this.allOrders));
                      this.hover_alert = 'Added !';
                      $('.added-db').css({'display': 'flex'});
                      setTimeout(function() {
                        $('.added-db').css({'display': 'none'});
                      }, 3000);

                    }else {
                      this.hover_alert = 'Please select one Base Item';
                      $('.added-db').css({'display': 'flex'});
                      setTimeout(function() {
                        $('.added-db').css({'display': 'none'});
                      }, 3000);
                  }
            }
          }
        break;

      default:
        break;
    }
  }
  scClose() {
    $('.schedule-menu-back').css({ 'display': 'none' });
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/home']);
    return false;
  }
  schMenuBtn() {
    if (this.authService.loggedIn() === true) {
      this.place_holder_price = this.total_today_price;
      this.loadDay(this.day_one, 'btn_clicked');
      this.day_one_status = true;
      this.day_two_status = false;
      this.day_three_status = false;
      this.day_four_status = false;
      this.day_five_status = false;
      this.day_six_status = false;

      $('.schedule-menu-back').css({ 'display': 'flex' });
      $('.schedule-choose-core').show();

    }else {
      this.appComponent.loginSignupTrigger();
    }


  }
  slotSelected(event) {
    const slot = event.target.value;
    this.day_one_slot = slot;
    this.day_two_slot = slot;
    this.day_three_slot = slot;
    this.day_four_slot = slot;
    this.day_five_slot = slot;
    $('.slot-select').css({'border-color': '#b2b2b2'});
  }
  todayMenuSlotSelect(event) {
    $('#t-menu-select-slot').css({'border-color': 'rgba(0,0,0,.2)'});
    const tslot = event.target.value;
    // this.today_slot = tslot;
    switch (true) {
      case this.tab_one_status:
          this.today_tab_one_slot = event.target.value;
        break;
        case this.tab_two_status:
          this.today_tab_two_slot = event.target.value;
        break;
        case this.tab_three_status:
          this.today_tab_three_slot = event.target.value;
        break;
      default:
        break;
    }
  }
  todayMenuTimesSelect(event) {
    switch (true) {
      case this.tab_one_status:
        this.num_tab_one_items = event.target.value;
        break;
      case this.tab_two_status:
        this.num_tab_two_items = event.target.value;

        break;
        case this.tab_three_status:
        this.num_tab_three_items = event.target.value;

        break;
      default:
        break;
    }
  }
  todayAdd(tab) {
    // check if user is loggedIn
    if (this.authService.loggedIn() === true) {
      $('.today-menu-back').css('display', 'flex');
      // Reset dropdowns in today-menu tab
      $('#t-menu-select-slot').prop('selectedIndex', 0);
      $('#t-menu-select-times').prop('selectedIndex', 0);
      switch (tab) {
        case 'tab_one':
          this.tab_two_status = false;
          this.tab_three_status = false;
          this.tab_one_status = true;
          // Updating tab item number
          this.num_tab_one_items = 1;
          break;
          case 'tab_two':
          this.tab_three_status = false;
          this.tab_one_status = false;
          this.tab_two_status = true;
          this.num_tab_two_items = 1;
          break;
          case 'tab_three':
          this.tab_two_status = false;
          this.tab_one_status = false;
          this.tab_three_status = true;
          this.num_tab_three_items = 1;
          break;
        default:
          break;
      }
    }else {
      // propmt to login
      this.appComponent.loginSignupTrigger();
    }

  }
  addTodayCartClicked() {
    $('#t-menu-select-slot').css({'border-color': 'rgba(0,0,0,.2)'});
    switch (true) {
      case this.tab_one_status:
        if (this.today_tab_one_slot !== null && this.today_tab_one_slot !== undefined) {
          this.tab_one_total_price = this.num_tab_one_items * this.tab_one_cost;
          const previous_tab_status = this.today_tab_one_books;
          // Add to orders
          this.today_tab_one_books = {
            name: this.tab_one,
            time_slot: this.today_tab_one_slot,
            num_of_items: this.num_tab_one_items,
            base_price: this.tab_one_cost,
            total_price: this.tab_one_total_price
          };
          if (previous_tab_status === undefined) {
            this.basketNumber++;
            this.appComponent.basket_num = this.basketNumber;
            localStorage.setItem('basket_number', this.basketNumber.toString());
          }
          // add announcement
          // Update tab_one_text and display
          this.num_tab_one = this.num_tab_one_items;
          $('#tab-one-band').show();
          // Show tab remove btn
          $('#rem-t-tab_one').show();

          const today_orders = {
            date: this.p_today_one,
            tab_one: this.today_tab_one_books,
            tab_two: this.today_tab_two_books,
            tab_three: this.today_tab_three_books
          };
          localStorage.setItem('today_orders', JSON.stringify(today_orders));
          $('.today-menu-back').hide();
          this.today_tab_one_slot = null;
          this.today_tab_two_slot = null;
          this.today_tab_three_slot = null;
        }else {
          // Do nothing
          this.today_tab_one_books = undefined;
          $('.today-core #t-menu-select-slot').css({'border-color': '#fa0000'});
        }
        break;
      case this.tab_two_status:
        if (this.today_tab_two_slot !== null && this.today_tab_two_slot !== undefined) {

          this.tab_two_total_price = this.num_tab_two_items * this.tab_two_cost;
          const previous_tab_status = this.today_tab_two_books;

          // Add to orders
          this.today_tab_two_books = {
            name: this.tab_two,
            time_slot: this.today_tab_two_slot,
            num_of_items: this.num_tab_two_items,
            base_price: this.tab_two_cost,
            total_price: this.tab_two_total_price
          };
          if (previous_tab_status === undefined) {
            this.basketNumber++;
            this.appComponent.basket_num = this.basketNumber;
            localStorage.setItem('basket_number', this.basketNumber.toString());
          }
          // Update tab_two_text and display
          this.num_tab_two = this.num_tab_two_items;
          $('#tab-two-band').show();
          // Show tab remove btn
          $('#rem-t-tab_two').show();

          const today_orders = {
            date: this.p_today_one,
            tab_one: this.today_tab_one_books,
            tab_two: this.today_tab_two_books,
            tab_three: this.today_tab_three_books
          };
          localStorage.setItem('today_orders', JSON.stringify(today_orders));
          $('.today-menu-back').hide();
          this.today_tab_one_slot = null;
          this.today_tab_two_slot = null;
          this.today_tab_three_slot = null;

        }else {
          // Do nothing
          this.today_tab_two_books = undefined;
          $('#t-menu-select-slot').css({'border-color': '#fa0000'});
        }
        break;
      case this.tab_three_status:
        if (this.today_tab_three_slot !== null && this.today_tab_three_slot !== undefined) {

          this.tab_three_total_price = this.num_tab_three_items * this.tab_three_cost;
          const previous_tab_status = this.today_tab_three_books;
          // Add to orders
          this.today_tab_three_books = {
            name: this.tab_three,
            time_slot: this.today_tab_three_slot,
            num_of_items: this.num_tab_three_items,
            base_price: this.tab_three_cost,
            total_price: this.tab_three_total_price
          };
          if (previous_tab_status === undefined) {
            this.basketNumber++;
            this.appComponent.basket_num = this.basketNumber;
            localStorage.setItem('basket_number', this.basketNumber.toString());
          }
          // Update tab three text and display band
          this.num_tab_three = this.num_tab_three_items;
          $('#tab-three-band').show();
          // Show tab remove btn
          $('#rem-t-tab_three').show();

          const today_orders = {
            date: this.p_today_one,
            tab_one: this.today_tab_one_books,
            tab_two: this.today_tab_two_books,
            tab_three: this.today_tab_three_books
          };
          localStorage.setItem('today_orders', JSON.stringify(today_orders));
          $('.today-menu-back').hide();
          this.today_tab_one_slot = null;
          this.today_tab_two_slot = null;
          this.today_tab_three_slot = null;
        }else {
          // Do nothing
          this.today_tab_three_books = undefined;
          $('#t-menu-select-slot').css({'border-color': '#fa0000'});
        }
        break;
      default:
        break;
    }

  }
  removeTodayTab(tab) {
    switch (tab) {
      case 'tab_one':
        this.today_tab_one_books = null;
        $('#tab-one-band').hide();
        $('#rem-t-tab_one').hide();
        this.basketNumber--;
        this.appComponent.basket_num = this.basketNumber;
        localStorage.setItem('basket_number', this.basketNumber.toString());
        break;
      case 'tab_two':
        this.today_tab_two_books = null;
        $('#tab-two-band').hide();
        $('#rem-t-tab_two').hide();
        this.basketNumber--;
        this.appComponent.basket_num = this.basketNumber;
        localStorage.setItem('basket_number', this.basketNumber.toString());
        break;
      case 'tab_three':
        this.today_tab_three_books = null;
        $('#tab-three-band').hide();
        $('#rem-t-tab_three').hide();
        this.basketNumber--;
        this.appComponent.basket_num = this.basketNumber;
        localStorage.setItem('basket_number', this.basketNumber.toString());
        break;
      default:
        break;
    }
    const today_orders = {
      date: this.p_today_one,
      tab_one: this.today_tab_one_books,
      tab_two: this.today_tab_two_books,
      tab_three: this.today_tab_three_books
    };
    localStorage.setItem('today_orders', JSON.stringify(today_orders));
  }
  tdClose() {
    $('.today-menu-back').hide();
    $('#t-menu-select-slot').css({'border-color': 'rgba(0,0,0,.2)'});
    this.num_tab_one_items = 0;
    this.num_tab_two_items = 0;
    this.num_tab_three_items = 0;
    this.today_tab_one_slot = null;
    this.today_tab_two_slot = null;
    this.today_tab_three_slot = null;
  }
  navToChekout() {
    // if basket number is atleast one
    if (this.basketNumber > 0) {
      localStorage.setItem('basket_number', this.basketNumber.toString());
      this.router.navigate(['/checkout']);
    }
  }
  schHoverClose() {
    $('.sch-hover-menu-back').hide();
  }
}
