import { Component } from '@angular/core';
import { BookService } from '../database.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BookDetailsPage } from '../book-details/book-details.page';
import { BookEditPage } from '../book-edit/book-edit.page';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss']
})
export class BookListPage {
  searchText: string = '';
  selectedAuthors: string[] = [];
  selectedLanguages: string[] = [];
  selectedGenres: string[] = [];

  books: any[] = [];
  filteredBooks: any = [];
  booksFilt: any[] = [];
  authors: any[] = [];
  genres: any[] = [];
  languages: any[] = [];

  minPages: number | any = null;
  maxPages: number | any = null;
  genre = '';
  bookId: number | null = null;

  constructor(
    private bookService: BookService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}
  async presentAlert(book: any) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: `Вы уверены что хотите удалить ${book.title}?`, // Customize the message as needed
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteBook(book._id);
          }
        }
      ]
    });

    await alert.present();
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(Response => {
      this.books = Response;
      this.filteredBooks = [...this.books];
      this.booksFilt = [...this.books];
    });

    this.bookService.getLanguages().subscribe(Response => {
      this.languages = Response;
    });

    this.bookService.getAuthors().subscribe(Response => {
      this.authors = Response;
    });

    this.bookService.getGenres().subscribe(Response => {
      this.genres = Response;
    });
  }

  handleInput() {
    const searchText = this.searchText.toLowerCase();
    this.filteredBooks = this.books.filter(
      book =>
        book.title.toLowerCase().includes(searchText) ||
        book.description.toLowerCase().includes(searchText)
    );
  }

  searchFilter() {
    this.filteredBooks = Array.from(this.booksFilt);

    let filterBooks = Array.from(this.filteredBooks);

    if (this.selectedLanguages.length) {
      this.filteredBooks = filterBooks.filter((book: any) => {
        const languageLower = book.language.toLowerCase();
        return this.selectedAuthors.some(selectedLanguage =>
          languageLower.includes(selectedLanguage)
        );
      });
      filterBooks = Array.from(this.filteredBooks);
    }

    if (this.selectedAuthors.length) {
      this.filteredBooks = filterBooks.filter((book: any) => {
        const authorLower = book.author.toLowerCase();
        return this.selectedAuthors.some(selectedGenre =>
          authorLower.includes(selectedGenre)
        );
      });
      filterBooks = Array.from(this.filteredBooks);
    }

    if (this.selectedGenres.length) {
      this.filteredBooks = filterBooks.filter((book: any) => {
        const genreLower = book.genre.toLowerCase();
        return this.selectedGenres.some(selectedGenre =>
          genreLower.includes(selectedGenre.toLowerCase())
        );
      });
      filterBooks = Array.from(this.filteredBooks);
    }

    if (this.minPages !== null) {
      this.filteredBooks = filterBooks.filter(
        (book: any) => book.pages >= this.minPages
      );
      filterBooks = Array.from(this.filteredBooks);
    }
    if (this.maxPages !== null) {
      this.filteredBooks = filterBooks.filter(
        (book: any) => book.pages <= this.maxPages
      );
      filterBooks = Array.from(this.filteredBooks);
    }
  }

  resetFilter() {
    this.bookService.getAllBooks().subscribe(Response => {
      this.books = Response;
      this.filteredBooks = [...this.books];
    });
    this.selectedAuthors = [];
    this.selectedGenres = [];
    this.selectedLanguages = [];
    this.minPages = null;
    this.maxPages = null;
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(Response => {
      window.location.reload();
    });
  }

  openBookEdit(bookId: string): void {
    this.bookService.getBookById(bookId).subscribe(Response => {
      this.presentModalEdit(Response);
    });
  }

  openBookDetails(bookId: string): void {
    this.bookService.getBookById(bookId).subscribe(Response => {
      this.presentModalDetails(Response);
    });
  }

  async presentModalDetails(book: any) {
    const modal = await this.modalCtrl.create({
      component: BookDetailsPage,
      componentProps: {
        searchedBook: book
      }
    });
    return await modal.present();
  }

  async presentModalEdit(book: any) {
    const modal = await this.modalCtrl.create({
      component: BookEditPage,
      componentProps: {
        editBook: book
      }
    });
    return await modal.present();
  }

  async openBookCreate(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: BookEditPage,
      componentProps: {
        searchedBook: {},
        isCreate: true
      }
    });
    return await modal.present();
  }
}
