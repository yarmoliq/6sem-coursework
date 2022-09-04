package com.traditionenergy.domain.entities.rfp;

import com.traditionenergy.domain.entities.dealSheet.DealSheet;
import com.traditionenergy.domain.entities.offer.OfferDetails;
import com.traditionenergy.domain.entities.users.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Rfp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    Date created;
    RfpStatus status;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    User customer;

    String commodity;
    Double volume;
    String location;
    String comments;

    @OneToMany
    List<OfferDetails> offers;

    @OneToOne
    @JoinColumn(name = "deal_sheet_id")
    DealSheet dealSheet;
}
