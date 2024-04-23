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

    public AuthResponse login(LoginRequest loginRequest) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            User userDetails = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            String token = jwtService.getToken(userDetails);
            return AuthResponse.builder()
                    .token(token)
                    .build();
        } catch (AuthenticationException e){
            return null; //le ponemos null para lanzar la excepcion personalidad (Incorrect email and/or password)
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
                        .role(Role.USER)
                        .build(); //para que se construya el objeto
                //guardamos el registro en la bd
                userRepository.save(user);
                return AuthResponse.builder()
                        .token(jwtService.getToken(user)) //le pasamos el token que generamos, le mandamos por parametro nuestro objeto user
                        .build();
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
