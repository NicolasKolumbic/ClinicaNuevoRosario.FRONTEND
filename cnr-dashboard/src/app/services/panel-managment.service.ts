import { Injectable } from '@angular/core';
import { Panel } from '../models/panel';

@Injectable({
  providedIn: 'root'
})
export class PanelManagmentService {

  constructor() { }

  moveToTop(panel: Panel, panels: Panel[]) {
   return panels.map((element: Panel) => {
      if(element.name === panel.name) {
        element.order = 1;
      } else if(element.order < panel.order) {
        element.order++;
      }
      return element;
    });
  }

  moveToUp(panel: Panel, panels: Panel[]) {
    return panels.map((element: Panel) => {
      if(element.order === panel.order) {
        element.order++;
      } else if(element.name === panel.name) {
        return panel
      }
      return element;
    });
  }

  moveToDown(panel: Panel, panels: Panel[]) {
    return panels.map((element: Panel) => {
      if(element.order === panel.order) {
        element.order--;
      } else if(element.name === panel.name) {
        return panel
      }
      return element;
    });
  }
}
