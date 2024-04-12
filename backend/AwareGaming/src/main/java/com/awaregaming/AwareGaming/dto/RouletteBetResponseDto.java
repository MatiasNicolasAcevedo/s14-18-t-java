package com.awaregaming.AwareGaming.dto;

import lombok.Data;

@Data
public class RouletteBetResponseDto {
    private String result;
    private Integer newCredit;
    private Integer winningNumber;
}
