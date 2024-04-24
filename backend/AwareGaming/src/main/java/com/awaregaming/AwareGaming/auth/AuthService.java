package com.awaregaming.AwareGaming.auth;

import com.awaregaming.AwareGaming.exceptions.RegistrationException;
import com.awaregaming.AwareGaming.jwt.JwtService;
import com.awaregaming.AwareGaming.model.Enum.Role;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest loginRequest) throws AuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            User userDetails = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

            if (!userDetails.isActive()) {
                return new AuthResponse(null, "Your account has been blocked or deleted, contact support");
            }

            //generamos el token (jwt
            String token = jwtService.getToken(userDetails);
            return AuthResponse.builder()
                    .token(token)
                    .message("Welcome to AwareGaming")
                    .build();
        } catch (AuthenticationException e) {
            return new AuthResponse(null, e.getMessage()); //le ponemos null para lanzar la excepcion personalidad (Incorrect email and/or password)
        }

    }

    public AuthResponse register(RegisterRequest registerRequest) throws AuthenticationException {
        try {
                User user = User.builder() //builder para la construccion de objeto
                        .email(registerRequest.getEmail())
                        .dni(registerRequest.getDni())
                        .firstName(registerRequest.getFirstName())
                        .lastName(registerRequest.getLastName())
                        .password(passwordEncoder.encode(registerRequest.getPassword()))
                        .age(registerRequest.getAge())
                        .credits(1000)
                        .isActive(true)
                        .role(Role.USER)
                        .build(); //para que se construya el objeto
                if(user.getAge()>=18){
                    //guardamos el registro en la bd
                    userRepository.save(user);
                    return AuthResponse.builder()
                            .token(jwtService.getToken(user)) //le pasamos el token que generamos, le mandamos por parametro nuestro objeto user
                            .build();
                } else {
                    throw new RegistrationException("Eres menor de edad, no puedes ingresar");
                }

            } catch (DataIntegrityViolationException e) {
                String errorMessage = e.getCause().getMessage();
                if (errorMessage.contains(registerRequest.getEmail())) {
                    throw new RegistrationException("Ya existe un usuario con ese email. Error al registrar usuario");
                } else if (errorMessage.contains(registerRequest.getDni())) {
                    throw new RegistrationException("Ya existe un usuario con ese dni. Error al registrar usuario");
                } else {
                    throw new RegistrationException("Error al registrar usuario");
                }
            }

        } catch (DataIntegrityViolationException e) {
            String errorMessage = e.getCause().getMessage();
            if (errorMessage.contains(registerRequest.getEmail())) {
                throw new RegistrationException("Ya existe un usuario con ese email. Error al registrar usuario");
            } else if (errorMessage.contains(registerRequest.getDni())) {
                throw new RegistrationException("Ya existe un usuario con ese dni. Error al registrar usuario");
            } else {
                throw new RegistrationException("Error al registrar usuario");
            }

        }
    }

}

