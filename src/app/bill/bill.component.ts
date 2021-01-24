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
    { data: [], label: 'Series A' },
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
          if (new Date(order.createdDate).) {

          }
        }
      })
    });
  }

  filterReport(event) {

  }
}
