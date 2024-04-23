package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.dto.CommentRequestDto;
import com.awaregaming.AwareGaming.dto.CommentResponseDto;
import com.awaregaming.AwareGaming.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private ICommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> getActiveComments() {
        return commentService.getActiveComments();
    }

    @GetMapping("/all")
    public ResponseEntity<List<CommentResponseDto>> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentResponseDto> getCommentById(@PathVariable int id) {
        return commentService.getCommentById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addComment(Authentication authentication, @RequestBody CommentRequestDto comment) {
        return commentService.addComment(authentication, comment);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateComment(Authentication authentication, @RequestBody CommentRequestDto comment, @PathVariable int id) {
        return commentService.updateComment(authentication, comment, id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteComment(Authentication authentication, @PathVariable Integer id) {
        return commentService.deleteComment(authentication, id);
    }
}
