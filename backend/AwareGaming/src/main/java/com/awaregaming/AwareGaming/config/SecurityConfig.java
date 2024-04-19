package com.awaregaming.AwareGaming.config;

import com.awaregaming.AwareGaming.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

//esta clase va a contener la cadena de filtros y el metodo securityfilter chain
@Configuration //esta annotation indica que esta clase de configuracion
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private AuthenticationProvider authenticationProvider;

    //vamos a diferenciar los endpoints que son publicos y los que son privados
    @Bean //lo especificamos como bean asi despues podemos crear el objeto
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity //retornamos el http siempre y cuando pase por una seria de filtros, aca es donde configuramos los filtros
                .csrf(csrf -> //deshabilitamos esto, esto es una proteccion que nos brinda spring security para los metodos post, basado en un token csrf, pero nosotros vamos a usar JWT, por eso lo deshabilitamos
                        csrf
                                .disable())
                //el primer filtro tiene que ver sobre las rutas privadas y protegidas
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                .requestMatchers("/v3/**","/swagger-ui/**").permitAll() // permitir acceso al swagger.
                                .requestMatchers("/auth/**").permitAll() //todas las request que matcheen con la ruta auth van a ser publicos
                                .anyRequest().authenticated() //cualquier otra ruta que se identifique
                                )
                .sessionManagement(sessionManager-> //deshabilitamos las sesiones
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //especificamos el authenticacion provider
                .authenticationProvider(authenticationProvider)
                //agregamos el filtro relacionado al jwt
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}
