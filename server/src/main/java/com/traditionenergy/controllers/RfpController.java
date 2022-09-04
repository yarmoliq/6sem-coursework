package com.traditionenergy.controllers;

import com.traditionenergy.domain.entities.rfp.Rfp;
import com.traditionenergy.domain.entities.rfp.RfpRepository;
import com.traditionenergy.domain.entities.rfp.RfpStatus;
import com.traditionenergy.domain.entities.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/rfp")
public class RfpController extends BaseController{
    private final RfpRepository rfpRepository;
    private final UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET, value = "get")
    public Rfp get(int rfpId)
    {
        var rfp = rfpRepository.findById(rfpId).get();
        return rfp;
    }

    @RequestMapping(method = RequestMethod.GET, value = "get-all")
    public List<Rfp> getAll()
    {
        var rfps = rfpRepository.findAll();
        return rfps;
    }

    @RequestMapping(method = RequestMethod.GET, value = "delete")
    public Rfp delete(int rfpId)
    {
        var rfp = rfpRepository.findById(rfpId).get();
        rfpRepository.delete(rfp);
        return rfp;
    }

    @RequestMapping(method = RequestMethod.POST, value="create")
    public Rfp create(@RequestBody Rfp rfp)
    {
        var currentUser = userRepository.findByUserName(getCurrentUserName()).get();

        rfp.setCreated(new Date());
        rfp.setStatus(RfpStatus.AcceptingOffer);
        rfp.setCustomer(currentUser);

        rfpRepository.save(rfp);
        return rfp;
    }

    @RequestMapping(method = RequestMethod.POST, value="update")
    public Rfp update(@RequestBody Rfp rfp)
    {
        var currentUser = userRepository.findByUserName(getCurrentUserName()).get();
        var originalRfp = rfpRepository.findById(rfp.getId()).get();

        if(currentUser.getId() != originalRfp.getCustomer().getId()) {
            return null;
        }

        originalRfp.setComments(rfp.getComments());

        rfpRepository.save(originalRfp);
        return originalRfp;
    }
}
