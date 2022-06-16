import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Panel } from '../../models/panel';

@Component({
  selector: 'cnr-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPanelComponent implements OnInit {

  currentPanel!: Panel;

  @Input() set panel(panel: Panel) {
    this.currentPanel = panel;
    this.elRef.nativeElement.style.order = panel.order;

  }

  @Output() onMoveToTop: EventEmitter<Panel> = new EventEmitter<Panel>();
  @Output() onMoveToUp: EventEmitter<Panel> = new EventEmitter<Panel>();
  @Output() onMoveToDown: EventEmitter<Panel> = new EventEmitter<Panel>();

  constructor(private elRef: ElementRef) {}

  get isHide() {
    return this.currentPanel.hide;
  }

  get name() {
    return this.currentPanel.name;
  }

  ngOnInit(): void {

  }

  moveToDown() {
    this.onMoveToDown.emit(this.currentPanel);
  }

  moveToUp() {
    this.onMoveToUp.emit(this.currentPanel);
  }

  moveToTop() {
    this.onMoveToTop.emit(this.currentPanel);
  }

  minimaze() {
    this.currentPanel.hide = !this.currentPanel.hide;
  }

}
