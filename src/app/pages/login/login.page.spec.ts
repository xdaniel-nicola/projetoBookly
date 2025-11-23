import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert("Preencha email e senha");
      return;
    }

    // Simulação de login
    console.log("Login:", this.email, this.password);

    // Caminho da sua home dentro das tabs
    this.router.navigate(['/tabs/tab1']);
  }
}
