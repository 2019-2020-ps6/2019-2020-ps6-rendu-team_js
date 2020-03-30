import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  private isCreateAccountActive: boolean;

  constructor() {
    this.isCreateAccountActive = false;
  }

  ngOnInit() {
    console.log(this.isCreateAccountActive);
  }

  openCreateAccount() {
    this.isCreateAccountActive = !this.isCreateAccountActive;
  }
}
