import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostBooksPage } from './post-books.page';

describe('PostBooksPage', () => {
  let component: PostBooksPage;
  let fixture: ComponentFixture<PostBooksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
