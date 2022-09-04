import { User } from './user.model';

export interface OfferDetails {
    id?: number;
    created?: Date;
    supplier?: User;

    volume: number;
    location: string;
    rate: number;

    comments: string;
}
