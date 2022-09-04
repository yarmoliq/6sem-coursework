package com.traditionenergy.domain.entities.rfp;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RfpStatus {
    AcceptingOffer, OfferAccepted;

    @JsonValue
    public int getCode() {
        return ordinal();
    }
}
