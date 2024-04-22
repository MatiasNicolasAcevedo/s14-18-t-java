package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.model.RecordGames;
import com.awaregaming.AwareGaming.service.RecordGamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/record-games")
public class RecordGamesController {

    @Autowired
    private RecordGamesService recordGamesService;


    @GetMapping
    public List<RecordGames> getAllRecordGames() {
        return recordGamesService.getAllRecordGames();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecordGames createRecordGame(@RequestBody RecordGames recordGame) {
        return recordGamesService.createRecordGame(recordGame);
    }

    @GetMapping("/{id}")
    public RecordGames getRecordGame(@PathVariable Long id) {
        return recordGamesService.getRecordGame(id);
    }

    @PutMapping("/{id}")
    public RecordGames updateRecordGame(@PathVariable Integer id, @RequestBody RecordGames recordGame) {
        return recordGamesService.updateRecordGame(id, recordGame);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecordGame(@PathVariable Long id) {
        recordGamesService.deleteRecordGame(id);
    }


    //consultar con el equipo de backend
    /*@GetMapping("/weekly-summary")
    public ResponseEntity<List<RecordGames>> getWeeklyActivitySummary(Authentication authentication) {
        //ID del usuario autenticado utilizando Authentication
        Long userId = getUserIdFromAuthentication(authentication);

        List<RecordGames> weeklySummary = recordGamesService.getWeeklyActivitySummaryByUserId(userId);
        return ResponseEntity.ok(weeklySummary);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        // lógica para obtener el ID del usuario autenticado
        // Puedes usar el nombre de usuario, el correo electrónico u otros segun la autenticacion
        // ejemplo:
        // String userEmail = authentication.getName();
        // Long userId = userService.getUserIdByEmail(userEmail);
        // return userId;

        return null;
    }*/

}