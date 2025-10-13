import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent
  ,IonIcon
  ,IonTextarea
  ,IonButton
 } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent
    ,IonIcon
    ,IonTextarea
    ,IonButton
    ,FormsModule
  ],
})
export class Tab3Page {

  reviews = [
  {
    id: 1,
    user: 'Helena',
    book: {
      title: 'Não Pisque',
      image: 'assets/capas/nao-pisque.jpg'
    },
    comment: 'Achei a história da Holly interessante, mas esse foi o mais fraco até agora.',
    likes: 21,
    liked: false,
    showCommentBox: false,
    newComment: '',
    comments: [
      { user: 'Lucas', text: 'Concordo!', avatar: 'assets/perfis/homem.jpeg' },
      { user: 'Marina', text: 'Achei bem escrito mesmo assim.', avatar: 'assets/perfis/mulher.jpeg' }
      ]
  },
  {
    id: 2,
    user: 'Daniel',
    book: {
      title: 'A Hipótese do Amor',
      image: 'assets/capas/hipotese.jpg'
    },
    comment: 'Primeiro livro que vejo escrito em terceira pessoa. Muito diferente!',
    likes: 15,
    liked: false,
    showCommentBox: false,
    newComment: '',
    comments: [
      { user: 'Douglas', text: 'Sério?', avatar: 'assets/perfis/homem.jpeg' },
      { user: 'João', text: 'Também reparei nisso!', avatar: 'assets/perfis/homem.jpeg' }
      ]
  },
  {
    id: 3,
    user: 'Elisa',
    book: {
      title: 'Não Fale Com Estranhos',
      image: 'assets/capas/nao-fale.jpg'
    },
    comment: 'Gostei bastante do suspense, mas o final me decepcionou um pouco.',
    likes: 11,
    liked: false,
    showCommentBox: false,
    newComment: '',
    comments: [
      { user: 'Carolina', text: 'Concordo muito!', avatar: 'assets/perfis/mulher.jpeg' },
      { user: 'Larissa', text: 'O final foi meio corrido.', avatar: 'assets/perfis/mulher.jpeg' }
      ]
  },
  {
    id: 4,
    user: 'Mariana',
    book: {
      title: 'Instinto Assassino',
      image: 'assets/capas/instinto.jpg'
    },
    comment: 'Nunca tinha lido um livro assim. Muito bom!',
    likes: 5,
    liked: false,
    showCommentBox: false,
    newComment: '',
    comments: [
      { user: 'Luiza', text: 'Sério?', avatar: 'assets/perfis/mulher.jpeg' },
      { user: 'Pedro', text: 'Essa autora é ótima!', avatar: 'assets/perfis/homem.jpeg' }
      ]
  }
];

toggleLike(review: any) {
  review.liked = !review.liked;
  review.likes += review.liked ? 1 : -1;
}

toggleComment(review:any) {
  review.showCommentBox = !review.showCommentBox;
}

addComment(review: any) {
  if (review.newComment?.trim()) {
    review.comments.push({
      user: 'Você',
      text: review.newComment,
      avatar: 'assets/perfis/homem.jpeg'
    });
    review.newComment = '';
    review.showCommentBox = false;
  }
}

activeReview: any = null;

openCommentPanel(review: any) {
  this.activeReview = review;
}
closeCommentPanel() {
  this.activeReview = null;
}
  constructor() {}
}
