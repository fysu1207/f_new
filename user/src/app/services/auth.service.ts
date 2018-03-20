import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    constructor(private http: Http) { }
    getLocation(lat: number, long: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyA87IC9OaLzSxRfYOFjVzXF6ObsDGYFWeQ').map
            ((response) => response.json());
    }
    getUserFromLocal() {
        const user = localStorage.getItem('user');
        return user;
    }
    updateUser(user) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('users/update-user', user, { headers: header }).map(res => res.json());
        return this.http.post('users/update-user', user, { headers: header }).map(res => res.json());
    }
    updatePassword(pwd) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('users/update-pwd', pwd, { headers: header }).map(res => res.json());
        return this.http.post('users/update-pwd', pwd, { headers: header }).map(res => res.json());
    }
    sendOtp(mobile) {
        // return this.http.get('users/send-otp/' + mobile).map(res => res.json());
        return this.http.get('users/send-otp/' + mobile).map(res => res.json());
    }
    registerUser(user) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('users/register', user, { headers: header }).map(res => res.json());
        return this.http.post('users/register', user, { headers: header }).map(res => res.json());
    }
    authenticateMobile(mobile: string) {
        // return this.http.get('users/find-mobile/' + mobile).map(res => res.json());
        return this.http.get('users/find-mobile/' + mobile).map(res => res.json());
    }
    // Delete cateogry
    authenticateEmail(email: string) {
        // return this.http.get('users/find-email/' + email).map(res => res.json());
        return this.http.get('users/find-email/' + email).map(res => res.json());
    }
    authenticateUser(user) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        // return this.http.post('users/authenticate', user, { headers: header }).map(res => res.json());
        return this.http.post('users/authenticate', user, { headers: header }).map(res => res.json());
    }
    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    loggedIn() {
        return tokenNotExpired('id_token');
    }
    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    // Save user address
    saveAddress(address) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/save-address', address, { headers: header }).map(res => res.json());
    }
    deleteAddress(address) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/delete-address', address, { headers: header }).map(res => res.json());
    }
    updateAddress(address) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/update-address', address, { headers: header }).map(res => res.json());
    }

    getUserAddressses(user_id) {
        return this.http.get('users/get-address/' + user_id).map(res => res.json());
    }
    getUserMobileFromEmail(email) {
        return this.http.get('users/get-mobile-from-email/' + email).map(res => res.json());
    }
    updateUserPwdFromHome(user) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/update-pwd-home', user, { headers: header }).map(res => res.json());
    }
    retryOtp(mobile) {
        return this.http.get('users/retry-otp/' + mobile).map(res => res.json());
    }
    postOrder(order) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/post-order', order, { headers: header }).map(res => res.json());
    }
    postDateItem(dateItem) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/post-dateItem', dateItem , { headers: header }).map(res => res.json());
    }
    getUserRewards(user_id) {
        return this.http.get('users/get-user-rewards/' + user_id).map(res => res.json());
    }
    capturePayment(payment) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('users/capture-payment', payment , { headers: header }).map(res => res.json());
    }
}

