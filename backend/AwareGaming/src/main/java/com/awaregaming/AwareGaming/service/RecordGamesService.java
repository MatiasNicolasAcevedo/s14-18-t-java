package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.entities.RecordGames;
import com.awaregaming.AwareGaming.repository.RecordGamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecordGamesService {

    private final RecordGamesRepository recordGamesRepository;

    @Autowired
    public RecordGamesService(RecordGamesRepository recordGamesRepository) {
        this.recordGamesRepository = recordGamesRepository;
    }

    public List<RecordGames> getAllRecordGames() {
        return recordGamesRepository.findAll();
    }

    public RecordGames getRecordGame(Long id) {
        return recordGamesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el registro de juegos con ID: " + id));
    }

    public RecordGames createRecordGame(RecordGames recordGame) {
        return recordGamesRepository.save(recordGame);
    }

    public RecordGames updateRecordGame(Long id, RecordGames recordGame) {
        recordGame.setId(id);
        return recordGamesRepository.save(recordGame);
    }

    public void deleteRecordGame(Long id) {
        recordGamesRepository.deleteById(id);
    }


    ///consultar con el equipo de backend
    public List<RecordGames> getWeeklyActivitySummaryByUserId(Long userId) {
        return recordGamesRepository.findWeeklyActivitySummaryByUserId(userId);
    }

}