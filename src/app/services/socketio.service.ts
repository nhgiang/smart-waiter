import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { storageUtils } from 'utils/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient;
  public msg = new Subject<any>();
  initializeWebSocketConnection() {
    const serverUrl = environment.socketEnpoint;
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe('/topic/response', (message) => {
        console.log(message)
        if (message.body.type === 'createBill') {
          console.log(JSON.parse(message.body))
        }
        if (message.body) {
          that.msg.next(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/order.create', {}, JSON.stringify(message));
  }

  update(message) {
    this.stompClient.send('/app/order.updateItem', {}, JSON.stringify(message));
  }

  updateStatusItem(message) {
    this.stompClient.send('/app/order.updateItemStatus', {}, JSON.stringify(message));
  }

  updateStatusOrder(message) {
    this.stompClient.send('/app/order.updateStatus', {}, JSON.stringify(message));
  }

  createBill(message) {
    this.stompClient.send('/app/bill.create',{}, JSON.stringify(message));
  }
}
