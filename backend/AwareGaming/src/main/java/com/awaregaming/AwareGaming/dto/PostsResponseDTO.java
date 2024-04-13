package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostsResponseDTO {

    private String title;
    private String description;
    private String user;

    public PostsResponseDTO (Post post){
        this.title=post.getTitle();
        this.description = post.getDescription();
        this.user = post.getUser().getFirstName()+ " " + post.getUser().getLastName();
    }

}
