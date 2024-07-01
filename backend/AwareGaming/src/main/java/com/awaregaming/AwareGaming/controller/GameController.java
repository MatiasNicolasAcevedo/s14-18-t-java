package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
import com.awaregaming.AwareGaming.model.Game;
import com.awaregaming.AwareGaming.service.IGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/game")
public class GameController {

    @Autowired
    IGameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Integer id) {
        return gameService.getGameById(id);
    }

    @PostMapping
    public Game saveGame(@RequestBody Game game) {
        return gameService.saveGame(game);
    }

    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable Integer id) {
        gameService.deleteGame(id);
    }

    @PostMapping("/play-roulette")
    public RouletteBetResponseDto playRoulette(@RequestBody RouletteBetRequestDto rouletteBetRequestDto, Authentication authentication) {
        String userEmail = authentication.getName();
        return gameService.playRoulette(rouletteBetRequestDto, userEmail);
    }

    @PostMapping("/play-dice")
    public DiceBetResponseDto playDice(@RequestBody DiceBetRequestDto diceBetRequestDto, Authentication authentication) {
        String userEmail = authentication.getName();
        return gameService.playDice(diceBetRequestDto, userEmail);
    }

}

