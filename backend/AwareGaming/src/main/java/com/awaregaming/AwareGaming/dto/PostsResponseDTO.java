package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostsResponseDTO {

    private String title;
    private String description;
    private String user;
    private List<CommentResponseDto> comments;

    public PostsResponseDTO (Post post){
        this.title=post.getTitle();
        this.description = post.getDescription();
        this.user = post.getUser().getFirstName()+ " " + post.getUser().getLastName();
        this.comments = post.getComments().stream()
                .filter(comment -> !comment.isDeleted())
                .map(CommentResponseDto::new).toList();
    }

}
