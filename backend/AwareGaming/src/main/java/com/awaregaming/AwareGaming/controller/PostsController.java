package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.service.IPostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostsController {

    @Autowired
    private IPostsService postsService;

    //get all posts
    @GetMapping("/get")
    public List<Post> getAllPosts(){
        return postsService.getAllPosts();
    }

    //get posts by id
    @GetMapping("/get/{idPost}")
    public Post getPostById(@PathVariable Integer idPost){
        return postsService.getPost(idPost);
    }

    @PostMapping("/save")
    public String sabePost(@RequestBody Post post){
        postsService.savePost(post);
        return "Post created";
    }

    @DeleteMapping("/delete/idPost")
    public String deletePost(@PathVariable Integer idPost){
        postsService.deletePost(idPost);
        return "Post deleted";
    }

    @PutMapping("/edit")
    public Post editPost(@RequestBody Post post){
        postsService.editPost(post);
        return postsService.getPost(post.getIdPost());
    }




}
