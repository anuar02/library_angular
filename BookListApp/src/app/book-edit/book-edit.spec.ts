import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, ModalController } from '@ionic/angular';
import { BookEditPage } from './book-edit.page';
import { BookService } from '../database.service';

describe('BookEditPage', () => {
  let component: BookEditPage;
  let fixture: ComponentFixture<BookEditPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookEditPage],
        imports: [IonicModule.forRoot(), HttpClientModule], // Add HttpClientModule here
        providers: [
          {
            provide: ModalController,
            useValue: {
              dismiss: () => Promise.resolve()
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(BookEditPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit book data', () => {
    const bookService = TestBed.inject(BookService);
    const updateBookSpy = spyOn(bookService, 'updateBook').and.returnValue({
      subscribe: () => {}
    } as any);

    component.editBookData('bookId', {
      author: 'New Author',
      title: 'New Title',
      description: 'New Description',
      pages: 100,
      language: 'New Language',
      genre: 'New Genre'
    });

    expect(updateBookSpy).toHaveBeenCalledWith('bookId', {
      author: 'New Author',
      title: 'New Title',
      description: 'New Description',
      pages: 100,
      language: 'New Language',
      genre: 'New Genre'
    });
  });

  it('should create a book', () => {
    const bookService = TestBed.inject(BookService);
    const createBookSpy = spyOn(bookService, 'createBook').and.returnValue({
      subscribe: () => {}
    } as any);

    component.createBook({
      author: 'New Author',
      title: 'New Title',
      description: 'New Description',
      pages: 100,
      language: 'New Language',
      genre: 'New Genre'
    });

    expect(createBookSpy).toHaveBeenCalledWith({
      author: 'New Author',
      title: 'New Title',
      description: 'New Description',
      pages: 100,
      language: 'New Language',
      genre: 'New Genre'
    });
  });
});
