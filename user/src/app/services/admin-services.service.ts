import { Injectable } from '@angular/core';
import { Http, Headers, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminServicesService {
    constructor(private http: Http) { }
    addCategory(newData: any) {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post('admin/add-category', newData, { headers: headers }).map(res => res.json());
    }
    deleteCategory(id: string) {
        return this.http.delete('admin/delete-category/' + id).map(res => res.json());
    }
    getCategories() {
        return this.http.get('admin/get-categories').map(res => res.json());
    }
    getOrders() {
        return this.http.get('admin/get-orders').map(res => res.json());
    }
    addItem(cat_id, sub_name, item_name, item_price, item_img) {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        const Data = {
            'cat_id': cat_id,
            'sub_name': sub_name,
            'item_name': item_name,
            'item_price': item_price,
            'item_img': item_img
        };
        return this.http.post('admin/add-item', Data, { headers: headers }).map(res => res.json());
    }
    getItems(cat_id: string, sub_name: string) {
        return this.http.get('admin/get-items/' + cat_id + '/' + sub_name).map(res => res.json());
    }
    deleteItem(item_id: string) {
        return this.http.delete('admin/delete-item/' + item_id).map(res => res.json());
    }
    addSub(subData: any) {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post('admin/add-sub-category', subData, { headers: headers }).map(res => res.json());
    }
    getSubs(catId: any) {
        return this.http.get('admin/get-subs/' + catId).map(res => res.json());
    }
    deleteSubFromCategory(subName: string, cat_id: string) {
        return this.http.delete('admin/delete-sub-category/' + subName + '/' + cat_id).map(res => res.json());
    }
    getDateItems(cat_id: string, sub_name: string, date: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get('admin/get-date-items/' + cat_id + '/' + sub_name + '/' + date).map(res => res.json());
    }
    postSchedule(schArray: any, remArray: any) {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        const schJSON = JSON.stringify(schArray);
        const schData = { schArray, remArray };
        return this.http.post('admin/post-dates', schData, { headers: headers }).map(res => res.json());
    }
    getDates() {
        return this.http.get('admin/get-all-dates').map(res => res.json());
    }
    deleteDate(date_id) {
        return this.http.delete('admin/delete-date/' + date_id).map(res => res.json());
    }
    getUsers() {
        return this.http.get('admin/get-users').map(res => res.json());
    }
    getUserFromId(user_id) {
        return this.http.get('admin/get-user-from-id/' + user_id).map(res => res.json());
    }
    getUserOrders(user_id) {
        return this.http.get('users/get-user-orders/' + user_id).map(res => res.json());
    }
    postRewards(email, points) {
        return this.http.get('admin/post-rewards/' + email + '/' + points ).map(res => res.json());
    }
    repRewards(email, points) {
        return this.http.get('admin/rep-rewards/' + email + '/' + points ).map(res => res.json());
    }
}
