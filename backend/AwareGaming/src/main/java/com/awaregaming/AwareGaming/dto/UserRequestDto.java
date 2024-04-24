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
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String dni;
    private Integer age;
    private int credits;
    private Role role;

}
