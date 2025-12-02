// push.service.ts (novo)
import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Auth } from '@angular/fire/auth';
import { UserService } from './user.service'; // seu serviço

@Injectable({ providedIn: 'root' })
export class PushService {
  constructor(private auth: Auth, private userService: UserService) {}

  async initAndSaveToken() {
    try {
      const perm = await PushNotifications.requestPermissions();
      if (perm.receive !== 'granted') return;

      await PushNotifications.register();

      PushNotifications.addListener('registration', async (token) => {
        console.log('FCM token', token.value);
        const user = this.auth.currentUser;
        if (user) {
          await this.userService.updateUser(user.uid, { fcmToken: token.value });
        }
      });

      PushNotifications.addListener('pushNotificationReceived', (notif) => {
        console.log('Push recebido', notif);
      });

    } catch (err) {
      console.error('Erro push init', err);
    }
  }
}
