import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurosSimplesComponent } from './juros-simples.component';

describe('JurosSimplesComponent', () => {
  let component: JurosSimplesComponent;
  let fixture: ComponentFixture<JurosSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JurosSimplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JurosSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
