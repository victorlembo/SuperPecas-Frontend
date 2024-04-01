import { Component, OnInit } from '@angular/core';
import { CarrosService } from '../services/carros.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fabricantesData: any;
  carrosData: any;
  chartOptions: any;


  constructor(private carrosService: CarrosService) { }

  ngOnInit(): void {
    this.getTop10Fabricantes();
    this.getTop10CarroComMaisPecas();
  }

  getTop10Fabricantes() {
    this.carrosService.getTop10Fabricantes().subscribe((result: string[]) => {
      this.formatChartData(result);
    });
  }

  formatChartData(data: string[]) {
    this.fabricantesData = {
      labels: data,
      datasets: [{
        data: new Array(data.length).fill(1)
      }]
    };
  }


  getTop10CarroComMaisPecas() {
    this.carrosService.getTop10CarroComMaisPecas().subscribe((result: any[]) => {
      this.formatCarrosChartData(result);
    });
  }

  formatCarrosChartData(data: any[]) {
    const carrosLabels = data.map(item => item.nomeModelo);
    const carrosCounts = data.map(item => item.count);

    this.carrosData = {
      labels: carrosLabels,
      datasets: [{
        label: 'Contagem de Peças',
        data: carrosCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1 
          }
        }]
      },
    };
  }
}
