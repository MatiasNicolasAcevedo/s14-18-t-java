package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.RecordByGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRecordByGameRepository extends JpaRepository<RecordByGame, Long> {



}
