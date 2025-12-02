import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private base = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = environment.googleBooksApiKey;

  constructor(private http: HttpClient) {}

  searchBooks(query: string, startIndex = 0, maxResults = 20) {
    let params = new HttpParams()
      .set('q', query)
      .set('startIndex', String(startIndex))
      .set('maxResults', String(maxResults))
      .set('projection', 'full')
      .set('key', this.apiKey);

      const url = `${this.base}?q=${query}&key=${environment.googleBooksApiKey}`;
      return this.http.get(url);
    // const resp: any = await firstValueFrom(this.http.get(this.base, { params }));
    // return resp.items?.map((v: any) => this.mapVolumeToModel(v)) || [];
  }

  getBookById(id: string) {
    let params = new HttpParams().set('key', this.apiKey);
    return firstValueFrom(this.http.get(`$(this.baseUrl}/${id})`))
  }

  searchByCategory(category: string, max = 20) {
    let params = new HttpParams()
    .set('q', `subject:${category}`)
    .set('maxResults', String(max))
    .set('key', this.apiKey);

    return firstValueFrom(this.http.get(this.base, { params }))
  }

  mapVolumeToModel(vol: any) {
    const vi = vol.volumeInfo || {};

    return {
      id: vol.id,
      title: vi.title || '',
      subtitle: vi.subtitle || '',
      authors: vi.authors || [],
      publisher: vi.publisher || '',
      publishedDate: vi.publishedDate || '',
      description: vi.description || '',
      isbn:
        (vi.industryIdentifiers || []).find((i: any) => i.type === 'ISBN_13')?.identifier ||
        null,
      pageCount: vi.pageCount || null,
      categories: vi.categories || [],
      averageRating: vi.averageRating || null,
      ratingsCount: vi.ratingsCount || null,
      thumbnail:
        vi.imageLinks?.thumbnail ||
        vi.imageLinks?.smallThumbnail ||
        null,
      previewLink: vi.previewLink || null,
      infoLink: vi.infoLink || null
    };
  }
}
