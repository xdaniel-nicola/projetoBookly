import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditpostPage } from './editpost.page';

describe('EditpostPage', () => {
  let component: EditpostPage;
  let fixture: ComponentFixture<EditpostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
