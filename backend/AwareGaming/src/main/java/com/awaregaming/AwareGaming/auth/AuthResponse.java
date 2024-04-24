package com.awaregaming.AwareGaming.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//esta clase es para que nos devuelva el token, ya sea en el registro o en el login
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String token;
    String message;
}
