package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Enum.Role;
import com.awaregaming.AwareGaming.model.User;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserResponseDto {

    @Id
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String dni;
    private int age;
    private double balance;
    private Role role;

    public UserResponseDto(User user){
        this.id = user.getIdUser();
        this.firstname = user.getFirstName();
        this.lastname = user.getLastName();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.dni = user.getDni();
        this.age = user.getAge();
        this.balance = user.getCredits();
        this.role = user.getRole();
    }

}
