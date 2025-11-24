import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page'; // Garante que este ficheiro exporta 'TabsPage'

export const routes: Routes = [
  {
    path: '', // Este path define o layout principal das abas
    component: TabsPage,
    children: [
      // 1. Rota da Tab 1
      {
        path: 'tab1',
        loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page)
      },
      // 2. Rota da Tab 2
      {
        path: 'tab2',
        loadComponent: () => import('./tab2/tab2.page').then(m => m.Tab2Page)
      },
      // 3. Rota da Tab 3
      {
        path: 'tab3',
        loadComponent: () => import('./tab3/tab3.page').then(m => m.Tab3Page)
      },
      // 4. Rota da Tab 4
      {
        path: 'tab4',
        loadComponent: () => import('./tab4/tab4.page').then(m => m.Tab4Page)
      },
      // 5. Rota da Tab 5
      {
        path: 'tab5',
        loadComponent: () => import('./tab5/tab5.page').then(m => m.Tab5Page)
      },
      // Rota de Redirecionamento Padrão (Redireciona para a primeira aba)
      {
        path: '',
        redirectTo: 'tab1', // CORREÇÃO: Usa o caminho relativo
        pathMatch: 'full'
      }
    ]
  }
];
// Certifique-se de que NÃO HÁ NADA abaixo deste ponto no arquivo.