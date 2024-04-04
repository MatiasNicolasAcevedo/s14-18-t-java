package com.awaregaming.AwareGaming.repository;

import com.awaregaming.AwareGaming.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); //lo hacemos optional por en este caso puede devolver un null
}
