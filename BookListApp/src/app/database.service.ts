import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:4000/api/library'; // Замените на актуальный URL вашего сервера

  constructor(private http: HttpClient) {}

  // Метод для создания новой книги
  createBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, bookData);
  }

  getAuthors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/authors`);
  }
  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres`);
  }
  getLanguages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/languages`);
  }

  // Метод для получения списка всех книг
  getAllBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Метод для получения информации о конкретной книге
  getBookById(bookId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bookId}`);
  }

  updateBook(bookId: string, bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookId}`, bookData);
  }

  // Метод для удаления книги
  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`);
  }
}
