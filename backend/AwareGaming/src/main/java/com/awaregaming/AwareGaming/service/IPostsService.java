package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.PostsRequestDTO;
import com.awaregaming.AwareGaming.dto.PostsResponseDTO;
import com.awaregaming.AwareGaming.model.Post;

import java.util.List;
import java.util.Optional;

public interface IPostsService {

    //get all posts

    public List<PostsResponseDTO> getAllPosts();

    //get post by id

    public Optional<PostsResponseDTO> getPost(Integer idPost);

    //save post

    public PostsResponseDTO savePost(PostsRequestDTO postsRequestDTO);

    //delete post

    public void deletePost(Integer idPost);

    //edit post

    public PostsResponseDTO editPost(Integer idPost, PostsRequestDTO postsRequestDTO);

}
