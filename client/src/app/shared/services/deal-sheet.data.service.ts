import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actionRoutes, controllerRoutes } from '../constants/url.constants';
import { DealSheet } from '../models/dealSheet.model';
import { BaseDataService } from './base.data.service';

@Injectable({ providedIn: 'root' })
export class DealSheetDataService extends BaseDataService {
  public constructor(protected readonly httpClient: HttpClient) {
    super(httpClient, controllerRoutes.dealSheet);
  }

  public create(offerId: number): Observable<DealSheet> {
    return this.sendGetRequest({ offerId }, actionRoutes.dealSheetCreate);
  }
}
