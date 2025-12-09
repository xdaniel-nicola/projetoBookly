import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Permissions } from './services/permissions';
import { PushService } from './services/push-notifications'; // serviço de notificações
import { getRedirectResult, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private permissions: Permissions,
    private pushService: PushService,
    private auth: Auth
  ) {this.handleRedirect();}

  async ngOnInit() {
    // Solicita as permissões necessárias
    await this.pushService.initAndSaveToken();
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
