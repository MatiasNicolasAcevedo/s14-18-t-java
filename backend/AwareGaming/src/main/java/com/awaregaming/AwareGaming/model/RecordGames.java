package com.awaregaming.AwareGaming.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "Record_Games")
public class RecordGames {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @JsonProperty("total_games")
    Integer totalGames;
    @JsonProperty("won_games")
    Integer wonGames;
    @JsonProperty("lost_games")
    Integer lostGames;

    @OneToOne
    //@JoinColumn(name = "user_id")
    private User user;

    public RecordGames() {
    }

    public RecordGames(Integer totalGames, Integer wonGames, Integer lostGames, User user) {
        this.totalGames = totalGames;
        this.wonGames = wonGames;
        this.lostGames = lostGames;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getTotalGames() {
        return totalGames;
    }

    public void setTotalGames(Integer totalGames) {
        this.totalGames = totalGames;
    }

    public Integer getWonGames() {
        return wonGames;
    }

    public void setWonGames(Integer wonGames) {
        this.wonGames = wonGames;
    }

    public Integer getLostGames() {
        return lostGames;
    }

    public void setLostGames(Integer lostGames) {
        this.lostGames = lostGames;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
