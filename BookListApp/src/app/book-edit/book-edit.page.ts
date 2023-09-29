import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonModal, ModalController } from '@ionic/angular';
import { BookService } from '../database.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.page.html',
  styleUrls: ['./book-edit.page.scss']
})
export class BookEditPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  isCreate!: boolean;

  ngOnInit(): void {}
  constructor(
    private bookService: BookService,
    private modalController: ModalController
  ) {}
  editBook: any = {};
  @ViewChild('product_id', { static: true }) product_id!: IonInput;

  ngAfterViewInit() {
    setTimeout(() => {
      this.product_id.setFocus();
    }, 100);
  }

  async close(): Promise<boolean> {
    try {
      await this.modalController.dismiss();
      window.location.reload();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  editBookData(bookId: string, editBook: any) {
    const book = {
      author: editBook.author,
      title: editBook.title,
      description: editBook.description,
      pages: editBook.pages,
      language: editBook.language,
      genre: editBook.genre
    };
    this.bookService.updateBook(bookId, book).subscribe(Response => {});
    this.isCreate = false;
    this.close();
  }

  createBook(bookData: any): void {
    const book = {
      author: bookData.author,
      title: bookData.title,
      description: bookData.description,
      pages: bookData.pages,
      language: bookData.language,
      genre: bookData.genre
    };
    this.bookService.createBook(book).subscribe(response => {
      console.log('Книга успешно создана:', response);
    });
    this.close();
  }
}
