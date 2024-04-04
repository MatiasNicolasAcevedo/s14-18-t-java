package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.repository.IPostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService implements IPostsService {

    @Autowired
    private IPostsRepository postsRepository;

    @Override
    public List<Post> getAllPosts() {
        List<Post> posts = postsRepository.findAll();
        return posts.isEmpty()? null:posts;
    }

    @Override
    public Post getPost(Integer idPost) {
        return postsRepository.findById(idPost).orElse(null);
    }

    @Override
    public void savePost(Post post) {
        postsRepository.save(post);
    }

    @Override
    public void deletePost(Integer idPost) {
        postsRepository.deleteById(idPost);
    }

    @Override
    public void editPost(Post post) {
        this.savePost(post);
    }
}
