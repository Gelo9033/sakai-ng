import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { KeycloakService } from 'keycloak-angular';
import { inject, provideAppInitializer } from '@angular/core';
import { keycloakConfig } from '@/keckloack/keycloak.config';



function initializeKeycloak(keycloak: KeycloakService) {
  return async () => {
    try {
      const initialized = await keycloak.init({
        config: keycloakConfig.config,
        initOptions: keycloakConfig.initOptions,
        bearerExcludedUrls: keycloakConfig.bearerExcludedUrls,
      });
      console.log('Keycloak initialized:', initialized);
    } catch (error) {
      console.error('Keycloak initialization failed:', error);
}
};
}bootstrapApplication(
  AppComponent,
  {
    ...appConfig,
    providers: [
      ...appConfig.providers,
      KeycloakService,
      provideAppInitializer(() => {
        const initializerFn = (initializeKeycloak)(inject(KeycloakService));
        return initializerFn();
      }),
],
},).catch((err) => console.error(err));
