package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.BetTypeRoulette;
import lombok.Data;

@Data
public class RouletteBetRequestDto {
    private BetTypeRoulette betTypeRoulette;
    private Integer betAmount;
    private Integer betNumber;
}
