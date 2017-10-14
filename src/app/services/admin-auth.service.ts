import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AdminAuthService {

    authToken: any;
    admin: any;

    constructor(private http: Http) { }

    registerAdmin(admin) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        // return this.http.post('http://localhost:3600/admin/register', admin, { headers: header }).map(res => res.json());
        return this.http.post('admin/register', admin, { headers: header }).map(res => res.json());
    }

    authenticateAdmin(admin) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        // return this.http.post('http://localhost:3600/admin/authenticate', admin, { headers: header }).map(res => res.json());
        return this.http.post('admin/authenticate', admin, { headers: header }).map(res => res.json());
    }

    getProfile() {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        this.loadToken();
        header.append('Authorization', this.authToken);
        // return this.http.get('http://localhost:3600/admin/profile', { headers: header }).map(res => res.json());
        return this.http.get('admin/profile', { headers: header }).map(res => res.json());
    }

    loadToken() {
        const token = localStorage.getItem('admin_id_token');
        this.authToken = token;
    }

    storeAdminData(token, admin) {

        localStorage.setItem('admin_id_token', token);
        localStorage.setItem('admin', JSON.stringify(admin));
        this.authToken = token;
        this.admin = admin;

    }

    loggedIn() {
        return tokenNotExpired('admin_id_token');
    }

    logout() {
        this.authToken = null;
        this.admin = null;
        localStorage.clear();
    }

}
