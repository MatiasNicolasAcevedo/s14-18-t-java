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
        // Obtener el usuario desde la base de datos utilizando el correo electrónico.
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Obtener el crédito actual del usuario.
        int currentCredit = user.getCredits();

        // Verificar si el usuario tiene suficiente crédito para jugar.
        if (currentCredit < rouletteBetRequestDto.getBetAmount()) {
            throw new RuntimeException("Not enough credits to place this bet");
        }

        // Generar un número aleatorio entre 0 y 36 para la ruleta.
        Random random = new Random();
        int randomNumber = random.nextInt(37); // Número entre 0 y 36

        // Calcular el resultado de la apuesta.
        String result = calculateRouletteResult(rouletteBetRequestDto, randomNumber);

        // Actualizar el crédito del usuario.
        if ("WIN".equals(result)) {
            currentCredit += rouletteBetRequestDto.getBetAmount() * 36; // Pago 36 a 1 en apuestas a un número específico.
        } else {
            currentCredit -= rouletteBetRequestDto.getBetAmount();
        }

        // Actualizar y guardar el crédito en la base de datos.
        user.setCredits(currentCredit);
        userRepository.save(user);

        // Crear y retornar el DTO con los resultados de la ruleta.
        RouletteBetResponseDto rouletteBetResponseDto = new RouletteBetResponseDto();
        rouletteBetResponseDto.setResult(result);
        rouletteBetResponseDto.setNewCredit(currentCredit);
        rouletteBetResponseDto.setWinningNumber(randomNumber);

        return rouletteBetResponseDto;
    }

    /**
     * Método privado para calcular el resultado de la apuesta en la ruleta.
     *
     * @param betRequest    Objeto con la información de la apuesta
     * @param randomNumber  Número aleatorio generado para la ruleta
     * @return              Resultado de la apuesta ("WIN" o "LOSE")
     */
    private String calculateRouletteResult(RouletteBetRequestDto betRequest, int randomNumber) {
        // Listas de números para las diferentes apuestas en la ruleta.
        List<Integer> colorNumbers = Arrays.asList(2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35);
        List<Integer> whiteNumbers = Arrays.asList(1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36);
        List<Integer> lowerNumbers = IntStream.rangeClosed(1, 18).boxed().toList();
        List<Integer> highNumbers = IntStream.rangeClosed(19, 36).boxed().toList();
        List<Integer> firstDozen = IntStream.rangeClosed(1, 12).boxed().toList();
        List<Integer> secondDozen = IntStream.rangeClosed(13, 24).boxed().toList();
        List<Integer> thirdDozen = IntStream.rangeClosed(25, 36).boxed().toList();
        List<Integer> firstRow = Arrays.asList(1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34);
        List<Integer> secondRow = Arrays.asList(2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35);
        List<Integer> thirdRow = Arrays.asList(3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36);

        // Evaluar el tipo de apuesta y calcular el resultado.
        return switch (betRequest.getBetTypeRoulette()) {
            case COLOR -> colorNumbers.contains(randomNumber) ? "WIN" : "LOSE";
            case WHITE -> whiteNumbers.contains(randomNumber) ? "WIN" : "LOSE";
            case EVEN -> (randomNumber % 2 == 0 && randomNumber != 0) ? "WIN" : "LOSE";
            case ODD -> (randomNumber % 2 != 0) ? "WIN" : "LOSE";
            case NUMBER -> {
                // Validar la apuesta y el monto.
                if (betRequest.getBetNumber() < 0 || betRequest.getBetNumber() > 36 || betRequest.getBetAmount() < 0) {
                    throw new RuntimeException("Invalid number bet or bet amount");
                }
                // Calcular el resultado para la apuesta a un número específico.
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
        // Obtener el usuario desde la base de datos utilizando el correo electrónico.
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Obtener el crédito actual del usuario.
        int currentCredit = user.getCredits();

        // Verificar si el usuario tiene suficiente crédito para jugar.
        if (currentCredit < diceBetRequestDto.getBetAmount()) {
            throw new RuntimeException("Not enough credits to place this bet");
        }

        // Generar números aleatorios entre 1 y 6 para los dos dados.
        Random random = new Random();
        int dice1 = random.nextInt(6) + 1;
        int dice2 = random.nextInt(6) + 1;

        // Calcular el resultado de la apuesta.
        String result = calculateDiceResult(diceBetRequestDto, dice1, dice2);

        // Actualizar el crédito del usuario.
        if ("WIN".equals(result)) {
            currentCredit += diceBetRequestDto.getBetAmount() * 36; // Pago 36 a 1 en apuestas a ambos dados.
        } else {
            currentCredit -= diceBetRequestDto.getBetAmount();
        }

        // Actualizar y guardar el crédito en la base de datos.
        user.setCredits(currentCredit);
        userRepository.save(user);

        // Crear y retornar el DTO con los resultados de los dados.
        DiceBetResponseDto diceBetResponseDto = new DiceBetResponseDto();
        diceBetResponseDto.setResult(result);
        diceBetResponseDto.setNewCredit(currentCredit);
        diceBetResponseDto.setDice1(dice1);
        diceBetResponseDto.setDice2(dice2);
        diceBetResponseDto.setTotalDice(dice1 + dice2);

        return diceBetResponseDto;
    }

    /**
     * Método privado para calcular el resultado de la apuesta en el juego de dados.
     *
     * @param betRequest    Objeto con la información de la apuesta
     * @param dice1         Resultado del primer dado
     * @param dice2         Resultado del segundo dado
     * @return              Resultado de la apuesta ("WIN" o "LOSE")
     */
    private String calculateDiceResult(DiceBetRequestDto betRequest, int dice1, int dice2) {
        // Evaluar el tipo de apuesta y calcular el resultado.
        switch (betRequest.getBetType()) {
            case INDIVIDUAL:
                // Verificar si ambos dados coinciden con los valores apostados.
                if (dice1 == betRequest.getBetDice1() && dice2 == betRequest.getBetDice2()) {
                    return "WIN";
                } else {
                    return "LOSE";
                }

            case TOTAL:
                // Calcular la suma de los dados.
                int totalDice = dice1 + dice2;
                // Verificar si la suma coincide con el valor apostado.
                return (totalDice == betRequest.getBetDice1()) ? "WIN" : "LOSE";

            default:
                throw new RuntimeException("Invalid bet type");
        }
    }

}
