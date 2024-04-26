package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.DiceBetRequestDto;
import com.awaregaming.AwareGaming.dto.DiceBetResponseDto;
import com.awaregaming.AwareGaming.dto.RouletteBetRequestDto;
import com.awaregaming.AwareGaming.dto.RouletteBetResponseDto;
import com.awaregaming.AwareGaming.model.Enum.BetTypeRoulette;
import com.awaregaming.AwareGaming.model.Game;
import com.awaregaming.AwareGaming.model.RecordByGame;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.model.Game;
import com.awaregaming.AwareGaming.repository.IGameRepository;
import com.awaregaming.AwareGaming.repository.IRecordByGameRepository;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class GameService implements IGameService{

    @Autowired
    IGameRepository gameRepository;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    IRecordByGameRepository recordByGameRepository;

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
        int winningAmount = calculateWinningAmount(rouletteBetRequestDto.getBetTypeRoulette(), rouletteBetRequestDto.getBetAmount(), randomNumber, rouletteBetRequestDto.getBetNumber());
        String result = winningAmount > 0 ? "WIN" : "LOSE";
        String numberColor = winningNumberIsColor(randomNumber) ? "COLOR" : "WHITE"; // Añadir el color del número ganador

        // Actualizar el crédito del usuario.
        currentCredit += winningAmount;
        currentCredit -= rouletteBetRequestDto.getBetAmount(); // Restar la apuesta realizada

        // Actualizar y guardar el crédito en la base de datos.
        user.setCredits(currentCredit);
        userRepository.save(user);

        //Guardamos el registro de la jugada en la base de datos para luego mostrarlo
        RecordByGame recordByGame = new RecordByGame();
        recordByGame.setUser(user);
        recordByGame.setBetTypeRoulette(rouletteBetRequestDto.getBetTypeRoulette());
        recordByGame.setBetAmount(rouletteBetRequestDto.getBetAmount());
        recordByGame.setBetNumber(rouletteBetRequestDto.getBetNumber());
        recordByGame.setWinningNumber(randomNumber);
        recordByGame.setResult(result);
        recordByGameRepository.save(recordByGame);

        // Crear y retornar el DTO con los resultados de la ruleta.

        return RouletteBetResponseDto.builder()
                .result(result)
                .newCredit(currentCredit)
                .winningNumber(randomNumber)
                .numberColor(numberColor) // Añadir el color del número ganador al DTO
                .winningAmount(winningAmount) // Añadir los créditos ganados al DTO
                .build();
    }

    /**
     * Método privado para calcular el monto ganado en la apuesta en la ruleta.
     *
     * @param betType       Tipo de apuesta
     * @param betAmount     Monto de la apuesta
     * @param winningNumber Número ganador en la ruleta
     * @param betNumber     Número apostado por el usuario (sólo para el tipo de apuesta NUMBER)
     * @return              Monto ganado
     */
    private int calculateWinningAmount(BetTypeRoulette betType, int betAmount, int winningNumber, Integer betNumber) {
        return switch (betType) {
            case COLOR -> betAmount * (winningNumberIsColor(winningNumber) ? 2 : 0);
            case WHITE -> betAmount * (winningNumberIsWhite(winningNumber) ? 2 : 0);
            case EVEN -> betAmount * (winningNumberIsEven(winningNumber) ? 2 : 0);
            case ODD -> betAmount * (winningNumberIsOdd(winningNumber) ? 2 : 0);
            case NUMBER -> betAmount * (winningNumberIsRandomNumber(winningNumber, betNumber) ? 36 : 0);
            case LOWER_NUMBERS -> betAmount * (winningNumberIsLower(winningNumber) ? 2 : 0);
            case HIGH_NUMBERS -> betAmount * (winningNumberIsHigh(winningNumber) ? 2 : 0);
            case FIRST_DOZEN -> betAmount * (winningNumberIsInDozen(winningNumber, 1) ? 3 : 0);
            case SECOND_DOZEN -> betAmount * (winningNumberIsInDozen(winningNumber, 2) ? 3 : 0);
            case THIRD_DOZEN -> betAmount * (winningNumberIsInDozen(winningNumber, 3) ? 3 : 0);
            case FIRST_ROW -> betAmount * (winningNumberIsInRow(winningNumber, 1) ? 3 : 0);
            case SECOND_ROW -> betAmount * (winningNumberIsInRow(winningNumber, 2) ? 3 : 0);
            case THIRD_ROW -> betAmount * (winningNumberIsInRow(winningNumber, 3) ? 3 : 0);
            default -> throw new RuntimeException("Invalid bet type");
        };
    }

    private boolean winningNumberIsColor(int number) {
        List<Integer> colorNumbers = Arrays.asList(2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35);
        return colorNumbers.contains(number);
    }

    private boolean winningNumberIsWhite(int number) {
        List<Integer> whiteNumbers = Arrays.asList(1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36);
        return whiteNumbers.contains(number);
    }

    private boolean winningNumberIsEven(int number) {
        return number != 0 && number % 2 == 0;
    }

    private boolean winningNumberIsOdd(int number) {
        return number % 2 != 0;
    }

    private boolean winningNumberIsLower(int number) {
        return number >= 1 && number <= 18;
    }

    private boolean winningNumberIsHigh(int number) {
        return number >= 19 && number <= 36;
    }

    private boolean winningNumberIsInDozen(int number, int dozen) {
        return switch (dozen) {
            case 1 -> number >= 1 && number <= 12;
            case 2 -> number >= 13 && number <= 24;
            case 3 -> number >= 25 && number <= 36;
            default -> false;
        };
    }

    private boolean winningNumberIsInRow(int number, int row) {
        return switch (row) {
            case 1 -> Arrays.asList(1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34).contains(number);
            case 2 -> Arrays.asList(2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35).contains(number);
            case 3 -> Arrays.asList(3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36).contains(number);
            default -> false;
        };
    }

    private boolean winningNumberIsRandomNumber(int winningNumber, Integer betNumber) {
        return winningNumber == betNumber;
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
