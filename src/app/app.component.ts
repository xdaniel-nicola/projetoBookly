import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonToast } from '@ionic/angular/standalone';
import { Permissions } from './services/permissions';
import { PushService } from './services/push-notifications'; // serviço de notificações
import { getRedirectResult, Auth } from '@angular/fire/auth';
import { ToastService } from './services/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>

      <!-- Toast global -->
      <ion-toast
        [isOpen]="isToastOpen"
        [message]="toastMessage"
        position="top"
        duration="2500"
        (didDismiss)="isToastOpen = false">
      </ion-toast>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonToast, CommonModule],
})
export class AppComponent implements OnInit {
  isToastOpen = false;
  toastMessage = '';

  constructor(
    private permissions: Permissions,
    private pushService: PushService,
    private auth: Auth,
    private toastService: ToastService
  ) {
    this.handleRedirect();
    
    this.toastService.toastMessage$.subscribe((msg) => {
      if(msg) {
        this.toastMessage = msg;
        this.isToastOpen = true;
      }
    })
  }

  async ngOnInit() {
    // Solicita as permissões necessárias
    await this.pushService.initAndSaveToken();

    await this.permissions.requestCameraPermission();
  }
  async handleRedirect() {
    try {
      const result = await getRedirectResult(this.auth);

      if (result?.user) {
        console.log("Usuário logado após redirect: ", result.user);
      }
    } catch(err) {
      console.error("Erro no redirect: ", err)
    }
  }
}
