package com.awaregaming.AwareGaming.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends UserDetailsService {

    public UserDetails loadUserByUsername(String email);

}
