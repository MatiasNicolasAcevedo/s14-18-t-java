package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
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
        String result;

        // Listas de numeros con las jugadas posibles para la ruleta americana.
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

        switch (rouletteBetRequestDto.getBetType()) {
            case RED:
                result = redNumbers.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() : -rouletteBetRequestDto.getBetAmount();
                break;
            case BLACK:
                result = blackNumbers.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() : -rouletteBetRequestDto.getBetAmount();
                break;
            case EVEN:
                result = (randomNumber % 2 == 0 && randomNumber != 0) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() : -rouletteBetRequestDto.getBetAmount();
                break;
            case ODD:
                result = (randomNumber % 2 != 0) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() : -rouletteBetRequestDto.getBetAmount();
                break;
            case NUMBER:
                if (rouletteBetRequestDto.getBetNumber() < 0 || rouletteBetRequestDto.getBetNumber() > 36 || rouletteBetRequestDto.getBetAmount() < 0) {
                    throw new RuntimeException("Invalid number bet or bet amount");
                }
                result = (randomNumber == rouletteBetRequestDto.getBetNumber()) ? "WIN" : "LOSE";
                if (result.equals("WIN")) {
                    newCredit += rouletteBetRequestDto.getBetAmount() * 35;
                } else {
                    newCredit -= rouletteBetRequestDto.getBetAmount();
                }
                break;
            case LOWER_NUMBERS:
                result = lowerNumbers.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() : -rouletteBetRequestDto.getBetAmount();
                break;
            case HIGH_NUMBERS:
                result = highNumbers.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() : -rouletteBetRequestDto.getBetAmount();
                break;
            case FIRST_DOZEN:
                result = firstDozen.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() * 2 : -rouletteBetRequestDto.getBetAmount();
                break;
            case SECOND_DOZEN:
                result = secondDozen.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() * 2 : -rouletteBetRequestDto.getBetAmount();
                break;
            case THIRD_DOZEN:
                result = thirdDozen.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() * 2 : -rouletteBetRequestDto.getBetAmount();
                break;
            case FIRST_ROW:
                result = firstRow.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() * 3 : -rouletteBetRequestDto.getBetAmount();
                break;
            case SECOND_ROW:
                result = secondRow.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() * 3 : -rouletteBetRequestDto.getBetAmount();
                break;
            case THIRD_ROW:
                result = thirdRow.contains(randomNumber) ? "WIN" : "LOSE";
                newCredit += (result.equals("WIN")) ? rouletteBetRequestDto.getBetAmount() * 3 : -rouletteBetRequestDto.getBetAmount();
                break;

            default:
                throw new RuntimeException("Invalid bet type");
        }

        user.setCredits(newCredit);
        userRepository.save(user);

        RouletteBetResponseDto rouletteBetResponseDto = new RouletteBetResponseDto();
        rouletteBetResponseDto.setResult(result);
        rouletteBetResponseDto.setNewCredit(newCredit);
        rouletteBetResponseDto.setWinningNumber(randomNumber);

        return rouletteBetResponseDto;
    }

    @Override
    public DiceBetResponseDto playDice(DiceBetRequestDto diceBetRequestDto) {
        return null;
    }

}
