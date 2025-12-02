import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-postbooks',
  templateUrl: './post-books.page.html',
  styleUrls: ['./post-books.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class PostBooksPage {
  bookName = '';
  reviewComment = '';
  bookAuthor = '';
  bookStatus = '';
  rating = 0;
  startDate = '';
  selectedDateDisplay = '';
  
  statusOptions = [
    'Lendo',
    'Lido',
    'Quero Ler',
    'Abandonado',
    'Relendo'
  ];

  // Dados do livro de exemplo
  bookCover = '';
  bookTitle = '';
  bookType = '';
  releaseDate = '';
  synopsis = '';
  whereToFind = '';

  constructor(private router: Router, 
    private navCtrl: NavController, 
    private postsService: PostsService,
    private toastCtrl: ToastController) {this.loadBookFromNavigation();}

  loadBookFromNavigation() {
    const nav = this.router.currentNavigation();
    const state = nav?.extras?.state as any;

    if (state?.book) {
      const book = state.book;

      this.bookTitle = book.volumeInfo.title || 'Título Desconhecido';
      this.bookAuthor = (book.volumeInfo.authors && book.volumeInfo.authors.join(', ')) || 'Autor Desconhecido';
      this.bookCover = book.volumeInfo.imageLinks?.thumbnail || 'assets/capas/default-book.png';
      this.releaseDate = book.volumeInfo.publishedDate || 'Data Desconhecida';
      this.synopsis = book.volumeInfo.description || 'Sinopse não disponível.';
      this.whereToFind = book.volumeInfo.publisher || 'Local de publicação desconhecido.';
    }
  }



  setRating(star: number) {
    this.rating = star;
  }

  onStatusChange(event: any) {
    this.bookStatus = event.detail.value;
  }

  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    this.selectedDateDisplay = this.formatDate(date);
    this.startDate = event.detail.value;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async postBook() {
    const postData = {
      comment: this.reviewComment,
      titleReview: this.bookName,
      title: this.bookTitle,
      author: this.bookAuthor,
      cover: this.bookCover,
      releaseDate: this.releaseDate,
      synopsis: this.synopsis,
      whereToFind: "link de afiliado",
      status: this.bookStatus,
      rating: this.rating,
      startDate: this.startDate,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    try {
      await this.postsService.savePost(postData);

      this.showToast('Avaliação enviada com sucesso!');
      this.router.navigate(['/tabs/tab3']);
    } catch (error) {
      console.error('Erro ao enviar avaliação: ', error);
      this.showToast('Erro ao enviar avaliação. Tente novamente.');
    }

    
    console.log('Posting book:', postData);
    // Aqui você implementaria a lógica de envio para o backend
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
    console.log('Going back');
  }

  async showToast(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top'
    });
    t.present();
  }
}
