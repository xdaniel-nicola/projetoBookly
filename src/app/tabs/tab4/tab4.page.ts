import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList, 
  IonItem, 
  IonLabel, 
  IonText, 
  IonThumbnail 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports:[
    CommonModule, 
    FormsModule,  
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonList, 
    IonItem, 
    IonLabel, 
    IonText, 
    IonThumbnail
  ]
})
export class Tab4Page implements OnInit {

  // Definição da propriedade notifications
  notifications: any[] = [];


  constructor() { 
    // O construtor está vazio, o que é comum.
  }

  ngOnInit() {
    // Conteúdo da lógica de inicialização (dados mockados)
    const posts = [
      {
        id: 2,
        user: 'Daniel',
        book: {
          title: 'A Hipótese do Amor',
          // Certifique-se de que o caminho 'assets/capas/hipotese.jpg' existe!
          image: 'assets/capas/hipotese.jpg' 
        },
        comment: 'Primeiro livro que vejo escrito em terceira pessoa. Muito diferente!',
        likes: 15,
        comments: [
          { user: 'Douglas', text: 'Sério?' },
          { user: 'João', text: 'Também reparei nisso!' }
        ]
      },
      // Adicione mais posts aqui se quiser testar a rolagem
    ];
    
    // Mapeia os posts para o formato de notificações
    this.notifications = posts.map(post => ({
      bookTitle: post.book.title,
      bookImage: post.book.image,
      likes: post.likes,
      comments: post.comments.length
    }));
  }
} 