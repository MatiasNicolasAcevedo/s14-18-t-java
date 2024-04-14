package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.SupportContactRequestDto;
import com.awaregaming.AwareGaming.repository.ISupportContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SupportContactService implements ISupportContactService{

    @Value("${spring.mail.username}")
    private String destination;

    @Autowired
    ISupportContactRepository supportContactRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public ResponseEntity<String> sendMessageToSupport(SupportContactRequestDto supportContactRequestDto){
        if (supportContactRequestDto.getFirstName().isEmpty()){
            return new ResponseEntity<>("The message must have a username", HttpStatus.BAD_REQUEST);
        }
        if (supportContactRequestDto.getLastName().isEmpty()){
            return new ResponseEntity<>("The message must have a last name", HttpStatus.BAD_REQUEST);
        }
        if (supportContactRequestDto.getEmail().isEmpty()){
            return new ResponseEntity<>("The message must have a valid email", HttpStatus.BAD_REQUEST);
        }
        if (supportContactRequestDto.getDescription().isEmpty()){
            return new ResponseEntity<>("The message cannot be empty", HttpStatus.BAD_REQUEST);
        }

        SimpleMailMessage message = getMailMessage(supportContactRequestDto);
        javaMailSender.send(message);
        return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
    }

    private SimpleMailMessage getMailMessage(SupportContactRequestDto supportContactRequestDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(String.format("%s %s <%s>", supportContactRequestDto.getFirstName(), supportContactRequestDto.getLastName(), supportContactRequestDto.getEmail()));
        message.setTo(destination);
        message.setSubject(supportContactRequestDto.getSubject());
        message.setText("Usuario: " + supportContactRequestDto.getFirstName() + " " + supportContactRequestDto.getLastName() + "\n" +
                        "Correo: " + supportContactRequestDto.getEmail() + "\n" +
                        "Asunto: " + supportContactRequestDto.getSubject() + "\n" +
                        "Mensaje: " + supportContactRequestDto.getDescription());
        return message;
    }
}
