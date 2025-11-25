import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  IonIcon,
  // Adicionamos os controladores necessários para alertas de erro
  AlertController, 
  LoadingController
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
  
  // Propriedade para armazenar os dados do formulário (CORRIGIDO TS2339)
  public registrationForm = {
    fullName: '',      // <<-- ADICIONADO
    phoneNumber: '',   // <<-- ADICIONADO
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  public isPasswordVisible: boolean = false;
  public isConfirmPasswordVisible: boolean = false;

  constructor(
    private alertCtrl: AlertController, // Injetando para mostrar alertas de erro
    private loadingCtrl: LoadingController // Opcional, para mostrar carregamento
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  
  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  // Helper para mostrar alerta
  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Erro de Validação',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Método que será chamado ao clicar no botão de Cadastro
   */
  async onRegister() {
    
    // --- 1. VALIDAÇÃO DE COINCIDÊNCIA DE SENHAS ---
    if (this.registrationForm.password !== this.registrationForm.confirmPassword) {
      await this.presentAlert('As senhas digitadas não coincidem.');
      return; 
    }

    // --- 2. VALIDAÇÃO ADICIONAL DE TELEFONE (Apesar da validação no HTML) ---
    const cleanedPhoneNumber = this.registrationForm.phoneNumber.replace(/\D/g, ''); 
    const phonePattern = /^\d{10,11}$/;
    
    if (!phonePattern.test(cleanedPhoneNumber)) {
      // Este erro deve ser raro se o botão estiver desabilitado, mas é um bom backup
      await this.presentAlert('O número de telefone é inválido. Use 10 ou 11 dígitos (apenas números).');
      return;
    }
    
    // Se passou por todas as validações manuais e do template:
    const loading = await this.loadingCtrl.create({ message: 'Registrando...' });
    await loading.present();

    try {
      // ** AQUI VAI A LÓGICA DE CHAMADA HTTP PARA A API/BACKEND **
      console.log('Dados prontos para envio:', this.registrationForm);
      
      // Simulação de sucesso
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // Exemplo de navegação após o sucesso
      // this.navCtrl.navigateRoot('/tabs/tab1'); 
      
      await this.presentAlert('Cadastro realizado com sucesso!');
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      await this.presentAlert('Não foi possível completar o cadastro. Tente novamente.');
    } finally {
      loading.dismiss();
    }
  }
}