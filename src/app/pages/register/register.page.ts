import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SignupPage {
  email: string = '';
  fullName: string = '';
  username: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  loading: boolean = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private firestoreService: FirestoreService,
    private toastCtrl: ToastController
  ) {}

  async onContinue() {
    if (!this.email || !this.fullName || !this.username ||!this.phone || !this.password || !this.confirmPassword) {
      this.showToast('Preencha todos os campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('As senhas não conferem.')
    }

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]{2,20}$/
    if (!usernameRegex.test(this.username)) {
      return this.showToast('Nome de usuário inválido.');
    }

    const usernameLower = this.username.toLowerCase();

    const existingUsername = await this.firestoreService.get('usernames', usernameLower);
    if (existingUsername) {
      return this.showToast('Esse nome de usuário já está em uso.');
    }

    this.loading = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: this.fullName
      });

      await this.firestoreService.set('users', user.uid, {
        uid: user.uid,
        email: this.email,
        username: usernameLower,
        fullName: this.fullName,
        phone: this.phone,
        createdAt: new Date()
      });

      await this.firestoreService.set('usernames', usernameLower, {
        uid: user.uid
      });

      this.showToast('Conta criada com sucesso!');

      this.router.navigate(['/login']);

    } catch (err: any) {
      console.error("🔥 Erro completo:", err);
      console.error("🔥 Código:", err.code);
      console.error("🔥 Mensagem:", err.message);
      this.showToast(this.getErrorMessage(err.code));

    } finally {
      this.loading = false;
    }
  }

  formatPhone() {
    this.phone = this.phone.replace(/\D/g, '');
  }

  async showToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }

  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso.';
      case 'auth/invalid-email':
        return 'E-mail inválido.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      default:
        return 'Erro ao criar conta.';
    }
  }


  // onContinue() {
  //   if (this.password !== this.confirmPassword) {
  //     console.error('Senhas não conferem');
  //     return;
  //   }
  //   console.log('Cadastro:', {
  //     email: this.email,
  //     fullName: this.fullName,
  //     phone: this.phone
  //   });
  //   // Implementar lógica de cadastro
  // }

  // formatPhone() {
  //   // Implementar formatação de telefone brasileiro
  //   this.phone = this.phone.replace(/\D/g, '');
  // }
}
