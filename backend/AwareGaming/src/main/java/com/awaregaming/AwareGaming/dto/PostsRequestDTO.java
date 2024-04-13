package com.awaregaming.AwareGaming.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostsRequestDTO {
    private String title;
    private String description;
    private int user;
}
