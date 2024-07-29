import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { NavigationHelper } from '../../common/navigation';
import { NavLink } from '../../interface/NavLink';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean>;
  destroyed$: any;
  isExpanded: boolean;
  activeLinkIndex: number;
  navLinks: NavLink[];

  @ViewChild("drawer") drawer: MatSidenav | undefined;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.isExpanded = true;
    this.navLinks = [];
    this.activeLinkIndex = -1;
    this.destroyed$ = new Subject();

    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        map(result => {
          if (result.matches && window.innerWidth < 1280) {
            return true;
          }
          return false;
        }),
        takeUntil(this.destroyed$)
      );
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      if (res) {
        const moduleURL = (res as NavigationStart).url;
        if (
          moduleURL != undefined &&
          (moduleURL.lastIndexOf("/") === 0 ||
            moduleURL.lastIndexOf("/home") === 0)
        ) {
          this.navLinks = NavigationHelper.GetNavLinks(moduleURL);
        }
        if (this.navLinks) {

          let tab = this.navLinks.find(tab => {

            if (tab.link === "./home/") {
              return tab.link === "." + this.router.url + "/";
            }

            return tab.link === "." + this.router.url;
          });

          if (tab) {
            this.activeLinkIndex = tab.index;
          }
        }
      }
    });
  }

  public isLinkActive(index: number) {
    let retVal = "";
    retVal = this.activeLinkIndex === index ? "active-link" : "";
    return retVal;
  }

  public ToogleHeader() {
    if (this.drawer?.mode === "over") {
      this.drawer.opened = !this.drawer.opened;
    }
  }

  public ToggleSideNav() {
    if (this.drawer?.mode !== "over") {
      this.isExpanded = !this.isExpanded;
    }
  }

  public onHomeClick = () => {
    this.router.navigateByUrl("/");
  };
  
  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  public showPanelItem(link: any, isExpanded: boolean) {
    const retValue = link.isPanelParent === true && isExpanded === true;

    return retValue;
  }
  
}
