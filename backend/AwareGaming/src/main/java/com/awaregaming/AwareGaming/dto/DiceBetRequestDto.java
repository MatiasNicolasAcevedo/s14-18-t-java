package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.BetTypeDice;
import lombok.Data;

@Data
public class DiceBetRequestDto {
    private BetTypeDice betType;
    private Integer betAmount;
    private Integer betDice1;
    private Integer betDice2;
    private Long userId;
}
