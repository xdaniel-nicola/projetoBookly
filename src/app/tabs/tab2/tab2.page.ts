import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent
  ,IonItem
  ,IonSearchbar
  ,IonLabel
  ,IonThumbnail
  ,IonList
 } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent
    ,IonItem
    ,IonSearchbar
    ,IonLabel
    ,IonThumbnail
    ,IonList
  ]
})
export class Tab2Page {
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

 searchResults: any[] = [];
 
   constructor(private booksService: BooksService, private router: Router) {}

   openBook(book:any) {
      this.router.navigate(['/post-books', book.id], {
      state: { book }
    })
   }
 
   async search(query: string | null | undefined) {
     if (!query || query.trim() === '') {
       this.searchResults = [];
       return;
     }
 
     this.booksService.searchBooks(query).subscribe({
       next: (res: any) => {
         this.searchResults = res;
       },
       error: (err) => {
         console.error('Erro ao buscar livros: ', err);
       }
     })
   }

   getBestImage(book: any): string | null {
  if (!book?.thumbnail) return null;

  const links = book.thumbnail;

  // ordem de prioridade do maior para o menor
  return (
    links.extraLarge ||
    links.large ||
    links.medium ||
    links.small ||
    links.thumbnail ||
    links.smallThumbnail ||
    null
  );
}

 }