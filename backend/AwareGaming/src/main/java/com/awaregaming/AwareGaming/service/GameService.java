package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
import com.awaregaming.AwareGaming.model.Enum.BetType;
import com.awaregaming.AwareGaming.model.Game;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.IGameRepository;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@Service
public class GameService implements IGameService{

    @Autowired
    IGameRepository gameRepository;

    @Autowired
    IUserRepository userRepository;

    @Override
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @Override
    public Game getGameById(Integer id) {
        return gameRepository.findById(id).orElse(null);
    }

    @Override
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    @Override
    public void deleteGame(Integer id) {
        gameRepository.deleteById(id);
    }

    @Override
    public RouletteBetResponseDto playRoulette(RouletteBetRequestDto rouletteBetRequestDto, String userEmail) {
        Random random = new Random();
        int randomNumber = random.nextInt(37); // Número entre 0 y 36

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        int newCredit = user.getCredits();
        String result = calculateRouletteResult(rouletteBetRequestDto, randomNumber, newCredit);

        user.setCredits(newCredit);
        userRepository.save(user);

        RouletteBetResponseDto rouletteBetResponseDto = new RouletteBetResponseDto();
        rouletteBetResponseDto.setResult(result);
        rouletteBetResponseDto.setNewCredit(newCredit);
        rouletteBetResponseDto.setWinningNumber(randomNumber);

        return rouletteBetResponseDto;
    }

    private String calculateRouletteResult(RouletteBetRequestDto betRequest, int randomNumber, int currentCredit) {
        List<Integer> redNumbers = Arrays.asList(1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36);
        List<Integer> blackNumbers = Arrays.asList(2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35);
        List<Integer> lowerNumbers = IntStream.rangeClosed(1, 18).boxed().toList();
        List<Integer> highNumbers = IntStream.rangeClosed(19, 36).boxed().toList();
        List<Integer> firstDozen = IntStream.rangeClosed(1, 12).boxed().toList();
        List<Integer> secondDozen = IntStream.rangeClosed(13, 24).boxed().toList();
        List<Integer> thirdDozen = IntStream.rangeClosed(25, 36).boxed().toList();
        List<Integer> firstRow = Arrays.asList(1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34);
        List<Integer> secondRow = Arrays.asList(2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35);
        List<Integer> thirdRow = Arrays.asList(3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36);

        return switch (betRequest.getBetType()) {
            case RED -> redNumbers.contains(randomNumber) ? "WIN" : "LOSE";
            case BLACK -> blackNumbers.contains(randomNumber) ? "WIN" : "LOSE";
            case EVEN -> (randomNumber % 2 == 0 && randomNumber != 0) ? "WIN" : "LOSE";
            case ODD -> (randomNumber % 2 != 0) ? "WIN" : "LOSE";
            case NUMBER -> {
                if (betRequest.getBetNumber() < 0 || betRequest.getBetNumber() > 36 || betRequest.getBetAmount() < 0) {
                    throw new RuntimeException("Invalid number bet or bet amount");
                }
                yield (randomNumber == betRequest.getBetNumber()) ? "WIN" : "LOSE";
            }
            case LOWER_NUMBERS -> lowerNumbers.contains(randomNumber) ? "WIN" : "LOSE";
            case HIGH_NUMBERS -> highNumbers.contains(randomNumber) ? "WIN" : "LOSE";
            case FIRST_DOZEN -> firstDozen.contains(randomNumber) ? "WIN" : "LOSE";
            case SECOND_DOZEN -> secondDozen.contains(randomNumber) ? "WIN" : "LOSE";
            case THIRD_DOZEN -> thirdDozen.contains(randomNumber) ? "WIN" : "LOSE";
            case FIRST_ROW -> firstRow.contains(randomNumber) ? "WIN" : "LOSE";
            case SECOND_ROW -> secondRow.contains(randomNumber) ? "WIN" : "LOSE";
            case THIRD_ROW -> thirdRow.contains(randomNumber) ? "WIN" : "LOSE";
            default -> throw new RuntimeException("Invalid bet type");
        };
    }

    @Override
    public DiceBetResponseDto playDice(DiceBetRequestDto diceBetRequestDto, String userEmail) {
        Random random = new Random();
        int dice1 = random.nextInt(6) + 1; // Número entre 1 y 6 para el primer dado
        int dice2 = random.nextInt(6) + 1; // Número entre 1 y 6 para el segundo dado
        int totalDice = dice1 + dice2; // Suma total de los dos dados

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        int newCredit = user.getCredits();
        String result = calculateDiceResult(diceBetRequestDto, totalDice, newCredit);

        // Actualizar el crédito del usuario y guardar en la base de datos
        user.setCredits(newCredit);
        userRepository.save(user);

        // Crear y retornar el DTO con los resultados de los dados
        DiceBetResponseDto diceBetResponseDto = new DiceBetResponseDto();
        diceBetResponseDto.setResult(result);
        diceBetResponseDto.setNewCredit(newCredit);
        diceBetResponseDto.setDice1(dice1);
        diceBetResponseDto.setDice2(dice2);
        diceBetResponseDto.setTotalDice(totalDice);

        return diceBetResponseDto;
    }

    private String calculateDiceResult(DiceBetRequestDto betRequest, int totalDice, int currentCredit) {
        if (betRequest.getBetType() == BetType.NUMBER) {
            if (betRequest.getBetNumber() < 2 || betRequest.getBetNumber() > 12 || betRequest.getBetAmount() < 0) {
                throw new RuntimeException("Invalid number bet or bet amount");
            }

            if (totalDice == betRequest.getBetNumber()) {
                currentCredit += betRequest.getBetAmount() * 6; // Pago 6 a 1 en apuestas a un número específico
                return "WIN";
            } else {
                currentCredit -= betRequest.getBetAmount();
                return "LOSE";
            }
        } else {
            throw new RuntimeException("Invalid bet type");
        }
    }

}
