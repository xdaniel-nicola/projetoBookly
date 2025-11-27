import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent
  ,IonItem
  ,IonSearchbar
 } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent
    ,IonItem
    ,IonSearchbar
  ]
})
export class Tab2Page implements OnInit {
  allBooks = [
    {
      id: 1,
      title: 'Salem',
      author: 'Stephen King',
      image: 'assets/capas/salem.jpg',
      category: 'Terror'
    },
    {
      id: 2,
      title: 'It - A Coisa',
      author: 'Stephen King',
      image: 'assets/capas/it.jpg',
      category: 'Terror'
    },
    {
      id: 3,
      title: 'Não Pisque',
      author: 'Autor',
      image: 'assets/capas/nao-pisque.jpg',
      category: 'Terror'
    },
    {
      id: 4,
      title: 'O Exorcista',
      author: 'William Peter Blatty',
      image: 'assets/capas/exorcista.jpg',
      category: 'Terror'
    },
    {
      id: 5,
      title: 'It - A Coisa',
      author: 'Stephen King',
      image: 'assets/capas/it.jpg',
      category: 'Terror'
    },
    {
      id: 6,
      title: 'Não fale com estranhos',
      author: 'Autor',
      image: 'assets/capas/nao-fale.jpg',
      category: 'Terror'
    },
    {
      id: 7,
      title: 'Nosferatu',
      author: 'Autor',
      image: 'assets/capas/nosferatu.jpg',
      category: 'Terror'
    },
    {
      id: 8,
      title: 'Instinto Assassino',
      author: 'Autor',
      image: 'assets/capas/instinto.jpg',
      category: 'Ação e Aventura'
    },
    {
      id: 9,
      title: 'Coraline',
      author: 'Neil Gaiman',
      image: 'assets/capas/coraline.jpg',
      category: 'Ação e Aventura'
    },
    {
      id: 10,
      title: 'Amanhecer na Colheita',
      author: 'Autor',
      image: 'assets/capas/amanhecer.jpg',
      category: 'Ação e Aventura'
    },
    {
      id: 11,
      title: 'Princesa das Cinzas',
      author: 'Autor',
      image: 'assets/capas/princesa.jpg',
      category: 'Ação e Aventura'
    },
    {
      id: 12,
      title: 'Teto para Dois',
      author: 'Autor',
      image: 'assets/capas/teto-para-dois.jpg',
      category: 'Romance'
    },
    {
      id: 13,
      title: 'Se não fosse você',
      author: 'Autor',
      image: 'assets/capas/se-nao-fosse-voce.jpg',
      category: 'Romance'
    },
    {
      id: 14,
      title: 'A Hipótese do Amor',
      author: 'Ali Hazelwood',
      image: 'assets/capas/hipotese.jpg',
      category: 'Romance'
    }
  ];

  filteredBooks = [...this.allBooks];
  searchQuery: string = '';
  
  constructor() {}

  items: string[] = [];

  ngOnInit() {}

  onSearchInput(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filteredBooks = this.allBooks.filter(book => 
      book.title.toLowerCase().includes(this.searchQuery) ||
      book.author.toLowerCase().includes(this.searchQuery)
    );
  }

  onBookClick(book: any) {
    console.log('Livro clicado:', book)
  }


}
