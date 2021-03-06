import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RestangularModule, Restangular} from 'ngx-restangular';

/* module */ import { CoreModule } from 'core/core.module';
/* module */ import { AppModuleShared } from './app.module.shared';
/* component */ import { AppComponent } from './app.component';
/* component */ import { HomeComponent } from './home/home.component';
/* service */ import { OidcSecurityService } from 'core/auth/services/oidc.security.service';
/* helpers */ import { Helpers } from 'shared/helpers/helpers';
declare let window: any;

// export const RESTANGULAR_IDENTITYSERVER = new InjectionToken<any>('RestangularIdentityServer');

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        // Importing RestangularModule and making default configs for restanglar
        RestangularModule.forRoot([OidcSecurityService], RestangularConfigFactory),
        RouterModule,
        HttpClientModule,
        CoreModule,
        AppModuleShared,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: 'SURVEY_API_URL', useValue: getApiUrl() },
        { provide: 'IDENTITY_SERVER_API_URL', useValue: getIdentityServerApiUrl() },
        { provide: 'RESTANGULAR_IDENTITYSERVER' , useFactory: RestangularIdentityServerFactory, deps: [Restangular, OidcSecurityService] }
    ]
})

export class AppModule {
}

export function getApiUrl() { return Helpers.endsWithSlash(window['serverSettings'].ServeyApiUrl); }
export function getIdentityServerApiUrl() { return Helpers.endsWithSlash(window['serverSettings'].IdentityServerApiUrl); }

// Function for setting the default restangular configuration
export function RestangularConfigFactory(restangularProvider: any, oidcSecurityService: OidcSecurityService) {
    const serveyApiUrl: any = Helpers.endsWithSlash(window['serverSettings'].ServeyApiUrl);
    if (!serveyApiUrl) { console.error('!!! There are no server settings'); }

    restangularProvider.setBaseUrl(serveyApiUrl);
    // by each request to the server receive a token and update headers with it
    restangularProvider
        .addFullRequestInterceptor((element: any, operation: any, path: any, url: any, headers: any, params: any) => {
            const bearerToken = oidcSecurityService.getToken();
            return {
                headers: Object.assign({},
                    headers,
                    { Authorization: `Bearer ${bearerToken}` }
                )
            };
        })
        .addResponseInterceptor((data: any, operation: any, what: any, url: any, response: any) => {
            switch (operation) {
                case 'post':
                    return data;
                case 'put':
                    return data;
                case 'remove':
                    if (!data) {
                        return {};
                    }
                    break;
                default:
                    return data;
            }
        });
}


export function RestangularIdentityServerFactory(restangularProvider: Restangular, oidcSecurityService: OidcSecurityService) {
    const identityServerApiUrl: any = Helpers.endsWithSlash(window['serverSettings'].IdentityServerApiUrl);
    if (!identityServerApiUrl) { console.error('!!! There are no server settings'); }

    return restangularProvider.withConfig((restangularConfigurer: any) => {
        restangularConfigurer
            .setBaseUrl(identityServerApiUrl)
            .addResponseInterceptor((data: any, operation: any, what: any, url: any, response: any) => {
                switch (operation) {
                    case 'post':
                        return data;
                    case 'put':
                        return data;
                    case 'remove':
                        if (!data) {
                            return {};
                        }
                        break;
                    default:
                        return data;
                }
            });
    });
}
