package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.CommentRequestDto;
import com.awaregaming.AwareGaming.dto.CommentResponseDto;
import com.awaregaming.AwareGaming.model.Comment;
import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.ICommentRepository;
import com.awaregaming.AwareGaming.repository.IPostsRepository;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private ICommentRepository commentRepository;

    @Autowired
    private IPostsRepository postsRepository;

    @Autowired
    private IUserRepository userRepository;


    /**
     * Get all comments, include deleted and non-deleted comments
     * @return a list of comments
     */
    @Override
    public ResponseEntity<List<CommentResponseDto>> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return new ResponseEntity<>(commentEntityToDto(comments), HttpStatus.OK);
    }

    /**
     * Get all active comments
     * @return a list of comments
     */
    @Override
    public ResponseEntity<List<CommentResponseDto>> getActiveComments(){
        List<Comment> comments = commentRepository.findByIsDeletedFalse();
        return new ResponseEntity<>(commentEntityToDto(comments), HttpStatus.OK);
    }

    /**
     * Get a comment by id
     * @param id
     * @return a commentDto
     */
    @Override
    public ResponseEntity<CommentResponseDto> getCommentById(int id) {
        return commentRepository.findById(id)
                .map(comment -> ResponseEntity.ok(new CommentResponseDto(comment)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    /**
     * Add a comment to a post only if the user is authenticated and the post exists
     * @param authentication
     * @param commentRequestDto
     * @return
     */
    @Override
    public ResponseEntity<String> addComment(Authentication authentication, CommentRequestDto commentRequestDto) {
        try {

            Comment comment =  new Comment();
            Post post = postsRepository.findById(commentRequestDto.getIdPost())
                    .orElseThrow(()-> new NoSuchElementException("Post not found"));
            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(()-> new UsernameNotFoundException("User not found"));

            if (commentRequestDto.getComment() == null || commentRequestDto.getComment().isBlank()) {
                return new ResponseEntity<>("Comment cannot be empty", HttpStatus.BAD_REQUEST);
            }

            comment.setComment(commentRequestDto.getComment());
            comment.setCreatedAt(LocalDateTime.now());
            comment.setPost(post);
            comment.setDeleted(false);
            comment.setUser(user);
            commentRepository.save(comment);

            return new ResponseEntity<>("Comment created successfully", HttpStatus.CREATED);
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

    }

    /**
     * Update a comment only if the user is the owner of the comment
     * @param authentication
     * @param commentRequestDto
     * @param id
     * @return
     */
    @Override
    public ResponseEntity<String> updateComment(Authentication authentication, CommentRequestDto commentRequestDto, int id) {
        try {
            Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Comment not found"));
            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (comment.getUser().getIdUser() != user.getIdUser()) {
                return new ResponseEntity<>("You are not authorized to update this comment", HttpStatus.UNAUTHORIZED);
            }
            if (commentRequestDto.getComment() == null || commentRequestDto.getComment().isBlank()) {
                return new ResponseEntity<>("Comment cannot be empty", HttpStatus.BAD_REQUEST);
            }
            comment.setComment(commentRequestDto.getComment());
            comment.setUpdatedAt(LocalDateTime.now());
            comment.setUser(user);
            commentRepository.save(comment);

            return new ResponseEntity<>("Comment updated successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Delete a comment only if the user is the owner of the comment
     * @param authentication
     * @param id
     * @return
     */
    @Override
    public ResponseEntity<String> deleteComment(Authentication authentication, int id) {
        try {
            Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Comment not found"));
            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (comment.getUser().getIdUser() != user.getIdUser()) {
                return new ResponseEntity<>("You are not authorized to delete this comment", HttpStatus.UNAUTHORIZED);
            }

            comment.setDeleted(true);
            comment.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment);

            return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Convert a list of Comment entities to a list of CommentResponseDto
     * @param comments
     * @return
     */
    private List<CommentResponseDto> commentEntityToDto(List<Comment> comments) {
        return comments.stream().map(CommentResponseDto::new).toList();
    }
}
