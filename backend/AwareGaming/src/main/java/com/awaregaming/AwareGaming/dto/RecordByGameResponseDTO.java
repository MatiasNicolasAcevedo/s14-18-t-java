package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.BetTypeRoulette;
import com.awaregaming.AwareGaming.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordByGameResponseDTO {

    private String fullname;

    private BetTypeRoulette betTypeRoulette;
    private Integer betAmount;
    private Integer betNumber;
    private Integer winningNumber;
    private String result;


}
