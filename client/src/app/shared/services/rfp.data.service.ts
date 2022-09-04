import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actionRoutes, controllerRoutes } from '../constants/url.constants';
import { BaseDataService } from './base.data.service';

import { Rfp } from '../models/rfp.model';

@Injectable({ providedIn: 'root' })
export class RfpDataService extends BaseDataService {
  public constructor(protected readonly httpClient: HttpClient) {
    super(httpClient, controllerRoutes.rfp);
  }

  public create(rfp: Rfp): Observable<Rfp> {
    return this.sendPostRequest(rfp, actionRoutes.rfpCreate);
  }

  public update(rfp: Rfp): Observable<Rfp> {
    return this.sendPostRequest(rfp, actionRoutes.rfpUpdate);
  }

  public getById(id: number): Observable<Rfp> {
    return this.sendGetRequest({ rfpId: id }, actionRoutes.rfpGet);
  }

  public delete(id: number): Observable<Rfp> {
    return this.sendGetRequest({ rfpId: id }, actionRoutes.rfpDelete);
  }

  public getAll(): Observable<Rfp[]> {
    return this.sendGetRequest('', actionRoutes.rfpGetAll);
  }
}
