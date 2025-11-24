import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage {
  email: string = '';
  fullName: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onContinue() {
    if (this.password !== this.confirmPassword) {
      console.error('Senhas não conferem');
      return;
    }
    console.log('Cadastro:', {
      email: this.email,
      fullName: this.fullName,
      phone: this.phone
    });
    // Implementar lógica de cadastro
  }

  formatPhone() {
    // Implementar formatação de telefone brasileiro
    this.phone = this.phone.replace(/\D/g, '');
  }
}
