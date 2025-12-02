import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent
  ,IonIcon
  ,IonTextarea
  ,IonButton
 } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { PostsService } from '../../services/posts';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent
    ,IonIcon
    ,IonTextarea
    ,IonButton
    ,FormsModule
    ,CommonModule
  ],
})
export class Tab3Page implements OnInit {

reviews: any[] = [];
activeReview: any = null;


  postsService = inject(PostsService)

ngOnInit() {
  this.loadPosts();
}
loadPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        console.log("POSTS RECEBIDOS:", posts);
        this.reviews = posts;
        console.log("POSTS PROCESSADOS:", this.reviews);
      },
      error: (err) => {
        console.error("ERRO AO LER POSTS:", err);
      }
    });
  }

toggleLike(review: any) {
  this.postsService.toggleLike(review)
    .then((res: any) => {
      if (!res) return;
      review.liked = res.liked;
      review.likes = res.likes;
    })
    .catch(err => {
      console.error("Erro no toggleLike:", err);
    });
}


  openCommentPanel(review: any) {
    this.activeReview = {...review,newComment: ''};
  }

  closeCommentPanel() {
    this.activeReview = null;
  }

  addComment(review: any) {
    if (!review.newComment?.trim()) return;

    const commentText= review.newComment.trim();

    this.postsService.addComment(review.id, commentText).then(() => {
      review.newComment = '';
      this.closeCommentPanel();
      this.loadPosts();
    });
  }

}
