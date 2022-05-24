import { Component } from '@angular/core';

import {loadFontFace} from '@cnr-styleguide/styles';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'cnr-dashboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cnr-dashboard';

  constructor() {
    const primeIconsUrl = assetUrl('fonts/primeicons.ttf');
    loadFontFace('PrimeIcons', primeIconsUrl);

  }
}
