package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.SupportContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISupportContactRepository extends JpaRepository<SupportContact, Integer> {

}
