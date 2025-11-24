import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Para navegação e link de "Criar conta"

// Importações dos componentes Ionic
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton, 
  IonButton,
  IonItem, 
  IonInput, 
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonBackButton,
    IonButton,
    IonItem, 
    IonInput, 
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon
  ],
})
export class LoginPage implements OnInit {
  
  // Propriedade para armazenar os dados do formulário
  public loginForm = {
    email: '',
    password: ''
  };

  public isPasswordVisible: boolean = false;

  constructor(private router: Router) {
    // Adiciona os ícones que serão usados no botão de "mostrar senha"
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  /**
   * Alterna a visibilidade da senha.
   */
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Método que será chamado ao clicar no botão de Login
   */
  onLogin() {
    // Aqui você adicionará a lógica de autenticação (e-mail e senha)
    console.log('Tentativa de Login:', this.loginForm);
    
    // Simulação de login bem-sucedido
    if (this.loginForm.email && this.loginForm.password) {
      // Navega de volta para a tela inicial (Home) após o login
      this.router.navigateByUrl('/tabs/tab1');
    } else {
      // Implemente um toast ou modal de erro aqui!
      console.error('Por favor, preencha E-mail e Senha.');
    }
  }
}