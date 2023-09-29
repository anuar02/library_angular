import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookEditPageRoutingModule } from './book-edit-routing.module';

import { BookEditPage } from './book-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookEditPageRoutingModule
  ],
  declarations: [BookEditPage]
})
export class BookEditPageModule {}
