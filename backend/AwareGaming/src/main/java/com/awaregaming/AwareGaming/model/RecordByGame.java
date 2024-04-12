package com.awaregaming.AwareGaming.model;


import jakarta.persistence.*;

@Entity
@Table(name = "Record_By_Game")
public class RecordByGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String features;
    String rules;

    @ManyToOne
    //@JoinColumn(name = "user_id")
    private User user;

    public RecordByGame() {
    }

    public RecordByGame(String name, String features, String rules, User user) {
        this.name = name;
        this.features = features;
        this.rules = rules;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
