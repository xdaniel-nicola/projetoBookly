import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // Para o link de "Já tem conta?"

// Importações dos componentes Ionic
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton, // Para o botão de voltar na barra superior
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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage implements OnInit {
  
  // Propriedade para armazenar os dados do formulário
  public registrationForm = {
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  };

  public isPasswordVisible: boolean = false;
  public isConfirmPasswordVisible: boolean = false;

  constructor() {
    // Adiciona os ícones que serão usados no botão de "mostrar senha"
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  /**
   * Alterna a visibilidade da senha (para o input de senha principal).
   */
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  
  /**
   * Alterna a visibilidade da confirmação de senha.
   */
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  /**
   * Método que será chamado ao clicar no botão de Cadastro
   */
  onRegister() {
    // Aqui você adicionará a lógica de validação e autenticação (e-mail, Firebase, etc.)
    console.log('Tentativa de Cadastro:', this.registrationForm);
    
    if (this.registrationForm.password !== this.registrationForm.confirmPassword) {
      // Usar um componente de alerta Ionic real, em vez de alert()
      console.error('As senhas não coincidem!');
      // Implemente um toast ou modal de erro aqui!
      return;
    }

    // Lógica para enviar dados de cadastro...
    // router.navigateByUrl('/tabs/tab1'); // Exemplo de navegação após o sucesso
  }
}