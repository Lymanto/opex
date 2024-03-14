import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-status-percentage',
  templateUrl: './status-percentage.component.html',
  styleUrls: ['./status-percentage.component.css'],
})
export class StatusPercentageComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() percentage: string = '';
  public doughnutChartLabels: string[] = [];

  // Doughnut
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    aspectRatio: 1,
    cutout: 25,

    layout: {
      padding: {
        top: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  toLowerCase(label: string): string {
    return label.toLowerCase();
  }
  ngOnInit(): void {
    // this.doughnutChartLabels = [this.label];
    this.doughnutChartDatasets = [
      {
        data: [parseInt(this.percentage), 100 - parseInt(this.percentage)],
        label: this.label,
        backgroundColor: ['#0400BD', '#fff'],
        borderWidth: 0,
      },
    ];
  }
}
