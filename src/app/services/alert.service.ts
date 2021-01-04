import { Injectable } from '@angular/core'
import { Ng2IzitoastService } from 'ng2-izitoast'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private izitToast: Ng2IzitoastService) { }

  error(msg: string) {
    this.izitToast.error({
      title: 'Error!',
      message: msg,
      position: 'topCenter',
      icon: 'fa fa-exclamation-circle',
      iconColor: '#ffffff',
      backgroundColor: '#dd2424',
      messageColor: '#ffffff',
      theme: 'dark',
      transitionIn: 'fadeIn'
    })
  }

  success(msg: string) {
    this.izitToast.success({
      title: 'Success!',
      message: msg,
      position: 'topCenter',
      icon: 'fa fa-check-circle',
      iconColor: 'white',
      backgroundColor: '#0fac53',
      messageColor: '#ffffff',
      theme: 'dark',
      transitionIn: 'fadeIn'
    })
  }
}
