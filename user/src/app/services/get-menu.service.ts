import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class GetMenuService {
    constructor(private http: Http) { }
    getCats() {
        return this.http.get('admin/get-categories').map(res => res.json());
    }
    getRotiItems() {
        return this.http.get('admin/get-roti-items').map(res => res.json());
    }
    getDatesMenu(date, last_date) {
        return this.http.get('admin/get-dates-menu/' + date + '/' + last_date).map(res => res.json());
    }
    getItemDetails(item_id) {
        return this.http.get('admin/get-item-details/' + item_id).map(res => res.json());
    }
    getTabStatus(tab) {
        return this.http.get('admin/get-tab-status/' + tab).map(res => res.json());
    }
    postTabStatus(tab, status) {
        return this.http.get('admin/post-tab-status/' + tab + '/' + status).map(res => res.json());
    }
}
