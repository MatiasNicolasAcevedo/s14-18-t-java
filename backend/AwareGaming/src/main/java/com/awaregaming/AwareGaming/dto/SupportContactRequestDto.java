package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.User;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupportContactRequestDto {

    private int idSupportContact;
    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String description;
    private User user;

}
