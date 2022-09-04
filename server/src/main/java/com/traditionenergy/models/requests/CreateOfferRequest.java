package com.traditionenergy.models.requests;


import com.traditionenergy.domain.entities.offer.OfferDetails;
import lombok.Data;

@Data
public class CreateOfferRequest {
    OfferDetails offer;
    Integer rfpId;
}
