package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {

    private int idUser;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String dni;
    private int age;
    private double credits;
    private Role role;

}
