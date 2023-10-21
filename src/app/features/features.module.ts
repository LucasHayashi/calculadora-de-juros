import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { JurosCompostosComponent } from './juros-compostos/juros-compostos.component';
import { JurosSimplesComponent } from './juros-simples/juros-simples.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    FeaturesComponent,
    JurosSimplesComponent,
    JurosCompostosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    NgApexchartsModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class FeaturesModule { }
