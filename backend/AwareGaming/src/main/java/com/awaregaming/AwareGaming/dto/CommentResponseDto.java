package com.awaregaming.AwareGaming.dto;

import com.awaregaming.AwareGaming.model.Comment;
import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {

    private int idComment;
    private String comment;
    private String user;
    private int idPost;
    private boolean isDeleted;
    private LocalDateTime createdAt;

    public CommentResponseDto(Comment comment) {
        this.idComment = comment.getIdComment();
        this.comment = comment.getComment();
        this.user = comment.getUser().getFirstName() + " " + comment.getUser().getLastName();
        this.idPost = comment.getPost().getIdPost();
        this.isDeleted = comment.isDeleted();
        this.createdAt = comment.getCreatedAt();
    }
}
