import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';

import { HttpService } from '../../providers/http.service';
import { EntryModalPage } from '../entry-modal/entry-modal';

@Component({
  selector: 'page-entry-categories',
  templateUrl: 'entry-categories.html',
  providers: [HttpService]
})
export class EntryCategoriesPage {

  public entryCategories: any;
  
  constructor(
      public navCtrl: NavController,
      public platform: Platform,
      private http: HttpService,
      public modalCtrl: ModalController) {
      
      this.platform.ready().then(() => {        
        this.getEntryCategories();      
      });
  }


  ionViewDidLoad() {
    console.log('Hello EntryCategoriesPage Page');
  }

  getEntryCategories(){
    let getEntryCategoriesUrl = 'entryCategories';
    this.http.getRequest(getEntryCategoriesUrl)
    .then(
        res => this.showEntryCategories(res)        
    )
    .catch(
        error => console.log(error)
    ); 
  }

  showEntryCategories(res){
    this.entryCategories = res;
    console.log(this.entryCategories)
  }

  openModal(){
    let entryCategories = this.entryCategories;
    let modal = this.modalCtrl.create(EntryModalPage, { entryCategories });
    modal.present();
  }
}
