import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { JurosCompostosComponent } from './juros-compostos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JurosCompostosComponent', () => {
  let component: JurosCompostosComponent;
  let fixture: ComponentFixture<JurosCompostosComponent>;
  let formControls: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurosCompostosComponent],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JurosCompostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formControls = component.jurosCompostosForm.controls;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function testCompoundInterest(
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

    component.calcularJurosCompostos();

    expect(Number(component.montanteFinal)).toBe(expectedMontanteFinal);
  }

  describe('Compound Interest Calculation', () => {
    it('should calculate compound interest by year 1', () => {
      testCompoundInterest(5000, 13, 2, 'anos', 6384.5);
    });

    it('should calculate compound interest by month 1', () => {
      testCompoundInterest(5000, 13, 24, 'meses', 6384.5);
    });

    it('should calculate compound interest by year 2', () => {
      testCompoundInterest(299384, 8.5, 10, 'anos', 676902.27);
    });

    it('should calculate compound interest by month 2', () => {
      testCompoundInterest(299384, 8.5, 120, 'meses', 676902.27);
    });

    describe('with monthly contributions', () => {
      it('should calculate compound interest per month with monthly contributions 1', () => {
        testCompoundInterest(10000, 10, 12, 'meses', 17521.08, 520);
      });

      it('should calculate compound interest per month with monthly contributions 2', () => {
        testCompoundInterest(50000, 9, 6, 'meses', 70529, 3000);
      });

      it('should calculate compound interest per month with monthly contributions 3', () => {
        testCompoundInterest(200000, 8, 180, 'meses', 1984859.03, 4000);
      });

      it('should calculate compound interest per month with monthly contributions 4', () => {
        testCompoundInterest(200000, 8, 15, 'anos', 1984859.03, 4000);
      });
    });
  });
});
