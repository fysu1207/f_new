import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  locationEntry: string = null;
  location = {};
  lat: number;
  long: number;
  address: string;
  userEmail: string;
  userName: string;
  fullName: string;
  companyName: string;
  userMobile: string;
  userId: string;

  basket_num: number;

  display_error = 'We are currently delivering to companies in and around Madhapur, Hyderabad';


  constructor(private router: Router, private title: Title, private appComponent: AppComponent, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    // tslint:disable-next-line:radix
    this.basket_num = parseInt(localStorage.getItem('basket_number'));
    if (this.basket_num === undefined || this.basket_num === null || this.basket_num === 0 || isNaN(this.basket_num) === true) {
      this.basket_num = 0;
    }else {
    }

    if (this.authService.loggedIn()) {

      const user = this.authService.getUserFromLocal();
      const user_parsed = JSON.parse(user);
      this.userEmail = user_parsed.email;
      this.fullName = user_parsed.name;
      this.companyName = user_parsed.company_name;
      this.userMobile = user_parsed.mobile;
      this.userId = user_parsed.id;
      const fLength = this.fullName.split(' ');

      if (fLength.length > 1) {
        this.userName = this.fullName.split(' ').slice(0, -(this.fullName.split(' ').length - 1)).join(' ');
      }else {
        this.userName = this.fullName;
      }

      if (this.userName === undefined || this.userName === null || this.userName === '') {
        this.userName  = this.appComponent.uName;
      }
    }else {
    }
    // Set title
    this.title.setTitle('Fysu | Office Lunch Redefined - Be ready with SPOON and PEN | Madhapur, Hyderabad');
    $(window).on('scroll', function () {
      const scrollTop = $(this).scrollTop();
      $('.location-input-scrolltop-helper').each(function () {
        const topDistance = $(this).offset().top;
        if ((topDistance + 80) < scrollTop) {
          $('.scroll-header').css({ 'top': '0' });
          $('.mob-main-header').css({ 'background-color': 'rgba(0,0,0,1)' });
        } else {
          $('.scroll-header').css({ 'top': '-100px' });
          $('.mob-main-header').css({ 'background-color': 'rgba(0,0,0,1)'});
          $('.scroll-header .dropdown').removeClass('open');
        }
      });
    });
    $('.location-search-input').focus(function() {
      $('.location-warning-div').hide();
    });
  }
  public gotoHowitWorks() {
    $('html, body').animate({ scrollTop: $('.how-it-works-div').offset().top - 70 }, 1000);
  }
  gotoConcept() {
    $('html, body').animate({ scrollTop: $('.concept-div').offset().top - 70 }, 1000);
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }
  public geoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        if (this.location === undefined || this.location === null) {
        } else {
          this.authService.getLocation(this.lat, this.long).subscribe(res => {
            this.address = res.results[0].formatted_address;
            this.locationEntry = this.address;
            if (this.address.includes('Madhapur')) {
              // this.give_menu_permission = true;
              localStorage.setItem('home_address', this.address);
              // Add to user's address if he is logged in
              if (this.authService.loggedIn()) {
                // User is logged in
                // send this address to save
                const address = {
                  user_id: this.userId,
                  address: this.address
                };
                this.authService.saveAddress(address).subscribe(rres => {
                  if (rres.success) {
                    // Address saved
                    console.log(rres);
                  } else {
                    // Address not saved
                    if (rres.msg = 'exists') {
                      // address already exists
                    } else {
                    }
                  }
                });
              } else {
                // Not logged in
              }
              // Add to input box
              // $('.location-search-input').val(this.address);
              this.locationEntry = this.address;
              // this.router.navigate(['/menu']);
            } else {
              // Add to user's address if he is logged in
              this.locationEntry = this.address;
              this.display_error = 'We are currently delivering to companies in and around Madhapur, Hyderabad';
              $('.location-warning-div').show();
              $('#scroll-head-err').css({'display' : 'flex'});
              setTimeout(() => {
                $('#scroll-head-err').hide();
              }, 3000);
            }
          });
        }
      });
    }

  }

  seeMenu() {
    // Address in this.locationEntry
    if (this.authService.loggedIn()) {
      this.authService.getUserAddressses(this.userId).subscribe(res => {
        if (res.success) {
          if (res.msg[0].address.length > 0) {
            console.log('one address');
            this.router.navigate(['/menu']);
          }else {
            this.geoLocate();
          }
        }
      });
      // tslint:disable-next-line:max-line-length
      if (this.locationEntry.includes('Madhapur') || this.locationEntry.includes('madhapur') || this.locationEntry === 'Madhapur' || this.locationEntry === 'madhapur' || this.locationEntry === 'Madapur' || this.locationEntry === 'madapur' || this.locationEntry.includes('Madapur') || this.locationEntry.includes('madapur')) {
        localStorage.setItem('home_address', this.locationEntry);
        // Add to user's address if he is logged in
        if (this.authService.loggedIn()) {
          // User is logged in
          // send this address to save
          const address = {
            user_id: this.userId,
            address: this.locationEntry
          };
          this.authService.saveAddress(address).subscribe(res => {
            if (res.success) {
              // Address saved
              console.log(res);
            } else {
              // Address not saved
              if (res.msg = 'exists') {
                // address already exists
              } else {
                // console.log(res);
              }
            }
          });
          this.router.navigate(['/menu']);
        } else {
          // Navigate to menu
          // this.appComponent.loginSignupTrigger();
          this.router.navigate(['/menu']);
        }
      } else {
        this.locationEntry = this.address;
        this.display_error = 'Please enter your delivery location to view menu.';
        $('.location-warning-div').show();
        $('#scroll-head-err').css({'display' : 'flex'});
        setTimeout(() => {
          $('#scroll-head-err').hide();
        }, 3000);
        // Remove later
        // this.router.navigate(['/menu']);
      }
    }else {
      if (this.locationEntry !== undefined && this.locationEntry !== null && this.locationEntry !== '') {
        // tslint:disable-next-line:max-line-length
        if (this.locationEntry.includes('Madhapur') || this.locationEntry.includes('madhapur') || this.locationEntry === 'Madhapur' || this.locationEntry === 'madhapur' || this.locationEntry === 'Madapur' || this.locationEntry === 'madapur' || this.locationEntry.includes('Madapur') || this.locationEntry.includes('madapur') ) {
          localStorage.setItem('home_address', this.locationEntry);
          // Add to user's address if he is logged in
          if (this.authService.loggedIn()) {
            // User is logged in
            // send this address to save
            const address = {
              user_id: this.userId,
              address: this.locationEntry
            };
            this.authService.saveAddress(address).subscribe(res => {
              if (res.success) {
                // Address saved
                console.log(res);
              } else {
                // Address not saved
                if (res.msg = 'exists') {
                  // address already exists
                } else {
                  // console.log(res);
                }
              }
            });
            this.router.navigate(['/menu']);
          } else {
            // Navigate to menu
            // this.appComponent.loginSignupTrigger();
            this.router.navigate(['/menu']);

          }
        } else {
          this.locationEntry = this.address;
          this.display_error = 'We are currently delivering to companies in and around Madhapur, Hyderabad';
          $('.location-warning-div').show();
          $('#scroll-head-err').css({'display' : 'flex'});
          setTimeout(() => {
            $('#scroll-head-err').hide();
          }, 3000);

          // Remove later
          this.router.navigate(['/menu']);
        }
      }else {
          if (this.locationEntry === null || this.locationEntry === undefined || this.locationEntry === '') {
            // Show Error
            this.display_error = 'Please enter your delivery location to view menu.';
            $('.location-warning-div').show();
            $('#scroll-head-err').css({'display' : 'flex'});
            setTimeout(() => {
              $('#scroll-head-err').hide();
            }, 3000);
          }
          // this.appComponent.loginSignupTrigger();
      }
    }


  }

  pageScrollTop() {
    $('html, body').animate({ scrollTop: $('html').offset().top }, 1000);
  }
  locationKeyPress(event) {
    if (event.keyCode === 13) {
      this.seeMenu();
    }
  }

}
