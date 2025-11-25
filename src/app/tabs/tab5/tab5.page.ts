import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton, 
  IonCol, 
  IonRow, 
  IonGrid,
  IonSkeletonText
} from '@ionic/angular/standalone';
// Removido o import 'count' não utilizado

type Book = {
  title: string;
  image: string;
  category: string;
};

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButton, 
    IonCol, 
    IonRow, 
    IonGrid,
    IonSkeletonText
  ]
})
export class Tab5Page implements OnInit {

  filteredBooks: Book[] = [];

  filterByStatus(status: string) {
    // Inicializa filteredBooks com todos os livros se 'Todos' for passado
    if (status === 'Todos') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => book.category === status);
    }
  }
  
  userData: any = null;

  constructor(private userService: UserService, private ngZone: NgZone) { }

  async ngOnInit() {
    // Garante que todos os livros sejam carregados na inicialização
    // this.userData = await this.userService.getCurrentUserData();
    const data = await this.userService.getCurrentUserData();
    this.ngZone.run(() => {
      this.userData = data;
      console.log('Dados do usuário no Tab5Page: ', this.userData);
    });
    this.filteredBooks = this.books; 
  }

  goals = [
    {type: 'Diária', value: 30, unit: 'páginas'},
    {type: 'Mensal', value: 12, unit: 'livros'},
    {type: 'Anual', value: 100, unit: 'livros'}
  ];

  readingStatuses = [
    {status: 'Lidos', count: 20},
    {status: 'Estou lendo', count: 1},
    {status: 'Quero ler', count: 5},
    {status: 'Relendo', count: 1},
    {status: 'Avaliados', count: 4},
    {status: 'Abandonados', count: 2}
  ];

  // CORRIGIDO: Agora é um ARRAY [] e não um objeto {}
  libraryCategories = [ 
    {label: 'Avaliados'},
    {label: 'Quero ler'},
    {label: 'Lidos'},
    {label: 'Relendo'},
    {label: 'Abandonados'},
    {label: 'Estou lendo'}
  ]; 

  books = [
    {title: 'A Hipótese do Amor', image: 'assets/capas/hipotese.jpg', category: 'Lidos'},
    {title: 'Não Pisque', image: 'assets/capas/nao-pisque.jpg', category: 'Estou lendo'},
    {title: 'Instinto assassino', image: 'assets/capas/instinto-assassino.jpg', category: 'Quero ler'},
  ];

  editGoal(goal: any) {
    console.log('Editar meta: ', goal);
  }

  openLibraryCategory(label: string) {
    console.log('Abrir categoria: ', label)
  }
}