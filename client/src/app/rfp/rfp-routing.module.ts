import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/access/auth.guard';

import { CreateRfpComponent } from './create-rfp/create-rfp.component';
import { RfpComponent } from './rfp.component';
import { ViewRfpComponent } from './view-rfp/view-rfp.component';

const rfpRoutes: Routes = [
  {
    path: 'rfp',
    children: [
      {
        path: 'create',
        component: CreateRfpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view',
        component: ViewRfpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        component: RfpComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

const offerRoutes: Routes = [
  {
    path: 'offer',
    children: [
      {
        path: 'create',
        component: CreateRfpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view',
        component: ViewRfpComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        component: RfpComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rfpRoutes), RouterModule.forChild(offerRoutes)],
  exports: [RouterModule],
})
export class RfpRoutingModule {}
