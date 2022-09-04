package com.traditionenergy.domain.entities.offer;

import com.traditionenergy.domain.entities.users.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class OfferDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    Date created;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    User supplier;

    Double volume;
    String location;
    Double rate;

    String comments;
}
