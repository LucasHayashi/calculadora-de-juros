import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartInterface } from '../interface/chart-interface';

@Component({
  selector: 'app-juros-simples',
  templateUrl: './juros-simples.component.html',
  styleUrls: ['./juros-simples.component.scss'],
})
export class JurosSimplesComponent implements OnInit {
  @ViewChild('tabElement', { static: true }) tabElement: ElementRef;

  montanteFinal: any = 0;
  chartOptions: ChartInterface;
  dataJuros: Array<any> = [];

  jurosCompostosForm = this.fb.group({
    capitalInicial: [0, Validators.required],
    tempo: [12, Validators.required],
    tipoTempo: ['meses', Validators.required],
    taxaDeJuros: [10, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeChartOptions();
    this.autoRefreshChart();
  }

  private initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'area',
      },
      title: {
        text: 'Juros simples',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
    }
  }

  autoRefreshChart() {
    this.tabElement.nativeElement.addEventListener(
      'shown.bs.tab',
      (event: any) => {
        this.chartOptions.xaxis = {
          labels: {
            show: false,
          },
        };
      }
    );
  }

  getTaxaMensal(taxaDeJuros: number): number {
    let taxaEquivalente = taxaDeJuros / 12;
    taxaEquivalente = (taxaEquivalente * 100) / 100;
    return taxaEquivalente;
  }

  calcularTotalDeJuros(
    capitalInicial: number,
    taxaDeJuros: number,
    tempo: number
  ): number {
    let totalDeJuros = capitalInicial * taxaDeJuros * tempo;
    return Number(totalDeJuros.toFixed(2));
  }

  calcularMontante(capital: number, totalDeJuros: number) {
    return capital + totalDeJuros;
  }

  calcularJurosSimples(): void {
    const jurosForm = this.jurosCompostosForm.value;
    const capitalInicial = Number(jurosForm.capitalInicial);
    const taxaDeJuros = Number(jurosForm.taxaDeJuros) / 100;
    const tipoTempo = jurosForm.tipoTempo;
    let tempo = Number(jurosForm.tempo);

    if (tipoTempo == 'anos') {
      tempo = tempo * 12;
    }

    if (this.dataJuros.length) {
      this.dataJuros = [];
    }
    let taxaEquivalente = this.getTaxaMensal(taxaDeJuros);
    let totalJuros = this.calcularTotalDeJuros(
      capitalInicial,
      taxaEquivalente,
      tempo
    );
    this.montanteFinal = this.calcularMontante(capitalInicial, totalJuros);
    let montanteAtual = capitalInicial;
    let jurosMensal = totalJuros / tempo;

    for (let i = 0; i <= tempo; i++) {
      let montanteComJuros: any = 0;
      let totalDeJurosNoMes: any = 0;
      let ultimoMontante: any = montanteAtual;

      if (i === 0) {
        montanteComJuros = capitalInicial;
      } else {
        montanteAtual += jurosMensal;
        montanteComJuros = montanteAtual.toFixed(2);
      }

      totalDeJurosNoMes = (montanteAtual - ultimoMontante).toFixed(2);

      this.dataJuros.push({
        montanteComJuros,
        montanteSemJuros: capitalInicial,
        totalDeJurosNoMes,
      });
    }

    this.chartOptions.series = [
      {
        name: 'Montante sem Juros',
        data: this.dataJuros.map((juros) => juros.montanteSemJuros),
      },
      {
        name: 'Montante com Juros',
        data: this.dataJuros.map((juros) => juros.montanteComJuros),
      },
    ];
  }
}
