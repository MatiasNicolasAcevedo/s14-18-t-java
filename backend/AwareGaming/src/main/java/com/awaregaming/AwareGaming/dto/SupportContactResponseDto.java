package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.SupportContact;
import com.awaregaming.AwareGaming.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SupportContactResponseDto {

    private int idSupportContact;
    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String description;
    private User user;

    public SupportContactResponseDto(SupportContact supportContact){
        this.idSupportContact = supportContact.getIdSupportContact();
        this.firstName = supportContact.getFirstName();
        this.lastName = supportContact.getLastName();
        this.email = supportContact.getEmail();
        this.subject = supportContact.getSubject();
        this.description = supportContact.getDescription();
        this.user = supportContact.getUser();
    }
}
