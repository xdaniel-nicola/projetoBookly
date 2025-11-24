import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SigninPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onContinue() {
    console.log('Login:', this.email, this.password);
    // Implementar lógica de autenticação
  }

  onGoogleLogin() {
    console.log('Login com Google');
    // Implementar autenticação Google
  }

  onAppleLogin() {
    console.log('Login com Apple');
    // Implementar autenticação Apple
  }
}
