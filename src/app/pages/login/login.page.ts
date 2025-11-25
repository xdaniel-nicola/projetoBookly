import { ChangeDetectionStrategy, Component, signal } from '@angular/core'; // ⬅️ CORRIGIDO: Removido '/core'
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importado para resolver NG2011

@Component({
  selector: 'app-login',
  template: `
    <ion-content class="ion-padding flex flex-col items-center justify-center h-full bg-gray-100">
      <div class="w-full max-w-md p-6">
        <ion-card class="shadow-xl rounded-xl">
          <ion-card-header class="text-center bg-blue-600 text-white rounded-t-xl">
            <ion-card-title class="text-2xl font-bold py-2">
              <span class="text-white">Acesso do Usuário</span>
            </ion-card-title>
          </ion-card-header>

          <ion-card-content class="ion-padding-vertical">
            <form (ngSubmit)="handleLogin()">
              
              <ion-item fill="outline" class="mb-4 rounded-lg">
                <ion-label position="floating">Nome de Usuário</ion-label>
                <ion-input
                  type="text"
                  [(ngModel)]="username"
                  name="username"
                  required
                ></ion-input> 
              </ion-item>

              <ion-item fill="outline" class="mb-6 rounded-lg">
                <ion-label position="floating">Senha</ion-label>
                <ion-input
                  type="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                ></ion-input>
              </ion-item>

              @if (errorMsg()) {
                <ion-note color="danger" class="block mb-4 text-center">
                  {{ errorMsg() }}
                </ion-note>
              }

              <ion-button 
                type="submit" 
                expand="block" 
                size="large" 
                [disabled]="isLoggingIn()"
                class="rounded-lg shadow-md transition-transform transform hover:scale-[1.01]"
              >
                @if (isLoggingIn()) {
                  <ion-spinner name="crescent" class="mr-2"></ion-spinner>
                  Entrando...
                } @else {
                  Entrar
                }
              </ion-button>
            </form>

            <div class="text-center mt-4">
              <ion-note>
                Usuário teste: <strong>user</strong> / Senha teste: <strong>pass</strong>
              </ion-note>
            </div>

            <div class="text-center mt-6">
              <ion-note class="text-gray-600">
                Não tem uma conta? 
                <a [routerLink]="['/register']" class="text-blue-600 hover:text-blue-800 font-medium">Cadastre-se</a>
              </ion-note>
            </div>

          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styleUrls: ['./login.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonicModule 
  ],
})
export class LoginPage {
  username = signal('');
  password = signal('');
  isLoggingIn = signal(false);
  errorMsg = signal<string | null>(null);

  constructor() {}

  async handleLogin() {
    this.isLoggingIn.set(true);
    this.errorMsg.set(null);

    try {
      const success = await this.simulateLogin(this.username(), this.password());
      if (success) {
        console.log('Login bem-sucedido!');
        // Se precisar do router: inject(Router).navigate(['/home']); 
      }
    } catch (error) {
      if (error instanceof Error) {
        this.errorMsg.set(error.message);
      } else {
        this.errorMsg.set('Ocorreu um erro desconhecido durante o login.');
      }
      console.error('Erro de Login:', error);
    } finally {
      this.isLoggingIn.set(false);
    }
  }

  private simulateLogin(user: string, pass: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === 'user' && pass === 'pass') {
          resolve(true); 
        } else {
          reject(new Error('Credenciais inválidas. Tente "user" e "pass".'));
        }
      }, 2000); 
    });
  }
}