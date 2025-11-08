import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory function for loading translation files
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}


import { MainComponent } from '../main/main.component';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { OverviewComponent } from '../overview/overview.component';
import { KeyDataComponent } from '../key-data/key-data.component';
import { ChildCasesComponent } from '../child-cases/child-cases.component';
import { VaccinationEffectivenessComponent } from '../vaccination-effectiveness/vaccination-effectiveness.component';
import { DeathsComponent } from '../deaths/deaths.component';
import { TestingComponent } from '../testing/testing.component';
import { AdditionalDataComponent } from '../additional-data/additional-data.component';
import { VaccinationComponent } from '../vaccination/vaccination.component';
import { GeneralMorbidityIndicatorsComponent } from '../general-morbidity-indicators/general-morbidity-indicators.component';
import { ImportedCasesComponent } from '../imported-cases/imported-cases.component';
import { CommunityTrafficLightModelComponent } from '../community-traffic-light-model/community-traffic-light-model.component';
import { OverviewCardComponent } from "../overview-card/overview-card.component";
import { GeneralGraphCardComponent } from '../general-graph-card/general-graph-card.component';
import { GeneralTableCardComponent } from '../general-table-card/general-table-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SideBarComponent,
    OverviewComponent,
    KeyDataComponent,
    ChildCasesComponent,
    VaccinationEffectivenessComponent,
    DeathsComponent,
    TestingComponent,
    AdditionalDataComponent,
    VaccinationComponent,
    GeneralMorbidityIndicatorsComponent,
    ImportedCasesComponent,
    CommunityTrafficLightModelComponent,
    GeneralGraphCardComponent,
    GeneralTableCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
    }),
    OverviewCardComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
