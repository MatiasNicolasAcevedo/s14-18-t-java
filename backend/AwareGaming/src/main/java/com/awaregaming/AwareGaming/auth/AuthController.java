package com.awaregaming.AwareGaming.auth;

import com.awaregaming.AwareGaming.exceptions.RegistrationException;
import jakarta.servlet.Registration;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//esta clase nos va a permitir exponer las rutas con los endpoints
@RestController
@RequestMapping("v1/api/auth")
@RequiredArgsConstructor //para que sea obligatorio que se agregue el constructor con todos los argumentos
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest){ //MAP para que podamos incluir el mensaje como los datos de la respuesta
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        AuthResponse authResponse = authService.login(loginRequest);
        if(authResponse!=null){
            data.put("token", authResponse.getToken());
            response.put("data", data); //el data es para que nos mande el token en el body
            response.put("message", authResponse.getMessage());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Incorrect email and/or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest registerRequest){
        Map<String, Object> response = new HashMap<>();
        try {
            AuthResponse authResponse = authService.register(registerRequest);
            response.put("message", "Successful registration");
            response.put("data", authResponse);
            return ResponseEntity.ok(response);
        } catch (RegistrationException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        }
    }
