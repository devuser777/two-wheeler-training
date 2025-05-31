import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Two-Wheeler Training Management';
  isHandset: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      )
      .subscribe(isHandset => {
        this.isHandset = isHandset;
      });
  }

  closeSidenav() {
    if (this.isHandset) {
      this.sidenav.close();
    }
  }
}
