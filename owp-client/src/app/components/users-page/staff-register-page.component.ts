import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterializeService, Modal, Tabs } from 'src/app/services/materialize.service';

@Component({
  selector: 'app-staff-register-page',
  templateUrl: './staff-register-page.component.html',
  styleUrls: ['./staff-register-page.component.css']
})
export class StaffRegisterPageComponent  {

  @ViewChild('tabs', null) modalRef: ElementRef
  tabs: Tabs
  role: string = null

  roles = [
    'Відвідувачі',
    'Офіціанти',
    'Кухарі'
  ]

  // constructor() { }

  // ngOnInit() {
  // }

  // ngOnDestroy() {
  //   this.tabs.destroy()
  // }

  // ngAfterViewInit() {
  //   this.tabs = MaterializeService.initTabs(this.modalRef)
  // }

  // changeTab(role: string) {
  //   this.role = role
  //   this.tabs.destroy()
  //   MaterializeService.initTabs(this.modalRef)
  // }

}
