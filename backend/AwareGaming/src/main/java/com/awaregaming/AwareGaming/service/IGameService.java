package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
import com.awaregaming.AwareGaming.model.Game;

import java.util.List;

public interface IGameService {
    List<Game> getAllGames();
    Game getGameById(Long id);
    Game saveGame(Game game);
    void deleteGame(Long id);
    RouletteBetResponseDto playRoulette(RouletteBetRequestDto rouletteBetRequestDto);
    DiceBetResponseDto playDice(DiceBetRequestDto diceBetRequestDto);
}

