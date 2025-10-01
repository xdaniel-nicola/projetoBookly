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
    comments: ['Concordo!', 'Achei bem escrito mesmo assim.']
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
    comments: ['Sério?', 'Também reparei nisso!']
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
    comments: ['Concordo muito!', 'O final foi meio corrido.']
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
    comments: ['Sério?', 'Essa autora é ótima!']
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
    review.comments.push(review.newComment);
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
