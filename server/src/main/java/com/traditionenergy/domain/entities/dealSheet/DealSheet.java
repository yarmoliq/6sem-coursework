package com.traditionenergy.domain.entities.dealSheet;

import com.traditionenergy.domain.entities.users.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class DealSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    Date created;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    User customer;
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    User supplier;

    Double volume;
    Double rate;
    String destinationAddress;
    String departureAddress;
}
