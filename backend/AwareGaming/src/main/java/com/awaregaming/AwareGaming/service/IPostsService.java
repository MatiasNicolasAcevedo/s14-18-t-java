package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.model.Post;

import java.util.List;

public interface IPostsService {

    //get all posts

    public List<Post> getAllPosts();

    //get post by id

    public Post getPost(Integer idPost);

    //save post

    public void savePost(Post post);

    //delete post

    public void deletePost(Integer idPost);

    //edit post

    public void editPost(Post post);

}
