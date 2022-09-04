package com.traditionenergy.controllers;


import com.traditionenergy.domain.entities.dealSheet.DealSheet;
import com.traditionenergy.domain.entities.dealSheet.DealSheetRepository;
import com.traditionenergy.domain.entities.offer.OfferRepository;
import com.traditionenergy.domain.entities.rfp.Rfp;
import com.traditionenergy.domain.entities.rfp.RfpRepository;
import com.traditionenergy.domain.entities.rfp.RfpStatus;
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
@RequestMapping("api/deal-sheet")
public class DealSheetController extends BaseController {
    private final OfferRepository offerRepository;
    private final RfpRepository rfpRepository;
    private final UserRepository userRepository;
    private final DealSheetRepository dealSheetRepository;

    @RequestMapping(method = RequestMethod.GET, value="create")
    public void create(int offerId)
    {
        var currentUser = userRepository.findByUserName(getCurrentUserName()).get();
        var offer = offerRepository.findById(offerId).get();
        var rfp = findRfpByOfferId(offerId);

        var ds = new DealSheet();
        ds.setCreated(new Date());
        ds.setCustomer(rfp.getCustomer());
        ds.setSupplier(offer.getSupplier());
        ds.setRate(offer.getRate());
        ds.setVolume(offer.getVolume());
        ds.setDepartureAddress(offer.getLocation());
        ds.setDestinationAddress(rfp.getLocation());
        dealSheetRepository.save(ds);
        rfp.setDealSheet(ds);
        rfp.setStatus(RfpStatus.OfferAccepted);
        rfpRepository.save(rfp);
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
