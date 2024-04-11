package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.BetType;
import lombok.Data;

@Data
public class DiceBetRequestDto {
    private BetType betType;
    private Integer betAmount;
    private Integer betNumber;
    private Long userId;
}
