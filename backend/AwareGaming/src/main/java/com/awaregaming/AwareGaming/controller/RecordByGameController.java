package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.dto.RecordByGameResponseDTO;
import com.awaregaming.AwareGaming.service.RecordByGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("v1/api/record-game")
public class RecordByGameController {

    @Autowired
    private RecordByGameService recordByGameService;


    @GetMapping
    public ResponseEntity<List<RecordByGameResponseDTO>> getAllUserRecords(Authentication authentication) {
        String userEmail = authentication.getName();
        List<RecordByGameResponseDTO> recordGames = recordByGameService.getAllUserRecords(userEmail);
        return ResponseEntity.ok(recordGames);
    }

    @GetMapping("/all")
    public ResponseEntity<List<RecordByGameResponseDTO>> getAllUsersRecords() {
        List<RecordByGameResponseDTO> recordGames = recordByGameService.getAllUsersRecords();
        return ResponseEntity.ok(recordGames);
    }



}