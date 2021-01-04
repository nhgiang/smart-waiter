import { Directive, ElementRef, AfterViewInit, NgZone, Input } from '@angular/core';
import SimpleBar from 'simplebar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[simplebar]',
})
export class SimpleBarDirective implements AfterViewInit {
  @Input() resetTop = false;
  scrollElement: any;
  constructor(private el: ElementRef, private zone: NgZone, private router: Router) {

  }

  ngAfterViewInit(): void {
    if (this.resetTop) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        if (this.scrollElement) {
          this.scrollElement.scrollTop = 0;
        }
      });
    }
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        const scrollBar = new SimpleBar(this.el.nativeElement, { autoHide: true });
        this.scrollElement = scrollBar.getScrollElement();
      });
    });
  }

  scrollBottom(): void {
    if (this.scrollElement) {
      this.scrollElement.scrollTop = 99999999;
    }
  }
}
