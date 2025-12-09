import { Component, OnInit, inject } from '@angular/core';
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
  IonThumbnail,
  IonBadge,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Notifications, Notification } from '../../services/notifications'
import { Router } from '@angular/router';
import { getFirestore, getDoc, doc } from '@angular/fire/firestore';

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
    IonThumbnail,
    IonBadge,
    IonButton,
    IonIcon
  ]
})
export class Tab4Page implements OnInit {

  // Definição da propriedade notifications
  notifications: Notification[] = [];
  unreadCount: number = 0;
  loading: boolean = true;

  notificationsService = inject(Notifications);
  router = inject(Router);

  ngOnInit() {
    this.loadNotifications();
  }

  fixUrl(url:string | null | undefined): string | null {
    if (!url) return null;
    return url.replace("http://", "https://");
  }

  ionViewWillEnter(){
    this.loadNotifications();
  }

  async loadUserDataForNotifications() {
    for (const notif of this.notifications) {
      if (!notif.triggeredBy) continue;

      const userDoc = await getDoc(doc(getFirestore(), `users/${notif.triggeredBy}`));
      const userData = userDoc.data()
    
      notif.triggeredByUsername = userData?.['username'] || 'Usuário';
      notif.triggeredByAvatar = userData?.['profileImage'] ||
                                userData?.['photoURL'] ||
                                userData?.['avatarUrl'] ||
                                  '../../../assets/perfis/homem.jpeg';
      notif.userDataLoaded = true;
  }
  }

  loadNotifications() {
    this.loading = true;

    this.notificationsService.getUserNotifications().subscribe({
      next: async(notifications) => {
        console.log("Notificações recebidas: ", notifications);
        this.notifications = notifications;

        await this.loadUserDataForNotifications();
        this.updateUnreadCount();
        this.loading = false;
      },
      error: (err) => {
        console.error("Erro ao carregar notificações: ", err);
        this.loading = false;
      }
    });
  }
  async updateUnreadCount() {
    this.unreadCount = await this.notificationsService.getUnreadCount();
  }

  async MarkAsRead(notification: Notification) {
    if (notification.id && !notification.read) {
      await this.notificationsService.markAsRead(notification.id);
      notification.read = true;
      this.updateUnreadCount();
    }
  }

  async markAllAsRead() {
    await this.notificationsService.markAllAsRead();
    this.loadNotifications();
  }

  goToPost(notification: Notification) {
    this.MarkAsRead(notification);
    this.router.navigate(['/tabs/tab3'], {
      queryParams: {postId: notification.postId}
    });
  }

  getNotificationMessage(notification: Notification): string {
    if (notification.type === 'like') {
      return `${notification.triggeredByUsername} curtiu sua avaliação de "${notification.bookTitle}"`;
    } else if (notification.type === 'comment') {
      return `${notification.triggeredByUsername} comentou: "${notification.commentText}"`;
    }
    return '';
  }

  getNotificationIcon(notification: Notification): string {
    return notification.type === 'like' ? 'heart' : 'chatbox';
  }

  getNotificationColor(notification: Notification): string {
    return notification.type === 'like' ? 'danger' : 'primary';
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days} dias atrás`;

    return date.toLocaleDateString('pt-BR')
  }
} 