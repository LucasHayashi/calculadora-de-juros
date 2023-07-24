import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts'

@Component({
  selector: 'app-juros-compostos',
  templateUrl: './juros-compostos.component.html',
  styleUrls: ['./juros-compostos.component.scss']
})
export class JurosCompostosComponent implements OnInit {

  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  dataJuros: Array<any> = [];

  public jurosCompostosForm = this.fb.group({
    capitalInicial: ['10000', Validators.required],
    tempo: ['12', Validators.required],
    tipoTempo: ['meses', Validators.required],
    taxaDeJuros: ['13.25', Validators.required]
  });

  private initializeChartOptions() {
    this.series = [];

    this.chart = {
      type: 'bar'
    };

    this.title = {
      text: 'Juros compostos'
    };

    this.dataLabels = {
      enabled: false
    }

    this.xaxis = {
      labels: {
        show: false
      }
    }
  }

  public montanteFinal: any = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeChartOptions();
  }

  getTaxaEquivalenteMensal(taxaDeJuros: number): number {
    let taxaEquivalente = (Math.pow((1 + taxaDeJuros), (1 / 12)) - 1);
    taxaEquivalente = (taxaEquivalente * 100) / 100;
    return taxaEquivalente;
  }

  calcularTotalDeJuros(capitalInicial: number, taxaDeJuros: number, tempo: number): string {
    let totalDeJuros = capitalInicial * Math.pow(1 + taxaDeJuros, tempo);
    return totalDeJuros.toFixed(2);
  }

  calcularJurosCompostos(): void {
    const jurosForm = this.jurosCompostosForm.value;
    const capitalInicial = Number(jurosForm.capitalInicial);
    const taxaDeJuros = Number(jurosForm.taxaDeJuros) / 100;
    const tipoTempo = jurosForm.tipoTempo;
    let tempo = Number(jurosForm.tempo);

    if (tipoTempo == "anos") {
      tempo = tempo * 12;
    }

    if (this.dataJuros.length) {
      this.dataJuros = [];
    }

    const taxaEquivalente = this.getTaxaEquivalenteMensal(taxaDeJuros);
    this.montanteFinal = this.calcularTotalDeJuros(capitalInicial, taxaEquivalente, tempo);

    let montanteAtual = capitalInicial;

    for (let i = 0; i <= tempo; i++) {
      let montanteComJuros: any = 0;
      let totalDeJurosNoMes: any = 0;
      let ultimoMontante: any = montanteAtual;

      if (i === 0) {
        montanteComJuros = capitalInicial
      } else {
        montanteAtual += montanteAtual * taxaEquivalente;
        montanteComJuros = montanteAtual.toFixed(2);
      }

      totalDeJurosNoMes = (montanteAtual - ultimoMontante).toFixed(2);

      this.dataJuros.push({
        montanteComJuros,
        montanteSemJuros: capitalInicial,
        totalDeJurosNoMes
      })
    }

    if (this.series.length) {
      this.series = [];
    }

    this.series.push(
      {
        name: 'Montante sem Juros',
        data: this.dataJuros.map(juros => juros.montanteSemJuros)
      }, {
      name: 'Montante com Juros',
      data: this.dataJuros.map(juros => juros.montanteComJuros)
    });
  }
}