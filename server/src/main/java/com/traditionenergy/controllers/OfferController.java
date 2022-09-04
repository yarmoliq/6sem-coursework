package com.traditionenergy.controllers;

import com.traditionenergy.domain.entities.offer.OfferRepository;
import com.traditionenergy.domain.entities.rfp.Rfp;
import com.traditionenergy.domain.entities.rfp.RfpRepository;
import com.traditionenergy.domain.entities.users.UserRepository;
import com.traditionenergy.models.requests.CreateOfferRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/offer")
public class OfferController extends BaseController {
    private final OfferRepository offerRepository;
    private final RfpRepository rfpRepository;
    private final UserRepository userRepository;

    @RequestMapping(method = RequestMethod.POST, value="create")
    public void create(@RequestBody CreateOfferRequest request)
    {
        var currentUser = userRepository.findByUserName(getCurrentUserName()).get();
        var rfp = rfpRepository.findById(request.getRfpId()).get();

        var offer = request.getOffer();
        offer.setCreated(new Date());
        offer.setSupplier(currentUser);
        offerRepository.save(offer);

        rfp.getOffers().add(offer);
        rfpRepository.save(rfp);
    }

    @RequestMapping(method = RequestMethod.GET, value = "delete")
    public Rfp delete(int offerId)
    {
        var rfp = findRfpByOfferId(offerId);
        var offer = offerRepository.findById(offerId).get();
        rfp.getOffers().remove(offer);
        rfpRepository.save(rfp);
        offerRepository.delete(offer);
        return rfp;
    }

    Rfp findRfpByOfferId(int offerId) {
        for (var rfp : rfpRepository.findAll()) {
            for (var o : rfp.getOffers()) {
                if (o.getId() == offerId) {
                    return rfp;
                }
            }
        }
        return null;
    }
}
