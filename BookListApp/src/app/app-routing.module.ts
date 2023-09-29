import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'book-list', pathMatch: 'full' },
  {
    path: 'book-list',
    loadChildren: () =>
      import('./book-list/book-list.module').then(m => m.BookListPageModule)
  },
  {
    path: 'book-details/:id',
    loadChildren: () =>
      import('./book-details/book-details.module').then(
        m => m.BookDetailsPageModule
      )
  },
  {
    path: 'book-edit',
    loadChildren: () =>
      import('./book-edit/book-edit.module').then(m => m.BookEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
