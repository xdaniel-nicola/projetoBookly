import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { booksApi } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiURL = 'https://www.googleapis.com/books/v1/volumes';
  
  constructor(private http: HttpClient) {}

  searchBooks(query: string) {
    const url = `${this.apiURL}?q=${query}&key=${booksApi.googleBooksApiKey}`;
    return this.http.get(url);
  }
}