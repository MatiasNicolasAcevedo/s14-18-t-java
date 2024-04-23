package com.awaregaming.AwareGaming.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {

    private int idComment;

    @Size(min = 1, max = 500)
    @Column(nullable = false)
    private String comment;

    private int idPost;

}
