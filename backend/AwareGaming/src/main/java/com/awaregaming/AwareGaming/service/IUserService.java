package com.awaregaming.AwareGaming.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.awaregaming.AwareGaming.dto.UserRequestDto;
import com.awaregaming.AwareGaming.dto.UserResponseDto;
import com.awaregaming.AwareGaming.exceptions.UserUpdateException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IUserService extends UserDetailsService {

    @Transactional(readOnly = true)
    List<UserResponseDto> getAllUsers();

    @Transactional(readOnly = true)
    ResponseEntity<UserResponseDto> getUser(int id) throws UsernameNotFoundException;

    ResponseEntity<String> updateUser(int id, UserRequestDto userRequestDto) throws UserUpdateException;

    ResponseEntity<String> deleteUser(int id) throws UsernameNotFoundException;

}
