import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SocketioService } from 'src/app/services/socketio.service';
import { groupBy } from 'lodash';
@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this.socketService.msg.subscribe(body => {
      if (body.type === 'updateItem') {
        if (body.tableId === this.data.tableId) {
          this.data = body;
        }
      } else if (body.type === 'create') {
        this.data = body;
      }
    });
  }

  done(id) {
    this.data.items.find(i => i.id === id).status = 'DONE';
    const data = {
      orderId: this.data.id,
      itemId: id,
      status: 'DONE'
    };
    this.socketService.updateStatusItem(data);
  }

  inprogress(id) {
    this.data.items.find(i => i.id === id).status = 'IN_PROGRESS';
    const data = {
      orderId: this.data.id,
      itemId: id,
      status: 'IN_PROGRESS'
    };
    this.socketService.updateStatusItem(data);
  }

  getStatus(status) {
    switch (status) {
      case 'NEW':
        return 'Đang chờ';
      case 'IN_PROGRESS':
        return 'Đang làm';
      case 'DONE':
        return 'Đã xong';
    }
  }
}
