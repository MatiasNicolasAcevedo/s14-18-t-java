package com.awaregaming.AwareGaming.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupportContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSupportContact;

    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String description;

    @ManyToOne
    @JoinColumn(name = "idUser")
    private User user;

}