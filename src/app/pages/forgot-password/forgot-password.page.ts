import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController, LoadingController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    RouterLink // Necessário para o [routerLink] no HTML
  ]
})
export class ForgotPasswordPage implements OnInit {

  // Objeto para armazenar o número de telefone do formulário
  forgotPasswordForm = {
    phoneNumber: ''
  };

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  // Função chamada ao submeter o formulário
  async onSubmit() {
    const phoneNumber = this.forgotPasswordForm.phoneNumber.trim();

    if (!phoneNumber) {
      this.presentAlert('Erro', 'Por favor, insira um número de telefone válido.');
      return;
    }

    // 1. Mostra o carregamento
    const loading = await this.loadingCtrl.create({
      message: 'Enviando código por SMS...'
    });
    await loading.present();

    try {
      // 2. Lógica de Envio para o Backend (Simulação)
      
      // *** AQUI VOCÊ FARÁ A CHAMADA HTTP PARA SUA API! ***
      // Ex: await this.authService.sendRecoverySms(phoneNumber);
      
      // Simulação de sucesso após 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 3. Sucesso: Opcionalmente, você pode navegar para uma nova tela
      //    para o usuário digitar o código que recebeu por SMS.
      
      this.presentAlert('Sucesso!', `Código enviado para ${phoneNumber}. Redirecionando para a verificação...`);
      
      // Exemplo de redirecionamento para uma tela de verificação de código (Você precisa criar essa rota!)
      // this.navCtrl.navigateRoot('/verify-code');

    } catch (error) {
      // 4. Erro
      console.error('Erro ao solicitar recuperação por SMS:', error);
      this.presentAlert('Erro', 'Não foi possível enviar o código. Verifique o número e tente novamente.');
    } finally {
      // 5. Remove o carregamento
      loading.dismiss();
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}