import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes'; // Importa a lista de rotas
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // 1. Estratégia de Roteamento Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // 2. Configuração global do Ionic
    provideIonicAngular(),
    
    // 3. ESSENCIAL: Provedor de Roteamento com suas rotas
    provideRouter(routes), 
  ],
});