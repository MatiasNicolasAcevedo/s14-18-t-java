package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.RecordByGame;
import com.awaregaming.AwareGaming.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRecordByGameRepository extends JpaRepository<RecordByGame, Long> {

           List<RecordByGame> findByUser(User user);

}
