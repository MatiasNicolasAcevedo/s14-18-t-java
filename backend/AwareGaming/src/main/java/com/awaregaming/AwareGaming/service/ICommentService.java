package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.CommentRequestDto;
import com.awaregaming.AwareGaming.dto.CommentResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ICommentService {


    ResponseEntity<List<CommentResponseDto>> getAllComments();

    ResponseEntity<List<CommentResponseDto>> getActiveComments();

    ResponseEntity<CommentResponseDto> getCommentById(int id);

    ResponseEntity<String> addComment(Authentication authentication, CommentRequestDto commentRequestDto);

    ResponseEntity<String> updateComment(Authentication authentication, CommentRequestDto commentRequestDto, int id);

    ResponseEntity<String> deleteComment(Authentication authentication, int id);
}
