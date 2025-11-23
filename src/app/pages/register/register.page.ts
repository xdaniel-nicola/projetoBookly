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

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  // IMPORTANTE: Aqui incluímos todos os componentes Ionic usados no template HTML
  imports: [
    CommonModule, 
    FormsModule, 
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
export class RegisterPage implements OnInit {
  // Modelos para o formulário
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor() { }

  ngOnInit() {
  }

  // CORREÇÃO do erro TS2339: Define a função 'cadastrar'
  cadastrar() {
    // Apenas para teste, implemente a lógica real de autenticação Firebase aqui
    if (this.password !== this.confirmPassword) {
      console.error("As palavras-passe não coincidem.");
      return;
    }
    
    console.log('A tentar registar utilizador com email:', this.email);
    // Ex: Aqui seria a chamada ao serviço de autenticação (e.g., createUserWithEmailAndPassword)
    
    // Sucesso temporário
    console.log('Registo simulado com sucesso!');
  }
}