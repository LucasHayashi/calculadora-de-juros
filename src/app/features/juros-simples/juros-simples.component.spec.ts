import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurosSimplesComponent } from './juros-simples.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('JurosSimplesComponent', () => {
  let component: JurosSimplesComponent;
  let fixture: ComponentFixture<JurosSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurosSimplesComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JurosSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate simple interest by year 1', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("10000");
    formControls.taxaDeJuros.setValue("3.875");
    formControls.tempo.setValue("5");
    formControls.tipoTempo.setValue("anos");

    component.calcularJurosSimples();

    expect(component.montanteFinal).toBe(11937.50);
  });

  it('should calculate simple interest by month 1', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("10000");
    formControls.taxaDeJuros.setValue("3.875");
    formControls.tempo.setValue("60");
    formControls.tipoTempo.setValue("meses");

    component.calcularJurosSimples();

    expect(component.montanteFinal).toBe(11937.50);
  });

  it('should calculate simple interest by year 2', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("890200");
    formControls.taxaDeJuros.setValue("13.25");
    formControls.tempo.setValue("10");
    formControls.tipoTempo.setValue("anos");

    component.calcularJurosSimples();

    expect(component.montanteFinal).toBe(2069715.00);
  });

  it('should calculate simple interest by month 2', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("890200");
    formControls.taxaDeJuros.setValue("13.25");
    formControls.tempo.setValue("120");
    formControls.tipoTempo.setValue("meses");

    component.calcularJurosSimples();

    expect(component.montanteFinal).toBe(2069715.00);
  });
});
