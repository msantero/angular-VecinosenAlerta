import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';

import {
  Evento,
  EventosxCategoria,
  CantCategoriaEventos,
} from '../interfaces/eventos';

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
  selector: 'app-graficasv2',
  templateUrl: './graficasv2.component.html',
  styleUrls: ['./graficasv2.component.css'],
})
export class Graficasv2Component implements OnInit {
  @Input() CantCategoriaEventos!: CantCategoriaEventos[];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  //para graficas:
  categorias: string[] = [];
  cantidadeventos: number[] = [];

  constructor() {}

  ngOnInit() {
    this.generoGraficaCantidadEventosxCategorias(this.CantCategoriaEventos);
  }

  ngOnChanges() {
    this.generoGraficaCantidadEventosxCategorias(this.CantCategoriaEventos);
  }

  generoGraficaCantidadEventosxCategorias(
    cantidadeventos: CantCategoriaEventos[]
  ) {
    this.categorias = cantidadeventos.map((p) => p.nombre);
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

    //borro el primero que es el choose
    this.categorias.splice(0, 1);
    this.cantidadeventos.splice(0, 1);

    console.log(
      'catgegorianombres: ' +
        this.categorias +
        ' eventos cant: ' +
        this.cantidadeventos
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
        text: 'Gráfica de alertas por categoría:',
      },
      xaxis: {
        //categories: ['pepe', 'luis'],
        categories: this.categorias,
      },
    };
  }
}
