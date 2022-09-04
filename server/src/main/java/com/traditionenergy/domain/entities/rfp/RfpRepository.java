package com.traditionenergy.domain.entities.rfp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RfpRepository extends JpaRepository<Rfp, Integer> {
}
