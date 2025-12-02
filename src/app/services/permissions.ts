import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class Permissions {

  async requestNotificationPermission() {
    const permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive === 'granted') {
      await PushNotifications.register();
      console.log('Notificações permitidas');
    } else {
      console.log('Permissão de notificações negada');
    }
  }

  async requestCameraPermission() {
    const permStatus = await Camera.requestPermissions();
    console.log('Perimssão da câmera: ', permStatus)
  }
  async pickImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    return image.dataUrl;
  }
  
}
