import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookEditPage } from './book-edit.page';

const routes: Routes = [
  {
    path: '',
    component: BookEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookEditPageRoutingModule {}
