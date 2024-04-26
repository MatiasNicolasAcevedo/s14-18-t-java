package com.awaregaming.AwareGaming.dto;

import lombok.Data;

@Data
public class DiceBetResponseDto {
    private String result;
    private Integer newCredit;
    private int dice1;
    private int dice2;
    private int totalDice;
}
