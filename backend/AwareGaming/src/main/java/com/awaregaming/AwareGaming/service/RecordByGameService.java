package com.awaregaming.AwareGaming.service;


import com.awaregaming.AwareGaming.entities.RecordByGame;
import com.awaregaming.AwareGaming.repository.RecordByGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordByGameService {

    private final RecordByGameRepository recordByGameRepository;

    @Autowired
    public RecordByGameService(RecordByGameRepository recordByGameRepository) {
        this.recordByGameRepository = recordByGameRepository;
    }

    public List<RecordByGame> getAllGames() {
        return recordByGameRepository.findAll();
    }

    public RecordByGame getGame(Long id) {
        return recordByGameRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el juego con ID: " + id));
    }

    public RecordByGame createGame(RecordByGame game) {
        return recordByGameRepository.save(game);
    }

    public RecordByGame updateGame(Long id, RecordByGame game) {
        //game.setId(id);
        return recordByGameRepository.save(game);
    }

    public void deleteGame(Long id) {
        recordByGameRepository.deleteById(id);
    }
}
