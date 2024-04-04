package com.awaregaming.AwareGaming.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "posts")
public class Post {

    private int idPost;
    private String title;
    private String description;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private int userId;

}
