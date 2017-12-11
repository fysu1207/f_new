import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
declare var $: any;


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css', '../settings/settings.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private title: Title, private authService: AuthService, private router: Router) { }

  addresses = [];
  userId: string;
  userEmail: string;
  userName: string;
  companyName: string;
  userMobile: number;

  locationEntry: string;
  location = {};
  lat: number;
  long: number;
  address: string;
  original_address: string;
  placeholder_address: string;

  // addressDeleted = false;

  ngOnInit() {
    // Set title
    this.title.setTitle('Settings: Address');
    const user = this.authService.getUserFromLocal();
    const user_parsed = JSON.parse(user);
    this.userEmail = user_parsed.email;
    this.userName = user_parsed.name;
    this.companyName = user_parsed.company_name;
    this.userMobile = user_parsed.mobile;
    this.userId = user_parsed.id;
    // Get addresses
    this.authService.getUserAddressses(this.userId).subscribe(res => {
      if (res.success) {
        this.addresses = res.msg[0].address;
        console.log(res.msg);
      }else {
        console.log('err');
      }
    });
    $('.mob-menu-trig-btn').click(function(){
      const mob_menu_offest = $('.mob-menu').offset().left;
      if (mob_menu_offest < 0) {
          $('.mob-menu').animate({'left': '0vw'}, 200);
      }else {
          $('.mob-menu').animate({'left': '-50vw' }, 200);
      }
    });
    $('.mob-menu li').click(function() {
      $('.mob-menu').animate({'left': '-50vw' }, 200);
    });

  }

  editAddress(i, address) {
    this.original_address = address;
    this.placeholder_address = address;
    $('.db').css({'display': 'flex'});
  }

  addressDelete(event, ad) {
    const address = {
      user_id: this.userId,
      address: ad
    };
    this.authService.deleteAddress(address).subscribe(res => {
        if (res.success) {
          window.location.reload();
        }else {
          console.log('Something went wrong');
        }
    });
  }

  geoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        if (this.lat === undefined) {
        } else {
          this.authService.getLocation(this.lat, this.long).subscribe(res => {
            this.address = res.results[0].formatted_address;
                const address = {
                  user_id: this.userId,
                  address: this.address
                };
                this.authService.saveAddress(address).subscribe(ress => {
                  if (ress.success) {
                    window.location.reload();
                  } else {
                    if (ress.msg = 'exists') {
                    } else {
                      console.log(ress);
                    }
                  }
                });
          });
        }
      });
    }

  }

  closeUpAddress() {
    $('.db').css({'display': 'none'});
  }
  updateAddress() {
    // alert('fd');
    const addresses = {
      user_id: this.userId,
      original : this.original_address,
      edited : this.placeholder_address
    };
    this.authService.updateAddress(addresses).subscribe(res => {
      if (res.success) {
        window.location.reload();
      }else {
        console.log(res.msg);
      }
    });
  }
}
