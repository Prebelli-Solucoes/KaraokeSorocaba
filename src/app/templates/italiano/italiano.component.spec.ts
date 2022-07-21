import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItalianoComponent } from './italiano.component';

describe('ItalianoComponent', () => {
  let component: ItalianoComponent;
  let fixture: ComponentFixture<ItalianoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItalianoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItalianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
