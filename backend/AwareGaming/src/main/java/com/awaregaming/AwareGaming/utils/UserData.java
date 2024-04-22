package com.awaregaming.AwareGaming.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
/* jsonData() devuelve una lista de mapas, donde cada mapa representa un objeto JSON con las
claves "firstName", "lastName", "email", "password" y "dni"
 El método utiliza la librería Jackson ObjectMapper para convertir una cadena JSON
 en una lista de mapas en Java
 Obtener una lista de objetos JSON convertidos a estructuras de datos que pueden ser manipuladas
 en Java
*/
@Component
public class UserData {
    public List<Map<String, Object>> jsonData() throws JsonProcessingException {
        String json = "[" +
                "{\"firstName\": \"Mónica\", \"lastName\": \"Velarde\", \"email\": \"monicavelarde@gmail.com\", \"password\": \"hashed_password_1\"," +
                " \"dni\": \"1234567890\", \"credits\": \"1000\", \"age\": \"62\", " +
                "{\"firstName\": \"Lionel\", \"lastName\": \"Messi\", \"email\": \"leomessi@gmail.com\", \"password\": \"hashed_password_2\"," +
                " \"dni\": \"1234567891\", \"creditos\": \"1000\", \"age\": \"36\", " +
                "{\"firstName\": \"Ruben\", \"lastName\": \"Ledesma\", \"email\": \"ruben@gmail.com\", \"password\": \"hashed_password_4\"," +
                " \"dni\": \"1234567892\", \"creditos\": \"1000\", \"age\": \"27\", " +
                "{\"firstName\": \"Lucas\", \"lastName\": \"Ledesma\", \"email\": \"lucas@gmail.com\", \"password\": \"hashed_password_5\"," +
                " \"dni\": \"1234567893\", \"creditos\": \"1000\", \"age\": \"29\", " +
                "{\"firstName\": \"Pablo\", \"lastName\": \"Ledesma\", \"email\": \"pablo@gmail.com\", \"password\": \"hashed_password_6\"," +
                " \"dni\": \"1234567894\", \"creditos\": \"1000\", \"age\": \"34\", " +
                "{\"firstName\": \"Hans\", \"lastName\": \"Urpay\", \"email\": \"capogit@gmail.com\", \"password\": \"hashed_password_7\"," +
                " \"dni\": \"1234567895\", \"creditos\": \"1000\", \"age\": \"28\", " +
                "{\"firstName\": \"Matias\", \"lastName\": \"Acevedo\", \"email\": \"mati@gmail.com\", \"password\": \"hashed_password_8\"," +
                " \"dni\": \"1234567896\", \"creditos\": \"1000\", \"age\": \"30\", " +
                "{\"firstName\": \"Santiago\", \"lastName\": \"Figliuolo\", \"email\": \"santi@gmail.com\", \"password\": \"hashed_password_9\"," +
                " \"dni\": \"1234567897\", \"creditos\": \"1000\", \"age\": \"24\", " +
                "{\"firstName\": \"Lucas\", \"lastName\": \"Caro\", \"email\": \"lucascaro@gmail.com\", \"password\": \"hashed_password_3\"," +
                " \"dni\": \"1234567898\", \"creditos\": \"1000\", \"age\": \"32\"," +
                "{\"firstName\": \"Angel\", \"lastName\": \"DiMaria\", \"email\": \"dimaria@gmail.com\", \"password\": \"hashed_password_10\"," +
                " \"dni\": \"1234567899\", \"creditos\": \"1000\", \"age\": \"35\"} " +
                "]"
                ;

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, List.class);
    }
}
