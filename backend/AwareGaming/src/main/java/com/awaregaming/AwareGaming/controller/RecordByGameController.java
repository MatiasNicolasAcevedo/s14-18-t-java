package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.model.RecordByGame;
import com.awaregaming.AwareGaming.service.RecordByGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/games")
public class RecordByGameController {

    @Autowired
    private RecordByGameService recordByGameService;


    @GetMapping
    public List<RecordByGame> getAllGames(){
        return recordByGameService.getAllGames();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecordByGame createGame(@RequestBody RecordByGame game) {
        return recordByGameService.createGame(game);
    }

    @GetMapping("/{id}")
    public RecordByGame getGame(@PathVariable Long id) {
        return recordByGameService.getGame(id);
    }

    @PutMapping("/{id}")
    public RecordByGame updateGame(@PathVariable Long id, @RequestBody RecordByGame game) {
        return recordByGameService.updateGame(id, game);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGame(@PathVariable Long id) {
        recordByGameService.deleteGame(id);
    }
}