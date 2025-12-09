import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private base = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = environment.googleBooksApiKey;

  constructor(private http: HttpClient) {}

  sanitizeImage(url: string) {
    return url ? url.replace(/^http:\/\//i, 'https://') : null;
  }


searchBooks(query: string, startIndex = 0, maxResults = 20) {
  let params = new HttpParams()
    .set('q', query)
    .set('startIndex', String(startIndex))
    .set('maxResults', String(maxResults))
    .set('projection', 'full')
    .set('key', this.apiKey);

  return this.http.get<any>(this.base, { params }).pipe(
    map(resp =>
      resp.items?.map((v: any) => this.mapVolumeToModel(v)) || []
    )
  );
}



getBookById(id: string) {
  let params = new HttpParams().set('key', this.apiKey);
  return firstValueFrom(this.http.get(`${this.base}/${id}`, { params }));
}


  searchByCategory(category: string, max = 20) {
    const url = `${this.base}?q=subject:${encodeURIComponent(category)}&maxResults=${max}&key=${this.apiKey}`;
    return firstValueFrom(
      this.http.get(url).pipe(
        map((resp: any) =>
          resp.items?.map((v: any) => this.mapVolumeToModel(v)) || []
        )
      )
    );
  }

  mapVolumeToModel(vol: any) {
    const vi = vol.volumeInfo || {};

    const thumbnail = this.sanitizeImage(
      vi.imageLinks?.thumbnail ||
      vi.imageLinks?.smallThumbnail ||
      null
    );

    return {
      id: vol.id,
      title: vi.title || '',
      subtitle: vi.subtitle || '',
      authors: vi.authors || [],
      publisher: vi.publisher || '',
      publishedDate: vi.publishedDate || '',
      description: vi.description || '',
      isbn: (vi.industryIdentifiers || [])
        .find((i: any) => i.type === 'ISBN_13')?.identifier || null,
      pageCount: vi.pageCount || null,
      categories: vi.categories || [],
      averageRating: vi.averageRating || null,
      ratingsCount: vi.ratingsCount || null,
      thumbnail: thumbnail,
      previewLink: vi.previewLink || null,
      infoLink: vi.infoLink || null
    };
  }
}
