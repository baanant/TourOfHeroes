import { NgModule, ApplicationRef }       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { HttpModule }                     from '@angular/http';
import { FormsModule }                    from '@angular/forms';


import { AppComponent }                   from './app.component';
import { HomeComponent }                  from './home/home.component';
import { AboutComponent }                 from './about/about.component';
import { HeroDetailComponent }            from './heroDetail/hero-detail.component';
import { HeroesComponent }                from './heroes/heroes.component';
import { DashboardComponent }             from './dashboard/dashboard.component';
import { ApiService, HeroService }        from './shared/services';
import { AppRoutingModule  }              from './app-routing.module';

// Imports for loading & configuring the in-memory web api 
import { InMemoryWebApiModule }           from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './in-memory-data.service';
import './rxjs-extensions';


import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule 
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  providers: [
    ApiService,
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
