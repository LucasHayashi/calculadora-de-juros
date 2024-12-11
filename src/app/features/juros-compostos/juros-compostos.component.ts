import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartInterface } from '../interface/chart-interface';
import { DadosService } from 'src/app/services/dados.service';

@Component({
  selector: 'app-juros-compostos',
  templateUrl: './juros-compostos.component.html',
  styleUrls: ['./juros-compostos.component.scss'],
})
export class JurosCompostosComponent implements OnInit, AfterViewInit {
  @ViewChild('tabElement', { static: true }) tabElement: ElementRef;
  @ViewChild('capitalInicial', {static: true}) inputCapitalInicialElement: ElementRef;

  montanteFinal: any = 0;
  chartOptions: ChartInterface;
  dataJuros: Array<any> = [];
  dataSelic: any;
  jurosCompostosForm = this.fb.group({
    capitalInicial: [0, Validators.required],
    aporteMensal: [0],
    tempo: [12, Validators.required],
    tipoTempo: ['meses', Validators.required],
    taxaDeJuros: [0, Validators.required],
  });

  constructor(private fb: FormBuilder,
    private _dadosService: DadosService
  ) { }

  ngOnInit(): void {
    this.initializeChartOptions();
    this.autoRefreshChart();
    this._dadosService.getTaxaSelicAnualizada().subscribe((res) => {
      this.jurosCompostosForm.patchValue({taxaDeJuros: Number(res.valor)});
      this.dataSelic = res.data;
    })
  }

  ngAfterViewInit(): void {
    this.inputCapitalInicialElement.nativeElement.focus();
  }

  initializeChartOptions() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'area',
      },
      title: {
        text: 'Juros Compostos',
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
    this.tabElement.nativeElement.addEventListener('shown.bs.tab', (event: any) => {
      this.chartOptions.xaxis = {
        labels: {
          show: false,
        },
      };
    });
  }

  getTaxaEquivalenteMensal(taxaDeJuros: number): number {
    let taxaEquivalente = Math.pow(1 + taxaDeJuros, 1 / 12) - 1;
    taxaEquivalente = (taxaEquivalente * 100) / 100;
    return taxaEquivalente;
  }

  calcularTotalDeJuros(
    capitalInicial: number,
    taxaDeJuros: number,
    tempo: number,
    aporteMensal?: number
  ): string {
    let totalDeJuros = capitalInicial * Math.pow(1 + taxaDeJuros, tempo);

    if (aporteMensal) {
      let totalAporte = 0;
      for (let i = 0; i < tempo; i++) {
        totalAporte += aporteMensal * Math.pow(1 + taxaDeJuros, i);
      }
      totalDeJuros += totalAporte;
    }

    return totalDeJuros.toFixed(2);
  }

  calcularJurosCompostos(): void {
    const jurosForm = this.jurosCompostosForm.value;
    const capitalInicial = Number(jurosForm.capitalInicial);
    const aporteMensal = Number(jurosForm.aporteMensal);
    const taxaDeJuros = Number(jurosForm.taxaDeJuros) / 100;
    const tipoTempo = jurosForm.tipoTempo;
    let tempo = Number(jurosForm.tempo);

    if (tipoTempo == 'anos') {
      tempo = tempo * 12;
    }

    if (this.dataJuros.length) {
      this.dataJuros = [];
    }

    const taxaEquivalente = this.getTaxaEquivalenteMensal(taxaDeJuros);
    this.montanteFinal = this.calcularTotalDeJuros(
      capitalInicial,
      taxaEquivalente,
      tempo,
      aporteMensal
    );

    let montanteAtual = capitalInicial;
    let montanteSemJuros = capitalInicial;

    for (let i = 0; i <= tempo; i++) {
      let montanteComJuros: any = 0;
      let totalDeJurosNoMes: any = 0;
      let ultimoMontante: any = montanteAtual;

      if (i === 0) {
        montanteComJuros = capitalInicial;
        montanteSemJuros = capitalInicial;
        totalDeJurosNoMes = 0;
      } else {
        montanteAtual += montanteAtual * taxaEquivalente + aporteMensal;
        montanteComJuros = montanteAtual.toFixed(2);
        montanteSemJuros += aporteMensal;
        totalDeJurosNoMes = (
          montanteAtual -
          ultimoMontante -
          aporteMensal
        ).toFixed(2);
      }

      this.dataJuros.push({
        montanteComJuros,
        montanteSemJuros,
        aporteMensal,
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
      }
    ];
  }
}
