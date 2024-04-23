package com.awaregaming.AwareGaming.jwt;

import com.awaregaming.AwareGaming.service.IUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {  //esta clase abstracta es para crear filtros personalizados, extendemos de esta clase para garantizar que el filtro se ejecuta una vez por cada solicitud http, incluso si hay multiplos filtros

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private IUserService userService;

    //este metodo realiza todos los filtros realizados al token
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //obtenemos el token del request
        final String token = getTokenFromRequest(request);
        final String email;
        if(token==null){
            filterChain.doFilter(request, response);
            return;
        }
        email= jwtService.getEmailFromToken(token);

        if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = userService.loadUserByUsername(email);
            if(jwtService.isTokenValid(token, userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request, response);

    }

    //para obtener el token
    private String getTokenFromRequest(HttpServletRequest request) {
        //authHeader porque en el encabeza del request es donde vamos a obtener el token
        final String authHeader =request.getHeader(HttpHeaders.AUTHORIZATION);
        //el encabezado comienza con la palabra bearer y estamos trabajando con token
        //tenemos que verificar para retornar el token, es decir, extraer el token sin incorporar la palabra bearer
        //accedemos a una estructura de control para verificar esto
        if(StringUtils.hasText(authHeader)&&authHeader.startsWith("Bearer ")){ //verificamos si existe el texto en el encabeza y que el authHeader comience con la palabra bearer
            return authHeader.substring(7); //extraemos desde el caracter 7 hasta el final, que es donde comienza el token
        }

        return null;
    }

}
