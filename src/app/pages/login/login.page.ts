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
  
  isEmail(value: string): boolean {
    return value.includes('@') && value.includes('.');
  }

  async onContinue() {
    if (!this.email || !this.password) {
      return this.showToast('Preencha todos os campos.');
    }

    try{
      let emailParaLogin = this.email;

      if (!this.isEmail(this.email)) {
        const result = await this.firestoreService.find('users',
          ['username', '==', this.email]
        );

        if (!result || result.length === 0) {
          return this.showToast('Usuário não encontrado.');
        }

        emailParaLogin = result[0].email;
      }

      const cred = await signInWithEmailAndPassword(
        this.auth,
        emailParaLogin,
        this.password
      );
      
      const uid = cred.user.uid;
      const userData = await this.firestoreService.get('users', uid);

      if (!userData) {
        await this.firestoreService.set('users', uid, {
          uid,
          email: cred.user.email,
          name: cred.user.displayName || 'Usuário',
          photoURL: cred.user.photoURL || null,
          username: null
        });
      }

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
      if (!userData) {
        await this.firestoreService.set('users', uid, {
          uid,
          email: cred.user.email,
          name: cred.user.displayName,
          photoURL: cred.user.photoURL,
          username: null
        });
      }

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
}
