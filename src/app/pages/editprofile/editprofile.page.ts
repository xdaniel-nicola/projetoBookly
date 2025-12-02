import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth, updateProfile, updateEmail, updatePassword } from '@angular/fire/auth';
import { FirestoreService } from '../../services/firestore';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EditProfilePage {
  profile: any = {
    uid: '',
    email: '',
    fullName: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: FirestoreService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
    
  ) {
    const nav = this.router.currentNavigation();
    console.log('Dados recebidos', this.profile);
    if (nav?.extras?.state?.['user']) {
      this.profile = nav.extras.state['user'];
    }
  }
  goBack() {
    this.router.navigate(['/tabs/tab5']);
    console.log('Going back');
  }
  async ngOnInit() {
    const currentUser = this.auth.currentUser;

    if (!currentUser) return;
    const userData: any = await this.firestore.get('users', currentUser.uid);

    if (userData) {
      this.profile.email = userData.email;
      this.profile.fullName = userData.fullName;
      this.profile.username = userData.username;
      this.profile.phone = userData.phone;
      this.profile.password = '';
      this.profile.confirmPassword = '';
    }
  }
  async onSalvar() {
    console.log('Dados recebidos quando foi salvar', this.profile);

    const user = this.auth.currentUser;
    if (!user) return;

    if (this.profile.password && this.profile.password !== this.profile.confirmPassword) {
      this.showToast('As senhas não coincidem.');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Salvando...'});
    await loading.present();

    try {
      await updateProfile(user, {
        displayName: this.profile.fullName,
        photoURL: this.profile.photoURL
      });

      if (this.profile.email !== user.email) {
        await updateEmail(user, this.profile.email);
      }

      if (this.profile.password) {
        await updatePassword(user, this.profile.password);
      }

      await this.firestore.update('users', user.uid, {
        email: this.profile.email,
        fullName: this.profile.fullName,
        username: this.profile.username,
        celular: this.profile.phone,
        photoURL: this.profile.photoURL,
        updatedAt: new Date()
      });

      this.showToast('Perfil atualizado com sucesso!');
      this.router.navigate(['/tabs/tab5']);
    } catch (error: any) {
      console.log(error);
      this.showToast('Erro ao atualizar o perfil: ' + error.message);
    }
    loading.dismiss();
  }

  async showToast(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top'
    });
    t.present();
  }


  onChangeProfilePicture() {
    console.log('Mudar foto de perfil');
    // Implementar lógica de mudança de foto
  }
}
