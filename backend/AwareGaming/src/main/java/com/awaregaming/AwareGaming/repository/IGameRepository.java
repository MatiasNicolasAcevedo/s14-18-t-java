package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGameRepository extends JpaRepository<Game, Integer> {
}
