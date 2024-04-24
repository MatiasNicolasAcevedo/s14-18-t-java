package com.awaregaming.AwareGaming.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import io.jsonwebtoken.Jwts;

//esta clase es para generar el token
@Service
public class JwtService {

    private static final String SECRET_KEY="586E3272357538782F413F4428472B4B6250655368566B597033733676397924";

    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user); //hashmap porque vamos a trabajar con clave-valor
    }

    private String getToken(Map<String, Object> extraClaims, UserDetails user) { //los extraclaims son los que llevan informacion adicional en el token
        //escribimos extraClaims.put para que en el username se guarde el email
        extraClaims.put("email", user.getUsername());
        //generamos el token a traves de la libreria jwts
        return Jwts
                .builder()
                //seteamos los datos que requiera
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis())) //fecha en la que se crea
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*2)) //fecha expiracion, que es el dia y hora que se genero el token y en este caso que a las dos horas expire
                .signWith(getKey(), SignatureAlgorithm.HS256) //le pasamos el algoritmo de encriptacion
                .compact(); //para que cree el objeto y lo serialice
    }

    private Key getKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY); //esto es para codificar nuestra clave key
        return Keys.hmacShaKeyFor(keyBytes); //el metodo hmacShaKeyFor nos permite crear una nueva instancia de nuestra secret key
    }

    public String getEmailFromToken(String token) {
        return getClaim(token, Claims::getSubject); //el subject es donde vamos a tener agendado el email para poder loguearse
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = getEmailFromToken(token);
        return (email.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }

    //creamos un metodo privado para obtener todos los claims de mi token
    private Claims getAllClaims(String token){
        //accedemos a los clains
        return Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //metodo generico para obtener un claim en particular
    public <T> T getClaim(String token, Function<Claims, T> claimsTFunction){ //va a recibir el token como parametro y una funcion, esta funcion va a especificar el claim y el tipo de datos generico
        //primero obtenemos todos los claims
        final Claims claims = getAllClaims(token);
        //luego aplicamos la funcion y retornamos el resultado, con este metodo ya podemos obtener el username
        return claimsTFunction.apply(claims);
    }

    //para devolver la fecha de expiracion para ver si el token es valido o no
    private Date getExpiration(String token){
        return getClaim(token, Claims::getExpiration);
    }

    //vemos si el token ha expirado o no
    private boolean isTokenExpired(String token){
        //veo si ha expirado el token o no, pasandole la fecha en este momento
        return getExpiration(token).before(new Date());
    }

}
