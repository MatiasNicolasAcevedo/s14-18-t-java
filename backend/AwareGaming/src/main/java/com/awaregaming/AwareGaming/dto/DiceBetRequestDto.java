package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.BetTypeRoulette;
import com.awaregaming.AwareGaming.model.Enum.DiceBetType;
import lombok.Data;

@Data
public class DiceBetRequestDto {
    private DiceBetType betType;
    private Integer betAmount;
    private Integer betDice1;
    private Integer betDice2;
    private Long userId;
}
