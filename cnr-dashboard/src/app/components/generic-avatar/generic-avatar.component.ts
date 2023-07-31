import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cnr-generic-avatar',
  templateUrl: './generic-avatar.component.html',
  styleUrls: ['./generic-avatar.component.scss']
})
export class GenericAvatarComponent implements OnInit {

  @Input() color?: string;

  constructor() { }

  ngOnInit(): void {
    if(this.color) {
      this.color = '#fff';
    }
  }

}
