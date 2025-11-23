import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList 
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  // IMPORTANTE: Incluir todos os componentes Ionic e módulos necessários
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink, // Necessário para routerLink="/register" no HTML
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonList
  ],
  standalone: true
})
export class LoginPage implements OnInit {
  // Variáveis para o formulário de login (assumindo email e senha)
  email!: string;
  senha!: string;

  constructor() { }

  ngOnInit() {
  }

  // Define a função 'entrar' que é provavelmente chamada no HTML do login
  entrar() {
    // Implemente aqui a lógica real de autenticação com Firebase (signInWithEmailAndPassword)
    console.log('A tentar entrar com email:', this.email);
    console.log('Senha (não mostrada em produção):', this.senha);
    
    // Sucesso temporário (aqui deve vir a navegação para a página de 'tabs')
    // Ex: this.router.navigate(['/tabs']);
    console.log('Login simulado com sucesso!');
  }
}