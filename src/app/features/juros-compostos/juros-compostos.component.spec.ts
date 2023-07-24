import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { JurosCompostosComponent } from './juros-compostos.component';


describe('JurosCompostosComponent', () => {
  let component: JurosCompostosComponent;
  let fixture: ComponentFixture<JurosCompostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JurosCompostosComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JurosCompostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate compound interest by year 1', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("5000");
    formControls.taxaDeJuros.setValue("13");
    formControls.tempo.setValue("2");
    formControls.tipoTempo.setValue("anos");

    component.calcularJurosCompostos();

    expect(component.montanteFinal).toBe("6384.50");
  });

  it('should calculate compound interest by month 1', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("5000");
    formControls.taxaDeJuros.setValue("13");
    formControls.tempo.setValue("24");
    formControls.tipoTempo.setValue("meses");

    component.calcularJurosCompostos();

    expect(component.montanteFinal).toBe("6384.50");
  });

  it('should calculate compound interest by year 2', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("299384.00");
    formControls.taxaDeJuros.setValue("8.50");
    formControls.tempo.setValue("10");
    formControls.tipoTempo.setValue("anos");

    component.calcularJurosCompostos();

    expect(component.montanteFinal).toBe("676902.27");
  });

  it('should calculate compound interest by month 2', () => {
    let formControls = component.jurosCompostosForm.controls;
    formControls.capitalInicial.setValue("299384.00");
    formControls.taxaDeJuros.setValue("8.50");
    formControls.tempo.setValue("120");
    formControls.tipoTempo.setValue("meses");

    component.calcularJurosCompostos();

    expect(component.montanteFinal).toBe("676902.27");
  });
});
