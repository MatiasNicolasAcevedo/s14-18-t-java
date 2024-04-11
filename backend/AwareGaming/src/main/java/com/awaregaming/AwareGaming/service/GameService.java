package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
import com.awaregaming.AwareGaming.model.Game;

import java.util.List;

public class GameService implements IGameService{

    @Override
    public List<Game> getAllGames() {
        return null;
    }

    @Override
    public Game getGameById(Long id) {
        return null;
    }

    @Override
    public Game saveGame(Game game) {
        return null;
    }

    @Override
    public void deleteGame(Long id) {

    }

    @Override
    public RouletteBetResponseDto playRoulette(RouletteBetRequestDto rouletteBetRequestDto) {
        return null;
    }

    @Override
    public DiceBetResponseDto playDice(DiceBetRequestDto diceBetRequestDto) {
        return null;
    }
    
}
