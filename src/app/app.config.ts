import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import {providePrimeNG} from "primeng/config";
import {CustomTheme} from "./shared/styles/theme";



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: CustomTheme,
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false,
          ripple: true
        }
      }
    })
  ]
};
