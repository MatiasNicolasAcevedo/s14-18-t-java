package com.awaregaming.AwareGaming.service;


import com.awaregaming.AwareGaming.dto.RecordByGameResponseDTO;
import com.awaregaming.AwareGaming.model.RecordByGame;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import com.awaregaming.AwareGaming.repository.IRecordByGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecordByGameService implements IRecordByGameService {

    @Autowired
    private IRecordByGameRepository recordByGameRepository;

    @Autowired
    private IUserRepository userRepository;

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


    @Override
    public List<RecordByGameResponseDTO> getAllUserRecords(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<RecordByGame> recordGames = recordByGameRepository.findByUser(user);
        return recordGames.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    @Override
    public List<RecordByGameResponseDTO> getAllUsersRecords() {
        List<RecordByGame> recordGames = recordByGameRepository.findAll();
        return recordGames.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    private RecordByGameResponseDTO mapToResponseDTO(RecordByGame recordByGame){
        String userName = recordByGame.getUser().getFirstName() + " " + recordByGame.getUser().getLastName();
        return RecordByGameResponseDTO.builder()
                .fullName(userName)
                .betTypeRoulette(recordByGame.getBetTypeRoulette())
                .betAmount(recordByGame.getBetAmount())
                .betNumber(recordByGame.getBetNumber())
                .winningNumber(recordByGame.getWinningNumber())
                .result(recordByGame.getResult())
                .build();
    }
}
