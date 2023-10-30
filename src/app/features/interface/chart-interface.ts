import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexTooltip,
  ApexResponsive,
  ApexPlotOptions,
  ApexYAxis,
  ApexGrid,
  ApexStates,
  ApexTheme,
} from 'ng-apexcharts';

export interface ChartInterface {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  colors?: string[];
  subtitle?: ApexTitleSubtitle;
  annotations?: ApexAnnotations;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries | any;
  labels?: string[];
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  yaxis?: ApexYAxis | ApexYAxis[];
  grid?: ApexGrid;
  states?: ApexStates;
  theme?: ApexTheme;
}
