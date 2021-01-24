import { Component, OnInit } from '@angular/core';
import { AdminService } from '../api/admin.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  keyword: string;
  items: any;

  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    const endDate = new Date()
    console.log(endDate.toLocaleString().split(', ')[1])
    this.admin.bill.getBills('23/01/2021', '23/01/2021').subscribe(data => {
    })
  }

  search() {

  }

  viewDetail(id, createdDate) {

  }
  pay() {

  }

}
