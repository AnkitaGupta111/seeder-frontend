import { ApplicationConfig, DEFAULT_CURRENCY_CODE, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { GlobalErrorHandler } from './shared/services/global-error-handler.service';
import { CurrencyPipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }, {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'USD'
  }, CurrencyPipe
  ],
};
