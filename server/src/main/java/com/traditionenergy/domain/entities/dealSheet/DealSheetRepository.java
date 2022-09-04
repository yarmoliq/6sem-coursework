package com.traditionenergy.domain.entities.dealSheet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealSheetRepository extends JpaRepository<DealSheet, Integer> {
}
