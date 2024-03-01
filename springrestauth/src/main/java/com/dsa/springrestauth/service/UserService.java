package com.dsa.springrestauth.service;

import com.dsa.springrestauth.entity.UserEntity;
import com.dsa.springrestauth.model.RegisterRequest;
import com.dsa.springrestauth.repository.UserRepository;
import com.dsa.springrestauth.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final String Existing_Email = "test@test.com";

    private static final String Another_Email = "next@test.com";

    private final UserRepository userRepository;

    public Optional<UserEntity> findByEmail(String email){
        var user = userRepository.findByEmail(email);
        return user;
    }

    public Optional<UserEntity> getCurrentUser(){
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userRepository.findById(userPrincipal.getUserId());
        return  user;
    }

    public boolean createUser(RegisterRequest request){
        var user = userRepository.findByEmail(request.getEmail());
        if(user.isPresent()) return false;

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(request.getEmail());
        userEntity.setUsername(request.getUsername());
        userEntity.setPhoneNumber(request.getPhoneNumber());
        userEntity.setRole("ROLE_USER");
        userEntity.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));

        userRepository.save(userEntity);
        return true;
    }
}
