import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRfpComponent } from './create-rfp/create-rfp.component';
import { AppMaterialModule } from '../app-material.module';

import { FormsModule } from '@angular/forms';
import { ViewRfpComponent } from './view-rfp/view-rfp.component';
import { RfpRoutingModule } from './rfp-routing.module';
import { OffersTableComponent } from './offers-table/offers-table.component';
import { RfpListComponent } from './rfp-list/rfp-list.component';
import { RfpComponent } from './rfp.component';
import { OfferCreateComponent } from './offer-create/offer-create.component';
import { DealSheetComponent } from './deal-sheet/deal-sheet.component';


@NgModule({
  declarations: [
    CreateRfpComponent,
    ViewRfpComponent,
    OffersTableComponent,
    RfpListComponent,
    RfpComponent,
    OfferCreateComponent,
    DealSheetComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    RfpRoutingModule
  ]
})
export class RfpModule { }
