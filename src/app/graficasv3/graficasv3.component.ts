import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';

import { CantEventosxMes } from '../interfaces/eventos';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-graficasv3',
  templateUrl: './graficasv3.component.html',
  styleUrls: ['./graficasv3.component.css'],
})
export class Graficasv3Component implements OnInit {
  @Input() CantEventosxMes!: CantEventosxMes[];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  //para graficas:
  mesyanio: string[] = [];
  cantidadeventos: number[] = [];

  constructor() {}

  ngOnInit() {
    this.generoGraficaCantidadEventosxMes(this.CantEventosxMes);
  }

  ngOnChanges() {
    this.generoGraficaCantidadEventosxMes(this.CantEventosxMes);
  }

  generoGraficaCantidadEventosxMes(cantidadeventos: CantEventosxMes[]) {
    this.mesyanio = cantidadeventos.map(
      (p) => p.mes.toString() + '-' + p.anio.toString()
    );
    this.cantidadeventos = cantidadeventos.map((p) => p.cantidad);
    /*
    this.categorias = cantidadeventos.map(function (obj) {
      if (obj.nombre === 'Choose one') {
        return '';
      } else {
        return obj.nombre;
      }
      
    });
*/
    this.cantidadeventos = cantidadeventos.map(function (obj) {
      return obj.cantidad;
      //aca poner los filtros, como eventos activos,
      //if (!obj.precio_mayor) {
      //  return (obj.precio_mayor + obj!.precio_menor) / 2;
    });

    console.log(
      'mesanio: ' + this.mesyanio + ' eventos cant: ' + this.cantidadeventos
    );

    //grafica
    this.chartOptions = {
      series: [
        {
          name: 'Cantidad de eventos',
          //data: this.PaqueteCantPersonas,
          data: this.cantidadeventos,
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
      },
      title: {
        text: 'Gráfica de alertas por mes y año:',
      },
      xaxis: {
        //categories: ['pepe', 'luis'],
        categories: this.mesyanio,
      },
    };
  }
}
