import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FirestoreService } from '../../services/firestore'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SigninPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private auth: Auth,
    private firestoreService: FirestoreService,
    private toastCtrl: ToastController
) {}

  async onContinue() {
    if (!this.email || !this.password) {
      return this.showToast('Preencha todos os campos.');
    }

    try {
      const cred = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      const uid = cred.user.uid;

      const userData = await this.firestoreService.get('users', uid);
      console.log('Dados do usuário: ', userData);

      this.showToast('Login realizado com sucesso!');

      this.router.navigate(['/tabs/tab1']);
    } catch (err: any) {
      console.error(err);
      this.showToast(this.translateError(err.code));
    }
  }

  async onGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(this.auth, provider);

      const uid = cred.user.uid;

      const userData = await this.firestoreService.get('users', uid);
      console.log('Dados do usuário: ', userData);

      this.showToast('Login com Google realizado!');
      this.router.navigate(['/tabs/tab1']);
    } catch (err: any) {
      console.error(err);
      this.showToast('Erro ao entrar com Google.');
    }
  }

  async showToast(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top'
    });
    t.present();
  }

  translateError(code: string): string {
    const errors: any = {
      "auth/invalid-email": "E-mail inválido.",
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/too-many-requests": "Tentativas em excesso. Tente novamente mais tarde."
    };
    return errors[code] || 'Erro ao fazer login.'
  }
  // onContinue() {
  //   console.log('Login:', this.email, this.password);
  //   // Implementar lógica de autenticação
  // }

  // onGoogleLogin() {
  //   console.log('Login com Google');
  //   // Implementar autenticação Google
  // }

  // onAppleLogin() {
  //   console.log('Login com Apple');
  //   // Implementar autenticação Apple
  // }
}
