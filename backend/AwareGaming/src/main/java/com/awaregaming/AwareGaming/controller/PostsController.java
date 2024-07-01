package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.dto.PostsRequestDTO;
import com.awaregaming.AwareGaming.dto.PostsResponseDTO;
import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.service.IPostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("v1/api/posts")
public class PostsController {

    @Autowired
    private IPostsService postsService;

    //get all posts
    @GetMapping("/get")
    public ResponseEntity<List<PostsResponseDTO>> getAllPosts(){
        try{
            List<PostsResponseDTO> postsResponseDTOList = postsService.getAllPosts();
            return ResponseEntity.ok(postsResponseDTOList);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get posts by id
    @GetMapping("/get/{idPost}")
    public ResponseEntity<PostsResponseDTO> getPostById(@PathVariable Integer idPost){
        try {
            Optional<PostsResponseDTO> postsResponseDTO = postsService.getPost(idPost);
            return postsResponseDTO.map(value ->ResponseEntity.ok().body(value)).orElseGet(()->ResponseEntity.notFound().build());
        } catch (Exception e ){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<PostsResponseDTO> savePost(@RequestBody PostsRequestDTO postsRequestDTO){
        try {
            PostsResponseDTO postsResponseDTO = postsService.savePost(postsRequestDTO);
            return new ResponseEntity<>(postsResponseDTO, HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{idPost}")
    public String deletePost(@PathVariable Integer idPost){
        try{
            postsService.deletePost(idPost);
            return "Post deleted";
        } catch (Exception e){
            return "Error deleting post";
        }
    }

    @PutMapping("/edit/{idPost}")
    public ResponseEntity<PostsResponseDTO> editPost(@PathVariable Integer idPost, @RequestBody PostsRequestDTO postsRequestDTO){
        try{
            PostsResponseDTO postsResponseDTO = postsService.editPost(idPost, postsRequestDTO);
            return new ResponseEntity<>(postsResponseDTO, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
