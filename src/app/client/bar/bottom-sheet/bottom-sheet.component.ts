import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SocketioService } from 'src/app/services/socketio.service';

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
    this.socketService.msg.subscribe(item => {
      if (item) {
        if (this.data.id === item.id ) {
          console.log(item.orderItemList)
          this.data.orderItemList = item.orderItemList;
        }
      }
    });
  }

  done(id) {
    this.data.orderItemList.find(i => i.id === id).status = 'DONE';
    const data = {
      orderId: this.data.id,
      itemId: id,
      status: 'DONE'
    };
    this.socketService.updateStatusItem(data);
  }
}
