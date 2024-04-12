package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.entities.RecordByGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordByGameRepository extends JpaRepository<RecordByGame, Long> {
}
