import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FirestoreService } from '../../services/firestore';
import { ToastService } from 'src/app/services/toast-service';

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
    private toastCtrl: ToastController,
    private toastService: ToastService
  ) {}

  async onContinue() {
    if (!this.email || !this.fullName || !this.username ||!this.phone || !this.password || !this.confirmPassword) {
      this.toastService.show('Preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return this.toastService.show('E-mail inválido.');
    }

    const onlyNumbers = this.phone.replace(/\D/g, '');
    if (onlyNumbers.length < 10 || onlyNumbers.length > 11) {
      return this.toastService.show('Número de telefone inválido.');
    }

    const cleanedPhone = onlyNumbers;

    if (!this.username.startsWith('@')) {
      this.username = '@' + this.username;
    }

    const usernameClean = this.username.replace('@', "").toLowerCase();

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]{2,20}$/;
    if (!usernameRegex.test(usernameClean)) {
      return this.toastService.show('Nome de usuário inválido.');
    }

    const usernameLower = this.username.toLowerCase();

    const existingUsername = await this.firestoreService.get('usernames', usernameLower);
    if (existingUsername) {
      return this.toastService.show('Esse nome de usuário já está em uso.');
    }

    if (this.password.length < 6) {
      return this.toastService.show('A senha deve ter pelo menos 6 caracteres.');
    }

    if (this.password !== this.confirmPassword) {
      return this.toastService.show('As senhas não conferem.');
    }

    this.loading = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const user = userCredential.user;

      await updateProfile(user, {displayName: this.fullName });

      await this.firestoreService.set('users', user.uid, {
        uid: user.uid,
        email: this.email,
        username: usernameClean,
        fullName: this.fullName,
        phone: cleanedPhone,
        photoURL: null,
        createdAt: new Date()
      });

      await this.firestoreService.set('usernames', usernameClean, {
        uid: user.uid
      });

      this.toastService.show('Conta criada com sucesso!');
      this.router.navigate(['/login']);
    } catch (err: any) {
      console.error(err);
      this.toastService.show(this.getErrorMessage(err.code));
    } finally {
      this.loading = false;
    }
  }

  formatPhone() {
    let v = this.phone.replace(/\D/g, '');

    if (v.length > 11) v = v.slice(0,11);

    if (v.length <=10 ) {
      this.phone = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      this.phone = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  }

  onUsernameInput() {
    if (!this.username.startsWith('@')) {
      this.username = '@' + this.username;
    }
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
