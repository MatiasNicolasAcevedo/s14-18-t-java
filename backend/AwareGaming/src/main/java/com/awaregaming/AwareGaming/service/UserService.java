package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.UserRequestDto;
import com.awaregaming.AwareGaming.dto.UserResponseDto;
import com.awaregaming.AwareGaming.exceptions.UserDeleteException;
import com.awaregaming.AwareGaming.exceptions.UserUpdateException;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllUsers(){
        return userListToUserDtoList(userRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UserResponseDto> getUser(int id) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return new ResponseEntity<>(new UserResponseDto(user.get()), HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }

    @Override
    public ResponseEntity<String> updateUser(int id, UserRequestDto userRequestDto) throws UserUpdateException {
        Optional<User> user = userRepository.findById(id);
        try {
            if (user.isPresent()) {
                User user1 = user.get();
                if (!Objects.equals(user1.getFirstname(), userRequestDto.getFirstname())) {
                    user1.setFirstname(userRequestDto.getFirstname());
                }
                if (!Objects.equals(user1.getLastname(), userRequestDto.getLastname())) {
                    user1.setFirstname(userRequestDto.getLastname());
                }
                if (!passwordEncoder.matches(userRequestDto.getPassword(), user1.getPassword())) {
                    user1.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
                }
                userRepository.save(user1);
                return new ResponseEntity<>("User update successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No user found for update", HttpStatus.NOT_FOUND);
            }
        } catch (UserUpdateException e){
            throw new UserUpdateException("Error updating user");
        } catch (UsernameNotFoundException e){
            throw new UsernameNotFoundException("User not found");
        }
    }

    @Override
    public ResponseEntity<String> deleteUser(int id) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findById(id);
        try {
            if(user.isPresent()){
                user.get().setActive(false);
                userRepository.save(user.get());
                return new ResponseEntity<>("User delete successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found for delete", HttpStatus.NOT_FOUND);
            }
        } catch (UserDeleteException e){
            throw new UserDeleteException("Error deleting user", e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    public static List<UserResponseDto> userListToUserDtoList(List<User> users){
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        for (User user : users){
            UserResponseDto userResponseDto = new UserResponseDto(user);
            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }
}
