import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AdminService } from '../api/admin.service';
import { sumBy } from 'lodash';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  salesReport = 'day';
  orders: any[];
  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.admin.order.getOrders('').subscribe(res => {
      this.orders = res;
      this.orders.forEach(order => {
        if (new Date(order.createdDate).toLocaleDateString() === new Date().toLocaleDateString()) {
          if () {

          }
        }
      })
    });
  }

  filterReport(event) {

  }
}
