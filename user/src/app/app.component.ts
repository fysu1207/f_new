import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { Http } from '@angular/http';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public locationEntry: string;
  public location = {};
  public lat: number;
  public long: number;
  public initialLoginInput: string;
  public regNameInput: string;
  public regComNameInput: string;
  public regEmailInput: string;
  public regMobileInput: string;
  public regPwdInput: string;
  public regOTPInput: string;
  today_one = moment();
  dateForHeader: string;
  public loginEmailInput: string;
  public loginPasswordInput: string;
  public user: object;
  address: string;
  public uName: string;
  public basket_num = 0;
  isInputEmail = false;
  isInputMobile = false;
  fpOtpInput: string;
  fpNewPwd: string;
  cfpNewPwd: string;
  mobileNumForfp: string;
  signUpResendTime: number;
  resendotpinterval;
  fpresendotpInterval;
  sretryOtp;
  fpretryOtp;
  otptrigTimeout;
  fptrigTimeout;
  // tslint:disable-next-line:max-line-length
  constructor(private title: Title, private router: Router, private validate: ValidateService, public authService: AuthService, private http: Http, private datePipe: DatePipe) { }
  ngOnInit() {
    this.title.setTitle('Home');
    this.dateForHeader = this.datePipe.transform(this.today_one, 'EEE, MMM d');
      $('.mob-menu-trig-btn').click(function(){
        const mob_menu_offest = $('.mob-menu').offset().left;
        if (mob_menu_offest < 0) {
            // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'50vw' },200);
            $('.mob-menu').animate({'left': '0vw'}, 200);
            $('.mob-db').show();
        }else {
            // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'0vw' },200);
            $('.mob-menu').animate({'left': '-50vw' }, 200);
            $('.mob-db').hide();
        }
      });
      $('.mob-menu').click(function() {
        const mob_menu_offest = $('.mob-menu').offset().left;
        if (mob_menu_offest < 0) {
            // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'50vw' },200);
            $('.mob-menu').animate({'left': '0vw'}, 200);
            $('.mob-db').show();
        }else {
            // $('.fvp, .svp, .main-footer,.checkout-main-container').animate({'margin-left':'0vw' },200);
            $('.mob-menu').animate({'left': '-50vw' }, 200);
            $('.mob-db').hide();
        }
      });
      $('.mob-db').click(function() {
        $('.mob-menu').animate({'left': '-50vw' }, 200);
        $('.mob-db').hide();
      });
    // tslint:disable-next-line:radix
    this.basket_num = parseInt(localStorage.getItem('basket_number'));
    if (this.basket_num === undefined || this.basket_num == null || this.basket_num === 0 || isNaN(this.basket_num) === true) {
      // redirect to menu
      this.basket_num = 0;
    }else {
      // this.basket_num;
    }
    $('.fixed-dark-cover input').keydown(function(){
      $(this).css({'border-color' : '#b2b2b2'});
    });
    $(document).keydown(function(e) {

      switch (e.which) {
        case 13:
          switch (true) {
            case $('#login-fixed-dark-cover').is(':visible'):
              $('#continue-btn').trigger('click');
              break;
            case $('#next-reg-fixed-dark-cover').is(':visible'):
              if ($('#reg-otp').val()) {
                // trigger sign-up btn
                $('#signup-btn').trigger('click');
              }else {
                // Trigger otp btn
                $('#otp-btn').trigger('click');
              }
              break;
            case $('#next-login-fixed-dark-cover').is(':visible'):
                $('#login-btn').trigger('click');
              break;
            default:
              break;
          }
          break;
        case 27:
          this.mainClose();
          break;
        default:
          break;
      }
    });
  }
  checkAndClose() {
    if (!$(event.target).closest('.email-input-div').length) {
      if ($('.email-input-div').is(':visible')) {
          $('.fixed-dark-cover').hide();
      }
    }
  }
  closeMobMenu() {
    $('.mob-menu').animate({'left': '-50vw' }, 200);
  }
  // On clicking login/signup
  public loginSignupTrigger() {
    // resetting all the variables
    this.regNameInput = null;
    this.regComNameInput = null;
    this.regEmailInput = null;
    this.regMobileInput = null;
    this.regPwdInput = null;
    this.regOTPInput = null;
    this.fpOtpInput = null;
    this.fpNewPwd = null;
    this.cfpNewPwd = null;
    this.mobileNumForfp = null;
    this.closeMobMenu();
    $('.err').html('');
    $('.fixed-dark-cover').hide();
    $('.fixed-dark-cover input').css({'border-color': '#b2b2b2'});
    $('#login-fixed-dark-cover').css({ 'display': 'flex' });
    $('.initial-login-input').focus();
    $('#email').keyup(function(){
      const input = $(this).val();
      // let input = this.initialLoginInput;
      if (input.length > 2) {
        // Validate
        if (input === undefined || input === null || input === '') {
          $('#continue-btn').css({'background-color': '#b2b2b2'});
        }else {
          // tslint:disable-next-line:max-line-length
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(input)) {
            $('#continue-btn').css({'background-color': '#6DA942'});
          }else {
            if (/^\d{10}$/.test(input)) {
              $('#continue-btn').css({'background-color': '#6DA942'});
            }else {
              $('#continue-btn').css({'background-color': '#b2b2b2'});
            }
          }
        }
      }else {
        $('#continue-btn').css({'background-color': '#b2b2b2'});
      }

    });
  }
  // On clicking continue in first login/signup slide
  public firstConClick(input: string) {
    input = input.toLowerCase();
    $('.err').html('');
    if (this.validate.validateInput(input)) {
      if (this.validate.validateEmail(input)) {
        $('.fixed-dark-cover').hide();
        this.authService.authenticateEmail(input).subscribe(data => {
          if (data.success) {
            this.loginEmailInput = this.initialLoginInput;
            this.isInputEmail = true;
            $('#next-login-fixed-dark-cover').css({ 'display': 'flex' });
            this.loginEmailInput = this.initialLoginInput;
            $('#login-password').focus();
            $('#login-password').keyup(function(e){
              const inp = $(this).val();
              if (inp.length > 5) {
                $('#login-btn').css({'background-color': '#6DA942'});
              }else {
                $('#login-btn').css({'background-color': '#b2b2b2'});
              }
            });
          }else {
            $('#next-reg-fixed-dark-cover').css({ 'display': 'flex' });
            $('#reg-name').focus();
            this.regEmailInput = this.initialLoginInput;
            $('#reg-email').val(this.initialLoginInput);
            $('#next-reg-fixed-dark-cover').keyup(function(e) {
              const regname = $('#reg-name').val();
              const regemail = $('#reg-email').val();
              const regmobile = $('#reg-mobile').val();
              const regpwd = $('#reg-pwd').val();
              const otp = $('#reg-otp').val();
              // Validate inputs
              if (
                regname &&
                regemail &&
                regmobile &&
                regpwd
              ) {
                if (regpwd.length > 5) {
                  $('#otp-btn').css({'background-color': '#6DA942'});
                  if (otp) {
                    $('#signup-btn').css({'background-color': '#6DA942'});
                  }
                }
              }else {
                $('#otp-btn').css({'background-color': '#b2b2b2'});
              }
            });
          }
        });
        $('.err').html('');
      } else if (this.validate.validateMobile(input)) {
        // User entered mobile
        $('.err').html('');
        $('.fixed-dark-cover').hide();
        this.authService.authenticateMobile(input).subscribe(data => {
          if (data.success) {
            this.loginEmailInput = this.initialLoginInput;
            this.isInputMobile = true;
            // Mobile number exists
            $('#next-login-fixed-dark-cover').css({ 'display': 'flex' });
            $('#login-password').focus();
            $('#login-password').keyup(function(e){
              const inp = $(this).val();
              if (inp.length > 5) {
                $('#login-btn').css({'background-color': '#6DA942'});
              }else {
                $('#login-btn').css({'background-color': '#b2b2b2'});
              }
            });
          } else {
            this.regMobileInput = this.initialLoginInput;
            $('#reg-mobile').val(this.initialLoginInput);
            $('#next-reg-fixed-dark-cover').css({ 'display': 'flex' });
            $('#reg-name').focus();
            $('#next-reg-fixed-dark-cover').keyup(function(e) {
              const regname = $('#reg-name').val();
              const regemail = $('#reg-email').val();
              const regmobile = $('#reg-mobile').val();
              const regpwd = $('#reg-pwd').val();
              const otp = $('#reg-otp').val();
              // Validate inputs
              if (
                regname &&
                regemail &&
                regmobile &&
                regpwd
              ) {
                if (regpwd.length > 5) {
                  $('#otp-btn').css({'background-color': '#6DA942'});
                  if (otp) {
                    $('#signup-btn').css({'background-color': '#6DA942'});
                  }
                }
              }else {
                $('#otp-btn').css({'background-color': '#b2b2b2'});
              }
            });
          }
        });
      } else {
        $('.err').html('Please enter a valid Email or Mobile');
        $('#email').css({'border-color': '#fa0000'});
      }
    } else {
      $('.err').html('Please enter a valid Email or Mobile');
      $('#email').css({'border-color': '#fa0000'});
    }
  }
  public otpKeyUp(event: any) {
    const otp = event.target.value;
    if (otp.length === 6) {
      $('#accept-btn').css({ 'background-color': '#f00', 'color': '#fff' });
    }
  }

  public LoginSubmit(loginEmailInput: string, loginPasswordInput: string) {
    $('.fixed-dark-cover input').css({'border-color': '#b2b2b2'});
    loginEmailInput = loginEmailInput.toLowerCase();
    // this.loginEmailInput = this.loginEmailInput.toLowerCase();
    this.isInputEmail = false;
    this.isInputMobile = false;
    $('.err').html('');
    this.loginEmailInput = loginEmailInput;
    this.loginPasswordInput = loginPasswordInput;
    // Check if password has atleast 6 characters
    // valiadte
    if (this.validate.validateInput(loginEmailInput) && this.validate.validateInput(loginPasswordInput)) {
      if (this.validate.validateEmail(loginEmailInput)) {
        const user = {
          email: loginEmailInput,
          password: loginPasswordInput
        };
        this.authService.authenticateEmail(loginEmailInput).subscribe(data => {
          if (data.success) {
            // Email exists
            // Log user in
            this.authService.authenticateUser(user).subscribe(dat => {
              // console.log(dat);
              if (dat.success) {
                this.uName = dat.user.name;
                this.authService.storeUserData(dat.token, dat.user);
                window.location.reload();
                  $('.login-trig-div').hide();
                  $('.account-trig-div').show();
                  $('.fixed-dark-cover').hide();
              }else {
                $('.err').html(dat.msg);
              }
            });
          } else {
            $('.err').html('Email is not registered with us');
          }
        });
        $('.err').html('');
      } else {
        if (this.validate.validateMobile(loginEmailInput)) {
          // User gave mobile
          this.isInputMobile = true;
          const user = {
            email: loginEmailInput,
            password: loginPasswordInput
          };
          this.authService.authenticateMobile(loginEmailInput).subscribe(data => {
            if (data.success) {
              // Mobile exists
              // Log user in
              this.authService.authenticateUser(user).subscribe(dat => {
                if (dat.success) {
                  this.uName = dat.user.name;
                  this.authService.storeUserData(dat.token, dat.user);
                  window.location.reload();
                    $('.login-trig-div').hide();
                    $('.account-trig-div').show();
                    $('.fixed-dark-cover').hide();
                }else {
                  $('.err').html(dat.msg);
                }
              });
            } else {
              $('.err').html('Mobile is not registered with us');
            }
          });
          $('.err').html('');
        }else {
          $('.err').html('Please enter a valid email or 10 digit mobile number');
        }
      }
    }else {
      if (!this.validate.validateInput(loginEmailInput)) {
        $('#login-email').css({'border-color': '#fa0000'});
        $('.err').html('Please enter a valid email');
      }
      if (!this.validate.validateInput(loginPasswordInput)) {
        $('#login-password').css({'border-color': '#fa0000'});
        $('.err').html('Password is required');
      }
    }
  }
   public OtpBtnClick() {
    $('.err').html('');
    // Validate inputs
    if (
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regPwdInput)
    ) {
      this.regEmailInput = this.regEmailInput.toLowerCase();
      // Validate Email and Mobile
      if (this.validate.validateEmail(this.regEmailInput)) {
        if (this.validate.validateMobile(this.regMobileInput)) {
          if (this.regPwdInput.length > 5) {
            this.authService.authenticateMobile(this.regMobileInput).subscribe(data => {
              if (data.success) {
                // Mobile exists
                $('.err').html('The mobile number is already registered with us.');
              } else {
                this.authService.authenticateEmail(this.regEmailInput).subscribe(edat => {
                  if (edat.success) {
                    $('.err').html('The email is already registered with us.');
                    }else {
                      // Send otp
                      this.authService.sendOtp(this.regMobileInput).subscribe(ress => {
                        this.otptrigTimeout = setTimeout(() => {
                          this.resendotptrig('signup');
                        }, 10000);
                      });
                      $('.otp-span').show('slow');
                      $('#otp-btn').hide();
                      $('#signup-btn').css({ 'display': 'block' });
                    }
                });
              }
            });
          }else {
            $('.err').html('Please enter password with atleast 6 characters');
            $('#reg-pwd').css({'border-color': '#fa0000'});
          }
        }else {
          $('.err').html('Please enter a Valid Mobile number');
          $('#reg-mobile').css({'border-color': '#fa0000'});
        }
      }else {
        $('.err').html('Please enter a Valid Email');
        $('#reg-email').css({'border-color': '#fa0000'});
      }
    }else {
      $('.err').html('All input fields are required');
      if (!this.validate.validateInput(this.regNameInput)) {
        $('#reg-name').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regEmailInput)) {
        $('#reg-email').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regMobileInput)) {
        $('#reg-mobile').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regPwdInput)) {
        $('#reg-pwd').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regNameInput) && this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regPwdInput)) {
        $('#reg-name').css({'border-color': '#fa0000'});
        $('.err').html('Please enter your name');
      }
      // tslint:disable-next-line:max-line-length
      if (!this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regPwdInput)) {
        $('#reg-email').css({'border-color': '#fa0000'});
        $('.err').html('Please enter a valid email address');
      }
      if (!this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regPwdInput)) {
        $('#reg-mobile').css({'border-color': '#fa0000'});
        $('.err').html('Please enter 10 digit mobile number');
      }
      if (!this.validate.validateInput(this.regPwdInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regEmailInput)) {
        $('#reg-pwd').css({'border-color': '#fa0000'});
        $('.err').html('Password must have at least 6 characters');
      }
    }
  }
  public SignUpClick(regNameInput: string, regEmailInput: string, regMobileInput: string, regPwdInput: string, regOTPInput: string) {
    $('.err').html('');
    $('.fixed-dark-cover input').css({'border-color': 'rgba(0, 0, 0, 0.2)'});
    // validate and signup
    this.regNameInput = regNameInput;
    this.regEmailInput = regEmailInput.toLowerCase();
    regEmailInput = regEmailInput.toLowerCase();
    this.regMobileInput = regMobileInput;
    this.regPwdInput = regPwdInput;
    this.regOTPInput = regOTPInput;
    this.user = {
      email: this.regEmailInput,
      mobile: this.regMobileInput,
      name: this.regNameInput,
      password: this.regPwdInput,
      address: [],
      rewardPoints: 0,
      otp: this.regOTPInput
    };
    // Validate inputs
    if (
      this.validate.validateInput(regNameInput) &&
      this.validate.validateInput(regEmailInput) &&
      this.validate.validateInput(regMobileInput) &&
      this.validate.validateInput(regPwdInput)
    ) {
      $('#signup-btn').prop('disabled', true);
      // Validate Email and Mobile
      if (this.validate.validateEmail(regEmailInput)) {
        if (this.validate.validateMobile(regMobileInput)) {
          this.authService.authenticateMobile(regMobileInput).subscribe(data => {
            if (data.success) {
              $('#reg-mobile').css({'border-color': '#fa0000'});
              $('.err').html('That mobile number is already registered with us');
            } else {
              this.authService.authenticateEmail(regEmailInput).subscribe(edat => {
                if (edat.success) {
                  $('#reg-email').css({'border-color': '#fa0000'});
                  $('.err').html('That Email is already registered with us');
                }else {
                  if (regPwdInput.length > 5) {
                    $('#signup-btn').prop('disabled', true);
                    // Valid email and mobile numbers. register user
                    this.authService.registerUser(this.user).subscribe(res => {
                      if (res.success) {
                        // Log user in
                        this.LoginSubmit(regEmailInput, regPwdInput);
                      }else {
                        $('#signup-btn').prop('disabled', false);
                        // Show Error
                        if (res.msg.message === 'otp_not_verified') {
                          $('.err').html('Please enter Valid OTP');
                          $('#reg-otp').css({'border-color': '#fa0000'});
                        }
                      }
                    });
                  }else {
                    $('#signup-btn').prop('disabled', false);
                    $('.err').html('Please enter password with atleast 6 characters');
                    $('#reg-pwd').css({'border-color': '#fa0000'});
                  }
                }
              });
            }
          });
        }else {
          $('#signup-btn').prop('disabled', false);
          $('.err').html('Please enter a 10 digit Mobile number');
          // Hightlight mobile number
          $('#reg-mobile').css({'border-color': '#fa0000'});
        }
      }else {
        $('#signup-btn').prop('disabled', false);
        $('.err').html('Please enter a valid email address');
        $('#reg-email').css({'border-color': '#fa0000'});
      }
    }else {
      $('#signup-btn').prop('disabled', false);
      $('.err').html('All input fields are required');
      if (!this.validate.validateInput(this.regNameInput)) {
        $('#reg-name').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regEmailInput)) {
        $('#reg-email').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regMobileInput)) {
        $('#reg-mobile').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regPwdInput)) {
        $('#reg-pwd').css({'border-color': '#fa0000'});
      }
      if (!this.validate.validateInput(this.regNameInput) && this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regPwdInput)) {
        $('#reg-name').css({'border-color': '#fa0000'});
        $('.err').html('Please enter your name');
      }
      // tslint:disable-next-line:max-line-length
      if (!this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regPwdInput)) {
        $('#reg-email').css({'border-color': '#fa0000'});
        $('.err').html('Please enter a valid email address');
      }
      if (!this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regEmailInput) &&
      this.validate.validateInput(this.regPwdInput)) {
        $('#reg-mobile').css({'border-color': '#fa0000'});
        $('.err').html('Please enter 10 digit mobile number');
      }
      if (!this.validate.validateInput(this.regPwdInput) &&
      this.validate.validateInput(this.regMobileInput) &&
      this.validate.validateInput(this.regNameInput) &&
      this.validate.validateInput(this.regEmailInput)) {
        $('#reg-pwd').css({'border-color': '#fa0000'});
        $('.err').html('Password must have at least 6 characters');
      }
    }
    $('.login-trig-div').hide();
    $('.account-trig-div').show();
  }
  public showError(context: string, error: string) {
    switch (context) {
      case 'login-err':
        $('.login-err').html(error);
        break;

      default:
        break;
    }
  }
  public mainClose() {
     // resetting all the variables
     this.regNameInput = null;
     this.regComNameInput = null;
     this.regEmailInput = null;
     this.regMobileInput = null;
     this.regPwdInput = null;
     this.regOTPInput = null;
     this.fpOtpInput = null;
     this.fpNewPwd = null;
     this.cfpNewPwd = null;
     this.mobileNumForfp = null;
     this.loginEmailInput = null;
     this.loginPasswordInput = null;
    //  disabling all buttons
    // continue-btn,otp-btn,signup-btn,login-btn,continue-btn,#fp-continue-btn
    $('#continue-btn,#otp-btn,#signup-btn,#login-btn,#continue-btn,#fp-continue-btn').css({'background-color' : '#b2b2b2'});
    $('.fixed-dark-cover').hide();
    $('#next-reg-fixed-dark-cover input').val('');
    $('.fixed-dark-cover input').css({'border-color': '#b2b2b2'});
    $('.err').html('');
    // reset resend setintervals
    clearInterval(this.resendotpinterval);
    clearInterval(this.fpresendotpInterval);
    clearTimeout(this.sretryOtp);
    clearTimeout(this.fpretryOtp);
    clearTimeout(this.otptrigTimeout);
    clearTimeout(this.fptrigTimeout);
    $('#sign-resend-otp-text').html('');
    $('#fp-resend-otp-text').html('');
    $('#fp-resend').hide();
    $('#sign-resend').hide();
    $('.otp-span').hide();
    $('#reg-otp').val('');
  }
  clickedOnTerms() {
    $('.fixed-dark-cover').hide();
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/home']);
    return false;
  }
  triggerForgotPwd() {
    $('.err').html('');
    const input = this.loginEmailInput;
    // Check if email/pwd is given
    // Validate input
    if (this.validate.validateInput(input)) {
      // User has entered input
      // Checking if it is email
      if (this.validate.validateEmail(input)) {
        // User have entered email
        // Check if email is registered
        this.authService.authenticateEmail(input).subscribe(data => {
          if (data.success) {
            // Email exists
            // Get mobile number from email
            this.authService.getUserMobileFromEmail(input).subscribe(res => {
              // res is the mobile number
              this.mobileNumForfp = res.msg;
              // Hide current db
              $('.fixed-dark-cover').hide();
              // Open forgot pwd db
              $('#fp-fixed-dark-cover').css({'display': 'flex'});
              this.authService.sendOtp(this.mobileNumForfp).subscribe(ress => {
                this.fptrigTimeout = setTimeout(() => {
                  this.resendotptrig('fp');
                }, 10000);
              });
            });
          }else {
            // Show Email does't exist
            $('#email').css({'border-color': '#fa0000'});
            $('.err').html('That email is not registered with us');
          }
        });
        $('.err').html('');
      } else if (this.validate.validateMobile(input)) {
        // User entered mobile
        this.mobileNumForfp = input;
        $('.err').html('');
        this.authService.authenticateMobile(input).subscribe(data => {
          if (data.success) {
            // Hide current db
            this.mobileNumForfp = input;
            $('.fixed-dark-cover').hide();
            // Open forgot pwd db
            $('#fp-fixed-dark-cover').css({'display': 'flex'});
            this.authService.sendOtp(input).subscribe(res => {
              // console.log(res);
            });
            setTimeout(() => {
              this.resendotptrig('fp');
            }, 10000);
          } else {
            $('#email').css({'border-color': '#fa0000'});
            $('.err').html('That mobile number is not registered with us');
          }
        });

      } else {
        $('.err').html('Please enter a valid Email or Mobile');
        $('#email').css({'border-color': '#fa0000'});
      }
    } else {
      $('.err').html('Please enter a valid Email or Mobile');
      $('#email').css({'border-color': '#fa0000'});
    }
    $('#otp,#fpnewpwd,#cfpnewpwd').keydown(function(){
      // alert($('#cfpnewpwd').val());
      const otp = $('#otp').val();
      const p = $('#fpnewpwd').val();
      const cp = $('#cfpnewpwd').val();
      if ((otp.length > 3) && (p.length > 5) && (cp.length > 5)) {
        $('#fp-continue-btn').css({'background-color' : '#6DA942'});
      }
    });
  }
  logNewPwd() {
    const pwdDets = {
      newPwd: this.fpNewPwd,
      otp: this.fpOtpInput,
      mobile: this.mobileNumForfp
    };
    if (this.fpNewPwd === this.cfpNewPwd) {

      this.authService.updateUserPwdFromHome(pwdDets).subscribe(re => {
        if (re.success) {
          // refresh
          $('#fp-fixed-dark-cover').hide();
          $('#next-login-fixed-dark-cover').css({ 'display': 'flex' });
        }else {
          $('.fp-err').html('Please enter a valid OTP');
        }
      });
    }else {
      $('.fp-err').html('Passwords do not match');
    }
  }
  resendotptrig(mode) {
    switch (mode) {
      case 'signup':
        let n = 30;
        $('#sign-resend-otp-text').html('You can resend OTP in 00 : ' + n + ' seconds.').show();
        this.resendotpinterval = setInterval(function() {
          if (n !== 1) {
            n--;
            $('#sign-resend-otp-text').html('You can resend OTP in 00 : ' + n + ' seconds.');
          }else {
            // Show resend otp
            $('#sign-resend-otp-text').hide();
            $('#sign-resend').show();
            clearInterval(this.resendotpinterval);
          }
        }, 1000);
        break;
      case 'fp':
      n = 30;
      $('#fp-resend-otp-text').html('You can resend OTP in 00 : ' + n + ' seconds.').show();
      this.fpresendotpInterval = setInterval(function() {
        if (n !== 1) {
          n--;
          $('#fp-resend-otp-text').html('You can resend OTP in 00 : ' + n + ' seconds.');
        }else {
          // Show resend otp
          $('#fp-resend-otp-text').hide();
          $('#fp-resend').show();
          clearInterval(this.fpresendotpInterval);
        }
      }, 1000);

        break;

      default:
        break;
    }

  }
  retryOtp(mode) {
    switch (mode) {
      case 'signup':
        if (this.validate.validateEmail(this.regEmailInput)) {
          if (this.validate.validateMobile(this.regMobileInput)) {
            this.authService.authenticateMobile(this.regMobileInput).subscribe(data => {
              if (data.success) {
                if (this.regPwdInput.length > 5) {
                  // Retry otp
                  $('#sign-resend-otp-text').hide();
                  this.authService.retryOtp(this.regMobileInput).subscribe(res => {
                    if (res.success) {
                      $('.err').html('OTP sent to your mobile');
                      setTimeout(function() {
                        $('.err').html('');
                      }, 1500);
                      $('#sign-resend').hide();
                      this.sretryOtp = setTimeout(function() {
                        this.resendotptrig('signup');
                      }, 10000);
                    }else {
                      console.log(res);
                      $('.err').html('Something went wrong. Please try again later');
                      setTimeout(function() {
                        $('.err').html('');
                      }, 1500);
                    }
                  });

                }else {
                  $('.err').html('Please enter password with atleast 6 characters');
                  $('#reg-pwd').css({'border-color': '#fa0000'});
                }
              } else {
                $('#reg-mobile').css({'border-color': '#fa0000'});
                $('.err').html('That mobile number is not registered with us');
              }
            });
          }else {
            $('.err').html('Please enter Valid Mobile number');
            // Hightlight mogile number
            $('#reg-mobile').css({'border-color': '#fa0000'});
          }
        }
        break;
      case 'fp':
        if (this.validate.validateMobile(this.mobileNumForfp)) {
          this.authService.authenticateMobile(this.mobileNumForfp).subscribe(data => {
            if (data.success) {
                // Retry otp
                $('#fp-resend-otp-text').hide();
                this.authService.retryOtp(this.mobileNumForfp).subscribe(res => {
                  if (res.success) {
                    $('.err').html('Otp sent !');
                    setTimeout(function() {
                      $('.err').html('');
                    }, 1500);
                    $('#fp-resend').hide();
                    this.fpretryOtp = setTimeout(function() {
                      this.resendotptrig('fp');
                    }, 10000);
                  }else {
                    $('.err').html('Something went wrong. Please try again later');
                    setTimeout(function() {
                      $('.err').html('');
                    }, 1500);
                  }
                });
            } else {
              $('.err').html('That mobile number is not registered with us');
            }
          });
        }
        break;

      default:
        break;
    }





  }
  hideFixedDarkCover(event) {
    if (event.keyCode === 27) {
      this.mainClose();
    }
  }
  keyupped(event) {
   $(event.target).css({'border-color' : '#b2b2b2'});
   $('.err').html('');
  }

}
