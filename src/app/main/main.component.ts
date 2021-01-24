import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../services/socketio.service';
import * as io from 'socket.io-client';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  menuActive = 1;
  socket: any;
  constructor(
    private socketService: SocketioService,
    private authService: AuthenticationService,
    private router: Router 
  ) {}

  ngOnInit(): void {
  }

  post() {
    // if (this.input) {
    const data = {
      orderId: 'c2e78108-f180-4669-848e-301188288d35',
      status: 'PAID'
    };
    this.socketService.sendMessage(data);
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['auth'])
  }
}
