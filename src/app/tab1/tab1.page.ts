import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent
  ,IonItem
  ,IonInput
  ,IonSearchbar
  ,IonLabel
  ,IonCol
  ,IonRow
  ,IonGrid
  ,IonCard
  ,IonCardHeader
  ,IonCardSubtitle
  ,IonCardTitle
  ,IonCardContent
  ,IonButton
  ,IonIcon
  ,IonInfiniteScroll
  ,IonInfiniteScrollContent
  ,IonAvatar
  ,IonSegment
  ,IonSegmentButton
 } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule
    ,FormsModule
    ,IonicModule
  ],
})

export class Tab1Page implements OnInit {

  authors = [ 
    {
    name: 'Stephen King',
    books: [
      { title: 'Salem', image: 'assets/capas/salem.jpg' },
      { title: 'A Coisa', image: 'assets/capas/it.jpg' },
      { title: 'Não Pisque', image: 'assets/capas/nao-pisque.jpg' }
      ]
    }
  ];
    slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false
  };

  favoriteBooks = [
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
    }
  ];

  terrorBooks = [
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
    }
  ];

  adventureBooks = [
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
    }
  ];

  romanceBooks = [
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

  searchQuery = '';

  constructor() {}

  ngOnInit() {}

  onSearchInput(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    // lógica de busca aqui dps
}

  onBookClick(book: any) {
    console.log('Livro selecionado: ', book);
    // abrir detalhes do livro
  }

  onSectionClick(section: string) {
    console.log('Seção clicada: ', section);
    // abrir a página da categoria
  }
}

