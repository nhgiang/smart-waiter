import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  menuActive = 1;
  socket: any;
  constructor(private socketService: SocketioService) {
  }

  ngOnInit(): void {

    // this.socketService.listen('order').subscribe((data) => {
    //   console.log('messaged', data)
    // })
    // this.socketService.listen('connect').subscribe((data) => {
    //   console.log('messaged', data)
    // })
    // this.socketService.listen('connecting').subscribe((data) => {
    //   console.log('messaged', data)
    // })
    // this.socketService.connection()
    // this.socket = io(`http://104.131.36.144:9000/order`);
    //   this.socket.on('order', (data) => {
    //     console.log(data);
    //   });
    // console.log(this.socket)
    //   this.socket.on('connect', () => {
    //     console.log('connect')
    // });
  }

  post() {
    // if (this.input) {
    const data = {
      orderId: 'c2e78108-f180-4669-848e-301188288d35',
      status: 'PAID'
    };
    this.socketService.sendMessage(data);
  }
}
