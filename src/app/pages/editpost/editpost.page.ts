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
  IonDatetime,
  IonTextarea
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
  IonDatetime,
  IonTextarea
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

  statusOptions = ['Lido', 'Estou lendo', 'Quero ler', 'Relendo', 'Abandonados'];

  constructor(private router: Router, private postsService: PostsService) {}

  ngOnInit() {
    const nav = this.router.currentNavigation();
    const state = nav?.extras.state as any;
    if (state?.post) {
      const post = state.post;
      this.bookId = post.id;
      this.bookName = post.titleReview;
      this.reviewComment = post.comment;
      this.bookAuthor = post.book.author;
      this.bookStatus = post.book.status;
      this.bookCover = post.book.image;
      this.bookTitle = post.book.title;
      this.bookType = post.book.type;
      this.releaseDate = post.book.releaseDate;
      this.synopsis = post.book.synopsis;
      this.whereToFind = post.book.whereToFind;
      this.startDate = post.book.startDate;
      this.rating = post.book.rating;
    }
  }
  
  fixUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    return url.replace("http://", "https://");
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
