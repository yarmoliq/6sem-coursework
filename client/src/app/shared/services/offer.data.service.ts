import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { actionRoutes, controllerRoutes } from '../constants/url.constants';
import { BaseDataService } from './base.data.service';
import { OfferDetails } from '../models/offer-details.model';

@Injectable({ providedIn: 'root' })
export class OfferDataService extends BaseDataService {
  public constructor(protected readonly httpClient: HttpClient) {
    super(httpClient, controllerRoutes.offer);
  }

  public create(offer: OfferDetails, rfpId: number): Observable<OfferDetails> {
    return this.sendPostRequest({ offer, rfpId }, actionRoutes.offerCreate);
  }

  // public getById(id: number): Observable<OfferDetails> {
  //   return this.sendGetRequest({ offerId: id }, actionRoutes.offerGet);
  // }

  public delete(id: number): Observable<OfferDetails> {
    return this.sendGetRequest({ offerId: id }, actionRoutes.offerDelete);
  }

  // public getAllForRfp(rfpId: number): Observable<OfferDetails[]> {
  //   return this.sendGetRequest({ rfpId }, actionRoutes.offerGetForRfp);
  // }
}
