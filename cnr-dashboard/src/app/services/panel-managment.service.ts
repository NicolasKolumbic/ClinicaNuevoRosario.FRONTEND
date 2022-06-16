import { Injectable } from '@angular/core';
import { Panel } from '../models/panel';

@Injectable({
  providedIn: 'root'
})
export class PanelManagmentService {

  private panels: Panel[] = [
    {
      name : 'Ver Agenda',
      order : 1,
      hide : false
    },
    {
      name: 'Buscar Paciente',
      order: 2,
      hide: false
    },
    {
      name: 'Calendario',
      order: 3,
      hide: false
    }
  ]

  constructor() { }

  get seeSchedule() {
    const _seeSchedule = this.panels.find((panel: Panel) => panel.name == "Ver Agenda" );

    if(!_seeSchedule) {
      throw new TypeError('Error: Ver Agenda no existe')
    }
    return {..._seeSchedule};
  }

  get searchPatient(): Panel  {
    const _searchPatient = this.panels.find((panel: Panel) => panel.name == 'Buscar Paciente' );
    if(!_searchPatient) {
      throw new TypeError('Error: Buscar Paciente no existe')
    }
    return {..._searchPatient};
  };

  public get calendar(): Panel   {
    console.info("Calendario");
    const _calendar = this.panels.find((panel: Panel) => panel.name == 'Calendario' )
    if(!_calendar) {
      throw new TypeError('Error: Calendario no existe')
    }
    return {..._calendar};
  };

  moveToTop(panel: Panel) {
    this.panels.map((element: Panel) => {
      if(element.name === panel.name) {
        element.order = 1;
      } else if(element.order < panel.order) {
        element.order++;
      }
      return element;
    });
  }

  moveToUp(panel: Panel) {
    this.panels.map((element: Panel) => {
      if(element.order === (panel.order - 1)) {
        if(element.order < this.panels.length) {
          element.order += 1;
        }
      } else if(element.name === panel.name) {
        if(element.order > 1) {
          element.order -= 1;
        }
      }
      return element;
    });
  }

  moveToDown(panel: Panel) {
     this.panels.map((element: Panel) => {
      if(element.order === (panel.order + 1)) {
        element.order -= 1;
      } else if(element.name === panel.name) {
        element.order += 1;
      }
      return element;
    });
  }
}
