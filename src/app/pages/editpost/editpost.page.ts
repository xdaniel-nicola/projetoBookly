import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFooter,
  IonIcon,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.page.html',
  styleUrls: ['./editpost.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFooter,
  IonIcon,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime
]
})
export class EditpostPage implements OnInit {
  bookId: string = '';
  bookName: string = '';
  bookAuthor: string = '';
  bookStatus: string = '';
  bookCover: string = '';
  bookTitle: string = '';
  bookType: string = '';
  releaseDate: string = '';
  synopsis: string = '';
  whereToFind: string = '';
  startDate: string = '';
  selectedDateDisplay: string = '';
  reviewComment: string = '';
  rating: number = 0;

  statusOptions = ['Lidos', 'Estou lendo', 'Quero ler', 'Relendo', 'Abandonados'];

  constructor(private router: Router, private postsService: PostsService) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;
    if (state?.book) {
      const book = state.book;
      this.bookId = book.id;
      this.bookName = book.titleReview;
      this.bookAuthor = book.book.author;
      this.bookStatus = book.book.status;
      this.bookCover = book.book.image;
      this.bookTitle = book.book.title;
      this.bookType = book.book.type;
      this.releaseDate = book.book.releaseDate;
      this.synopsis = book.book.synopsis;
      this.whereToFind = book.book.whereToFind;
      this.startDate = book.book.startDate;
      this.reviewComment = book.comment;
      this.rating = book.book.rating;
    }
  }

  setRating(star: number) {
    this.rating = star;
  }

  async updateBook() {
    await this.postsService.updatePost(this.bookId, {
      titleReview: this.bookName,
      comment: this.reviewComment,
      book: {
        title: this.bookTitle,
        author: this.bookAuthor,
        image: this.bookCover,
        status: this.bookStatus,
        synopsis: this.synopsis,
        releaseDate: this.releaseDate,
        whereToFind: this.whereToFind,
        startDate: this.startDate,
        rating: this.rating
      }
    });
    this.router.navigate(['/tabs/tab5']);
  }

  async deleteBook() {
    await this.postsService.deletePost(this.bookId);
    this.router.navigate(['/tabs/tab5']);
  }

  goBack() {
    this.router.navigate(['/tabs/tab5']);
  }
  onStatusChange(event: any) {
  this.bookStatus = event.detail.value;
}

onDateChange(event: any) {
  this.startDate = event.detail.value;
  // formata para exibir no padrão brasileiro
  const date = new Date(this.startDate);
  this.selectedDateDisplay = date.toLocaleDateString('pt-BR');
}

}
