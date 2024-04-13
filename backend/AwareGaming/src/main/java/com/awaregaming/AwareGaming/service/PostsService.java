package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.PostsRequestDTO;
import com.awaregaming.AwareGaming.dto.PostsResponseDTO;
import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.repository.IPostsRepository;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostsService implements IPostsService {

    @Autowired
    private IPostsRepository postsRepository;

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<PostsResponseDTO> getAllPosts() {
        try{
            List<Post> postList = postsRepository.findAll();
            List<PostsResponseDTO> postsResponseDTOList = new ArrayList<>();
            postList.forEach(post -> {
                PostsResponseDTO postsResponseDTO = new PostsResponseDTO(post);
                postsResponseDTOList.add(postsResponseDTO);
            });
            return postsResponseDTOList;
        } catch (Exception e){
            throw new RuntimeException("Error bringing all posts");
        }
    }

    @Override
    public Optional<PostsResponseDTO> getPost(Integer idPost) {
        try{
            Post post = postsRepository.findById(idPost).get();
            PostsResponseDTO postsResponseDTO = new PostsResponseDTO(post);
            return Optional.of(postsResponseDTO);
        } catch (Exception e){
            throw new RuntimeException("Post not found");
        }
    }

    @Override
    public PostsResponseDTO savePost(PostsRequestDTO postsRequestDTO) {

        try {
            Post post = new Post();
            post.setTitle(postsRequestDTO.getTitle());
            post.setDescription(postsRequestDTO.getDescription());
            post.setUser(userRepository.findById(postsRequestDTO.getUser()).orElse(null));
            post.setCreated_at(LocalDateTime.now());
            post.setUpdated_at(null);
            postsRepository.save(post);
            PostsResponseDTO postsResponseDTO = new PostsResponseDTO(post);
            return postsResponseDTO;
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error creating posts");
        }

    }

    @Override
    public void deletePost(Integer idPost) {
        try {
            postsRepository.deleteById(idPost);
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error deleting post");
        }
    }

    @Override
    public PostsResponseDTO editPost(Integer idPost, PostsRequestDTO postsRequestDTO) {
        try{
            Post post = postsRepository.findById(idPost).orElse(null);
            if(post==null) throw new RuntimeException("Post not found");
            post.setDescription(postsRequestDTO.getDescription());
            post.setTitle(postsRequestDTO.getTitle());
            post.setUser(userRepository.findById(postsRequestDTO.getUser()).orElse(null));
            post.setUpdated_at(LocalDateTime.now());
            postsRepository.save(post);
            PostsResponseDTO postsResponseDTO = new PostsResponseDTO(post);
            return postsResponseDTO;
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Error editing post");
        }
    }

}
