export enum RfpStatus {
    acceptingOffers,
    offerAccepted,
    closed,
}

export const rfpStatusDictionary = new Map<RfpStatus | undefined | null, string>([
  [RfpStatus.acceptingOffers, 'Accepting Offers'],
  [RfpStatus.offerAccepted, 'Offer Accepted'],
  [RfpStatus.closed, 'Closed'],
]);
