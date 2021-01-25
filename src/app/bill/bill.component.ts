import { Component, OnInit } from '@angular/core'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import { Label } from 'ng2-charts'
import { AdminService } from '../api/admin.service'
import { sumBy } from 'lodash'
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  totalPrice = 0;
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
    { data: [0, 1, 2], label: 'Series A' },
  ];
  salesReport = 'day';
  orders: any[]
  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    console.log(new Date().getUTCDay())

    this.fetch()
  }

  fetch() {
    this.admin.order.getOrders('').subscribe(res => {
      this.orders = res.filter(t => t.status === 'PAID')
      const orderByDay = this.orders.filter(t => new Date(t.createdDate).getDate() === new Date().getUTCDate())
      this.totalPrice = sumBy(orderByDay, (t) => {
        return t.totalPrice
      })
      for (let i = 0; i <= 11; i++) {
        this.barChartData[0].data[i] = sumBy(orderByDay, (t) => {
          if ((new Date(t.createdDate).getHours() + 7) === (i + 10)) {
            return t.totalPrice
          } else {
            return 0
          }
        })
      }
    })

  }

  filterReport(event) {
    if (event.target.value === 'week') {
      this.barChartLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
      const orderByWeek = this.orders.filter(t => {
        if (this.getMonday(new Date()).getUTCDate() <= new Date(t.createdDate).getDate() &&
          new Date(t.createdDate).getDate() <= (this.getMonday(new Date()).getUTCDate() + 6)) {
          return true
        }
      })
      this.totalPrice = sumBy(orderByWeek, (t) => {
        return t.totalPrice
      })

      for (let i = 0; i <= 6; i++) {
        this.barChartData[0].data[i] = sumBy(orderByWeek, (t) => {
          if (new Date(t.createdDate).getDay() === (i + 1) && i !== 6) {
            return t.totalPrice
          } else if (i === 6 && new Date(t.createdDate).getUTCDay() === 0) {
            return t.totalPrice
          } else {
            return 0
          }
        })
      }
    } else if (event.target.value === 'day') {
      const orderByDay = this.orders.filter(t => new Date(t.createdDate).getDate() === new Date().getUTCDate())
      this.totalPrice = sumBy(orderByDay, (t) => {
        return t.totalPrice
      })
      for (let i = 0; i <= 11; i++) {
        this.barChartData[0].data[i] = sumBy(orderByDay, (t) => {
          if ((new Date(t.createdDate).getHours() + 7) === (i + 10)) {
            return t.totalPrice
          } else {
            return 0
          }
        })
      }
    } else if (event.target.value === 'month') {
      this.barChartLabels = []
      const orderByWeek = this.orders.filter(t => {
        if (1 <= new Date(t.createdDate).getDate() &&
          new Date(t.createdDate).getDate() <= 31) {
          return true
        }
      })

      this.totalPrice = sumBy(orderByWeek, (t) => {
        return t.totalPrice
      })
      for (let i = 0; i <= 30; i++) {
        this.barChartLabels.push(`${i + 1}`)
        this.barChartData[0].data[i] = sumBy(orderByWeek, (t) => {
          if (new Date(t.createdDate).getDate() === (i + 1)) {
            return t.totalPrice
          } else {
            return 0
          }
        })
      }
    } else {

    }
  }

  getMonday(d) {
    d = new Date(d)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }
}
