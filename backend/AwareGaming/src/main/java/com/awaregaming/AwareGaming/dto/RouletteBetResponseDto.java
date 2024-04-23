package com.awaregaming.AwareGaming.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RouletteBetResponseDto {
    private String result;
    private Integer newCredit;
    private Integer winningNumber;
    private String numberColor;
    private Integer winningAmount;
}
