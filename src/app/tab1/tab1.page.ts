import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common'; // NgFor para *ngFor
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router'; // ⬅️ Necessário para o routerLink nos botões

// Interfaces para tipagem dos dados
interface Book {
  title: string;
  author: string;
  image: string;
}

interface Author {
  name: string;
  books: Book[];
}

// 🚨 Importações de todos os componentes Ionic usados no HTML
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonSearchbar, 
  IonSegment,   
  IonSegmentButton, 
  IonLabel,
  IonIcon,
  IonButtons, // ⬅️ Componente para agrupar botões na toolbar (Login/Cadastro)
  IonButton   // ⬅️ Componente Botão
} from '@ionic/angular/standalone'; 


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    NgFor, // Adicionado para suportar *ngFor
    RouterLink, // Adicionado para suportar routerLink
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonSearchbar, 
    IonSegment, 
    IonSegmentButton, 
    IonLabel,
    IonIcon,
    IonButtons, // Incluído na lista de imports
    IonButton   // Incluído na lista de imports
  ],
})
export class Tab1Page implements OnInit {

  // Dados Mockados (Exemplo)
  public authors: Author[] = [
    { name: 'Stephen King', books: [
      { title: 'It', author: 'S. King', image: 'https://placehold.co/100x150/505050/ffffff?text=SK1' },
      { title: 'Carrie', author: 'S. King', image: 'https://placehold.co/100x150/505050/ffffff?text=SK2' },
      { title: 'The Shining', author: 'S. King', image: 'https://placehold.co/100x150/505050/ffffff?text=SK3' },
    ]},
    // ... adicione mais autores se quiser
  ];

  public terrorBooks: Book[] = [
    { title: 'Livro Terror A', author: 'Autor 1', image: 'https://placehold.co/100x150/004c00/ffffff?text=TerrorA' },
    { title: 'Livro Terror B', author: 'Autor 2', image: 'https://placehold.co/100x150/004c00/ffffff?text=TerrorB' },
    { title: 'Livro Terror C', author: 'Autor 3', image: 'https://placehold.co/100x150/004c00/ffffff?text=TerrorC' },
  ];

  public adventureBooks: Book[] = [
    { title: 'Aventura X', author: 'A. Autor', image: 'https://placehold.co/100x150/00004c/ffffff?text=AventuraX' },
    { title: 'Aventura Y', author: 'B. Autor', image: 'https://placehold.co/100x150/00004c/ffffff?text=AventuraY' },
  ];

  public romanceBooks: Book[] = [
    { title: 'Romance P', author: 'R. Autor', image: 'https://placehold.co/100x150/4c0000/ffffff?text=RomanceP' },
    { title: 'Romance Q', author: 'S. Autor', image: 'https://placehold.co/100x150/4c0000/ffffff?text=RomanceQ' },
  ];

  constructor() {}

  ngOnInit() {
    // Lógica de inicialização
  }

  // Métodos de Eventos (requeridos pelo seu HTML)
  
  onSearchInput(event: any) {
    const searchTerm = event.detail.value;
    console.log('Termo de pesquisa:', searchTerm);
    // Implemente a lógica de filtro
  }

  onSectionClick(section: string) {
    console.log('Seção clicada para ver todos:', section);
    // Implemente a navegação para a página de listagem da seção
  }

  onBookClick(book: Book) {
    console.log('Livro clicado:', book.title);
    // Implemente a navegação para a página de detalhes do livro
  }
}