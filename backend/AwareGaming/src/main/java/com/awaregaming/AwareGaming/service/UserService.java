package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.UserRequestDto;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.awaregaming.AwareGaming.dto.UserResponseDto;
import com.awaregaming.AwareGaming.exceptions.UserDeleteException;
import com.awaregaming.AwareGaming.exceptions.UserUpdateException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@EnableScheduling
public class UserService implements IUserService {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    //para pooder obtener el usuario por email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("The user does not exists"));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                "",
                user.getAuthorities()
        );
    }

        @Override
        @Transactional(readOnly = true)
        public List<UserResponseDto> getAllUsers () {
            return userListToUserDtoList(userRepository.findAll());
        }

        @Override
        @Transactional(readOnly = true)
        public ResponseEntity<UserResponseDto> getUserById(int id) throws UsernameNotFoundException {
            User user = userRepository.findById(id)
                    .orElseThrow(()-> new UsernameNotFoundException("User not found"));
            return new ResponseEntity<>(new UserResponseDto(user), HttpStatus.OK);
        }

        @Override
        public ResponseEntity<String> updateUser ( int id, UserRequestDto userRequestDto) throws UserUpdateException {
            Optional<User> user = userRepository.findById(id);
            try {
                if (user.isPresent()) {
                    User user1 = user.get();
                    if (!userRequestDto.getFirstName().isBlank() && !Objects.equals(user1.getFirstName(), userRequestDto.getFirstName())) {
                        user1.setFirstName(userRequestDto.getFirstName());
                    }
                    if (!userRequestDto.getLastName().isBlank() && !Objects.equals(user1.getLastName(), userRequestDto.getLastName())) {
                        user1.setLastName(userRequestDto.getLastName());
                    }
                    if (!userRequestDto.getPassword().isBlank() && !passwordEncoder.matches(userRequestDto.getPassword(), user1.getPassword())) {
                        user1.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
                    }
                    userRepository.save(user1);
                    return new ResponseEntity<>("User update successful", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("No user found for update", HttpStatus.NOT_FOUND);
                }
            } catch (UserUpdateException e) {
                throw new UserUpdateException("Error updating user");
            } catch (UsernameNotFoundException e) {
                throw new UsernameNotFoundException("User not found");
            }
        }


        @Override
        public ResponseEntity<String> deleteUser ( int id) throws UsernameNotFoundException {
            Optional<User> user = userRepository.findById(id);
            try {
                if (user.isPresent()) {
                    user.get().setActive(false);
                    userRepository.save(user.get());
                    return new ResponseEntity<>("User delete successful", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("User not found for delete", HttpStatus.NOT_FOUND);
                }
            } catch (UserDeleteException e) {
                throw new UserDeleteException("Error deleting user", e);
            }
        }


        public static List<UserResponseDto> userListToUserDtoList (List<User> users) {
            List<UserResponseDto> userResponseDtoList = new ArrayList<>();
            for (User user : users) {
                UserResponseDto userResponseDto = new UserResponseDto(user);
                userResponseDtoList.add(userResponseDto);
            }
            return userResponseDtoList;

        }


    @Override
    public ResponseEntity<UserResponseDto> getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new ResponseEntity<>(new UserResponseDto(user), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> addCreditsToUser(String email, int amount) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setCredits(user.getCredits() + amount);
            userRepository.save(user);

            return new ResponseEntity<>("Credits added successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding credits", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> addCreditsToUserById(int id, int amount) {
        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setCredits(user.getCredits() + amount);
                userRepository.save(user);

                return new ResponseEntity<>("Credits added successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding credits", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //con este metodo todos los dias a las 00 se le va a recargar 100 creditos
    @Scheduled(cron = "0 0 0 * * *", zone = "America/Argentina/Buenos_Aires")
    public void rechargeCredits(){

        //traemos todos los usuarios
        List<User> userList = userRepository.findAll();
        //recorremos todos los usuarios
        for(User user:userList ){
            user.setCredits(user.getCredits() + 100); //a los creditos que ya tiene los usuarios que se le sumen 100 creditos
        }
        //guardamos lo que hicimos en la BD
        userRepository.saveAll(userList);
    }
}


