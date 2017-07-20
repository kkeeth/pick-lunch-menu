import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { StoreService } from '../store.service';

@Component({
   selector: 'page-modal',
   templateUrl: 'modal-page.html'
})
export class ModalPage {
   item: any;
   title: string;

   constructor(
      public params: NavParams,
      public view_ctrl: ViewController,
      public store_service: StoreService
   ) {
     this.item = this.params.data;
     this.title = this.item.type == 'category' ? 'カテゴリ' : 'メニュー';
   }

   update(new_name) {
      if (this.item.type == 'category') {
         let new_cat = this.store_service.get_category();
         new_cat.forEach((v, i) => {
            if (this.item.id == v['id']) {
               new_cat[i]['name'] = new_name;
            }
         })
         this.store_service.update_category(new_cat);
      }
      else if (this.item.type == 'menu') {
         let new_menu = this.store_service.get_all_menu();
         new_menu.forEach((v, i) => {
            if (this.item.id == v['id']) {
               new_menu[i]['name'] = new_name;
            }
         })
         this.store_service.update_menu(new_menu);
      }
      this.dismiss();
   }

   dismiss() {
      this.view_ctrl.dismiss();
   }
}