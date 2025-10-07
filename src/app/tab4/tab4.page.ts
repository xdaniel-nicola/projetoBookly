import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar
  ,IonList, IonItem, IonLabel, IonText, IonThumbnail 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports:[IonContent, IonHeader, IonTitle, IonToolbar
    ,IonList, IonItem, IonLabel, IonText, IonThumbnail
  ]
})
export class Tab4Page implements OnInit {

  notifications: any[] = [];


  constructor() { }

  ngOnInit() {
    const posts = [
      {
    id: 2,
    user: 'Daniel',
    book: {
      title: 'A Hipótese do Amor',
      image: 'assets/capas/hipotese.jpg'
    },
    comment: 'Primeiro livro que vejo escrito em terceira pessoa. Muito diferente!',
    likes: 15,
    comments: [
      { user: 'Douglas', text: 'Sério?' },
      { user: 'João', text: 'Também reparei nisso!' }
      ]
  },
    ]
  

  this.notifications = posts.map(post => ({
    bookTitle: post.book.title,
    bookImage: post.book.image,
    likes: post.likes,
    comments: post.comments.length
  }));

  }
}
