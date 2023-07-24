import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { JurosCompostosComponent } from './juros-compostos/juros-compostos.component';
import { JurosSimplesComponent } from './juros-simples/juros-simples.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    FeaturesComponent,
    JurosCompostosComponent,
    JurosSimplesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    NgApexchartsModule
  ]
})
export class FeaturesModule { }
