package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.dto.UserRequestDto;
import com.awaregaming.AwareGaming.dto.UserResponseDto;
import com.awaregaming.AwareGaming.repository.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    IUserService userService;

    @GetMapping("/all")
    public List<UserResponseDto> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable int id){
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody UserRequestDto userRequestDto){
        return userService.updateUser(id, userRequestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id){
        return userService.deleteUser(id);
    }

    @GetMapping()
    public ResponseEntity<UserResponseDto> getCurrentUser(Authentication authentication) {
        String userEmail = authentication.getName();
        return userService.getUserByEmail(userEmail);
    }

    @PostMapping("/credits")
    public ResponseEntity<String> addCreditsToCurrentUser(@RequestParam int amount, Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            return userService.addCreditsToUser(userEmail, amount);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding credits", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/credits-by-id")
    public ResponseEntity<String> addCreditsToUserById(@RequestParam int id, @RequestParam int amount) {
        try {
            return userService.addCreditsToUserById(id, amount);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding credits", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
