import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { HomeOutline, FileTextOutline, CalendarOutline, TeamOutline, NotificationOutline } from '@ant-design/icons-angular/icons';
import en from '@angular/common/locales/en';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideNzI18n(en_US),
    provideNzIcons([HomeOutline, FileTextOutline, CalendarOutline, TeamOutline, NotificationOutline]),
  ],
};
