import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurosSimplesComponent } from './juros-simples.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('JurosSimplesComponent', () => {
  let component: JurosSimplesComponent;
  let fixture: ComponentFixture<JurosSimplesComponent>;
  let formControls: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurosSimplesComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JurosSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formControls = component.jurosCompostosForm.controls;
  });

  function testSimpleInterest(
    capitalInicial: number,
    taxaDeJuros: number,
    tempo: number,
    tipoTempo: string,
    expectedMontanteFinal: number,
    aporteMensal?: number
  ) {
    formControls.capitalInicial.setValue(capitalInicial);
    formControls.taxaDeJuros.setValue(taxaDeJuros);
    formControls.tempo.setValue(tempo);
    formControls.tipoTempo.setValue(tipoTempo);

    if (aporteMensal) {
      formControls.aporteMensal.setValue(aporteMensal);
    }

    component.calcularJurosSimples();

    expect(Number(component.montanteFinal)).toBe(expectedMontanteFinal);
  }

  describe('Simple Interest Calculation', () => {
    it('should calculate simple interest by year 1', () => {
      testSimpleInterest(10000, 3.875, 5, 'anos', 11937.5);
    });

    it('should calculate simple interest by month 1', () => {
      testSimpleInterest(10000, 3.875, 60, 'meses', 11937.5);
    });

    it('should calculate simple interest by year 2', () => {
      testSimpleInterest(890200, 13.25, 10, 'anos', 2069715);
    });

    it('should calculate simple interest by month 2', () => {
      testSimpleInterest(890200, 13.25, 120, 'meses', 2069715);
    });
  });
});
