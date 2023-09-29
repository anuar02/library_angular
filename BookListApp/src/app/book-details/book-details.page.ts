import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss']
})
export class BookDetailsPage {
  searchedBook: any;
  constructor(private modalController: ModalController) {}
  ngOnInit(): void {}
  async close() {
    await this.modalController.dismiss();
  }
}
