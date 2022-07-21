import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacionaisComponent } from './nacionais.component';

describe('NacionaisComponent', () => {
  let component: NacionaisComponent;
  let fixture: ComponentFixture<NacionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NacionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NacionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
