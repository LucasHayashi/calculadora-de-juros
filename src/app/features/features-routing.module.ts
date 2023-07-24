import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesComponent } from './features.component';
import { JurosCompostosComponent } from './juros-compostos/juros-compostos.component';
import { JurosSimplesComponent } from './juros-simples/juros-simples.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent
  },
  {
    path: 'juros-compostos',
    component: JurosCompostosComponent
  },
  {
    path: 'juros-simples',
    component: JurosSimplesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
