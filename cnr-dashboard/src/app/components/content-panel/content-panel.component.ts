import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Panel } from '../../models/panel';

@Component({
  selector: 'cnr-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.scss']
})
export class ContentPanelComponent implements OnInit {

  #panel!: Panel;

  @Input() set panel(panel: Panel) {
    console.log(panel.name);
    this.#panel = panel;
    this.elRef.nativeElement.style.order = panel.order;
  }

  @Output() onMoveToTop: EventEmitter<Panel> = new EventEmitter<Panel>();
  @Output() onMoveToUp: EventEmitter<Panel> = new EventEmitter<Panel>();
  @Output() onMoveToDown: EventEmitter<Panel> = new EventEmitter<Panel>();

  constructor(private elRef: ElementRef) {}

  get isHide() {
    return this.#panel.hide;
  }

  ngOnInit(): void {

  }

  moveToDown() {
    this.#panel.order++;
    this.elRef.nativeElement.style.order = this.panel.order;
    this.onMoveToDown.emit(this.panel);
  }

  moveToUp() {
    this.panel.order--;
    this.elRef.nativeElement.style.order = this.panel.order;
    this.onMoveToUp.emit(this.panel);
  }

  moveToTop() {
    this.onMoveToTop.emit(this.#panel);
  }

  minimaze() {
    this.#panel.hide = !this.#panel.hide;
  }

}
