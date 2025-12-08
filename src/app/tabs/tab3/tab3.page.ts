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
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Capacitor } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';

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

  firestore = inject(Firestore);
  postsService = inject(PostsService);
  activeRoute = inject(ActivatedRoute);

ngOnInit() {
  this.loadPosts();
}

async scrollToPost(postId: string) {
  const element = document.getElementById(`post-${postId}`);

  if(!element) {
    console.warn("Post não encontrado ainda, tentando novamente...");
    setTimeout(() => this.scrollToPost(postId), 400);
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

ionViewDidEnter() {
  this.activeRoute.queryParams.subscribe(params => {
    const postId = params['postId'];
    if (postId) {
      this.scrollToPost(postId)
    }
  })
}
loadPosts() {
    this.postsService.getPostsRealtime().subscribe({
      next: (posts: any[]) => {
        console.log("POSTS RECEBIDOS:", posts);
        this.reviews = posts;
        console.log("POSTS PROCESSADOS:", this.reviews);
        for (const review of this.reviews) {
          this.loadUserDataForComments(review);
        }
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

async loadUserDataForComments(review: any) {
  for (const comment of review.comments) {
    if (!comment.userId) continue;

    const userDoc = await getDoc(doc(this.firestore, `users/${comment.userId}`));
    const userData = userDoc.data();

    comment.user = userData?.['username'] || "Usuário";
    comment.photoURL = userData?.['profileImage'] || "../../../assets/perfis/homem.jpeg";
    comment.userDataLoaded = true;
  }
}

  convertImage (path: string) {
    if (!path) return null;
    return Capacitor.convertFileSrc(path);
  }

  async openCommentPanel(review: any) {
    this.activeReview = {
      ...review,
      comments: review.comments || [],
      newComment: ''};
  

  for (let c of this.activeReview.comments) {
    if (!c.userId) continue;

    const userDoc = await getDoc(doc(this.firestore, `users/${c.userId}`));
    const userData = userDoc.data();

    c.username = userData?.['username'] || "Usuário";
    c.photoURL = userData?.['photoURL']
    ? this.convertImage(userData['photoURL'])
    : "../../../assets/perfis/homem.jpeg"
    }
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
