package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostsRepository extends JpaRepository<Post, Integer> {
}
