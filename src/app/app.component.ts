import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Permissions } from './services/permissions';
import { PushService } from './services/push-notifications'; // serviço de notificações

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private permissions: Permissions,
    private pushService: PushService
  ) {}

  async ngOnInit() {
    // Solicita as permissões necessárias
    await this.pushService.initAndSaveToken();
  }
}
