import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton, 
  IonCol, 
  IonRow, 
  IonGrid,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonIcon
} from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { PostsService } from 'src/app/services/posts';
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
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonIcon
  ]
})


export class Tab5Page implements OnInit {

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  
  booksByStatus: {[key: string]: any[]} = {};
  statusVisibility: {[key: string]: boolean} = {};
  
  userData: any = null;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  readingStatuses: {status: string, count:number}[] = [];

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private ngZone: NgZone,
    private router: Router,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async openBookOptions(book: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: book.title,
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.router.navigate(['/editpost'], { state: { book }});
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',
          handler: async () => {
            await this.postsService.deletePost(book.id);
            this.booksByStatus[book.category] = this.booksByStatus[book.category].filter(
              b => b.id !== book.id
            );
          }  
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
  
  editarPerfil() {
    this.router.navigate(['/editprofile'], {
    state: { user: this.userData}
    });
  }

  get statusKeys(): string[] {
    return Object.keys(this.booksByStatus);
  } 

  evaluatedBooks: any[] = [];

  async ngOnInit() {
   
    // Garante que todos os livros sejam carregados na inicialização
    // this.userData = await this.userService.getCurrentUserData();
    const data = await this.userService.getCurrentUserData();
    this.ngZone.run(() => {
      this.userData = data;
      console.log('Dados do usuário no Tab5Page: ', this.userData);
    });

    const posts = await this.postsService.getUserPosts(this.userData.uid);

    posts.forEach((p: any) => {
      const status = p.book.status || 'Sem status';
      if(!this.booksByStatus[status]) {
        this.booksByStatus[status] = [];
        this.statusVisibility[status] = false;
      }
      this.booksByStatus[status].push(p.book);

      if(p.book.rating || p.comment) {
        this.evaluatedBooks.push({
          id: p.id,
          title: p.book.title,
          image: p.book.image,
          author: p.book.author,
          rating: p.book.rating,
          comment: p.comment
        })
      }
    });

    

    this.books = posts.map((p: any) => ({
      title: p.book.title,
      image: p.book.image,
      category: p.book.status
    }));

    const statusMap: {[key: string]: number} = {};
    this.books.forEach(book => {
      statusMap[book.category] = (statusMap[book.category] || 0) + 1;
    });

    this.readingStatuses = Object.keys(statusMap).map(status => ({
      status,
      count: statusMap[status]
    }));

    this.filteredBooks = this.books;
  }

  toggleStatus(status: string) {
      this.statusVisibility[status] = !this.statusVisibility[status];
  }

  filterByStatus(status: string) {
    if (status === 'Todos') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => 
        book.category === status);
    }
  }

  goals = [
    {type: 'Diária', value: 30, unit: 'páginas'},
    {type: 'Mensal', value: 12, unit: 'livros'},
    {type: 'Anual', value: 100, unit: 'livros'}
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

  editGoal(goal: any) {
    console.log('Editar meta: ', goal);
  }

  openLibraryCategory(label: string) {
    console.log('Abrir categoria: ', label)
  }
}

