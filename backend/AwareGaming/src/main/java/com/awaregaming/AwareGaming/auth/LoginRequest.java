package com.awaregaming.AwareGaming.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotEmpty(message = "El campo email no puede estar vacio")
    String email;
    @NotEmpty(message = "El campo contraseña no puede estar vacio")
    String password;

}
