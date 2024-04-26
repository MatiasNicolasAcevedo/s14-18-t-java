package com.awaregaming.AwareGaming.model;


import com.awaregaming.AwareGaming.model.Enum.BetTypeRoulette;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "Record_By_Game")
public class RecordByGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //aca se guarda el registro de la jugada
    // user, type roulette, bet amount, bet number, winning number, result

    @Enumerated(EnumType.STRING)
    @Column(name = "bet_type")
    private BetTypeRoulette betTypeRoulette;

    @Column(name = "bet_amount")
    private Integer betAmount;

    @Column(name = "bet_number")
    private Integer betNumber;

    @Column(name = "winning_number")
    private Integer winningNumber;

    private String result;



   /* @Column(name = "total_games")
    Integer totalGames;
    @Column(name = "won_games")
    Integer wonGames;
    @Column(name = "lost_games")
    Integer lostGames;*/


}