package com.dsa.springrestauth.controller;

import com.dsa.springrestauth.model.LoginRequest;
import com.dsa.springrestauth.model.LoginResponse;
import com.dsa.springrestauth.model.RegisterRequest;
import com.dsa.springrestauth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/auth/register")
    public LoginResponse register(@RequestBody @Validated RegisterRequest request){
        return authService.attemptRegistration(request);
    }
}
