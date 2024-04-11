package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
import com.awaregaming.AwareGaming.model.Game;

import java.util.List;

public interface IGameService {
    List<Game> getAllGames();
    Game getGameById(Integer id);
    Game saveGame(Game game);
    void deleteGame(Integer id);

    RouletteBetResponseDto playRoulette(RouletteBetRequestDto rouletteBetRequestDto, String userEmail);

    DiceBetResponseDto playDice(DiceBetRequestDto diceBetRequestDto);
}

