import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Permissions } from './services/permissions';
import { PushNotifications } from '@capacitor/push-notifications';
import { notifications, push } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private permissionsService: Permissions) {}

  async ngOnInit() {
    await this.initNotifications();

    await this.permissionsService.requestNotificationPermission();

    await this.permissionsService.requestCameraPermission()
  }

  async initNotifications() {
    const permStatus = await PushNotifications.requestPermissions();
    if(permStatus.receive === 'granted') {
      await PushNotifications.register();
    }

    PushNotifications.addListener('registration', token => {
      console.log('Token de push', token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Notificação recebida: ', notification);
    })
  }
}
