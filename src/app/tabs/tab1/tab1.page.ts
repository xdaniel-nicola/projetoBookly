import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BooksService } from '../../services/books.service'
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent
  ,IonItem
  ,IonInput
  ,IonSearchbar
  ,IonLabel
  ,IonCol
  ,IonRow
  ,IonGrid
  ,IonCard
  ,IonCardHeader
  ,IonCardSubtitle
  ,IonCardTitle
  ,IonCardContent
  ,IonButton
  ,IonIcon
  ,IonInfiniteScroll
  ,IonInfiniteScrollContent
  ,IonAvatar
  ,IonSegment
  ,IonSegmentButton
 } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule
    ,FormsModule
    ,IonicModule
  ],
})

export class Tab1Page implements OnInit{

  terrorBooks: any[] = [];
  romanceBooks: any[] = [];
  aventuraBooks: any[] = [];
  fantasiaBooks: any[] = [];
  ficcaoBooks: any[] = [];

  books: any[] = [];
  searchResults: any[] = [];

  constructor(private booksService: BooksService, private router: Router) {}

  openBook(book: any) {
    this.router.navigate(['/post-books', book.id], {
      state: { book }
    })
  }

  ngOnInit(): void {
    this.getTerrorBooks();
    this.getRomanceBooks();
    this.getAventuraBooks();
    this.getFantasiaBooks();
    this.getFiccaoBooks();
  }

  getTerrorBooks() {
    this.booksService.searchBooks("subject:Horror").subscribe((data: any) => {
      this.terrorBooks = data;
    })
  }

  getRomanceBooks() {
    this.booksService.searchBooks("subject:Romance").subscribe((data: any) => {
      this.romanceBooks = data;
    })
  }
  
  getAventuraBooks() {
    this.booksService.searchBooks("subject:Fantasy").subscribe((data: any) => {
      this.aventuraBooks = data;
    })
  }
  
  getFantasiaBooks() {
    this.booksService.searchBooks("subject:Adventure").subscribe((data: any) => {
      this.fantasiaBooks = data;
    })
  }
  
  getFiccaoBooks() {
    this.booksService.searchBooks("subject:Fiction").subscribe((data: any) => {
      this.ficcaoBooks = data;
    })
  }

  getBestImage(book: any): string | null {
  const links = book.volumeInfo?.imageLinks;
  if (!links) return null;

  return (
    links.extraLarge ||
    links.large ||
    links.medium ||
    links.small ||
    links.thumbnail ||
    links.smallThumbnail ||
    null
  );
}

  
  async search(query: string | null | undefined) {
    if (!query || query.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.booksService.searchBooks(query).subscribe({
      next: (res: any) => {
        this.searchResults = res;
      },
      error: (err) => {
        console.error('Erro ao buscar livros: ', err);
      }
    })
  }
}
