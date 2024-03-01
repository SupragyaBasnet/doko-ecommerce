package com.dsa.springrestauth.service;

import com.dsa.springrestauth.model.LoginResponse;
import com.dsa.springrestauth.model.RegisterRequest;
import com.dsa.springrestauth.security.JwtIssuer;
import com.dsa.springrestauth.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtIssuer jwtIssuer;
    private final UserService userService;

    public LoginResponse attemptLogin(String username, String password){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal = (UserPrincipal) authentication.getPrincipal();

        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        SecurityContextHolder.getContext().setAuthentication(null);
        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);
        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }

    public LoginResponse attemptRegistration(RegisterRequest request){
        if(userService.createUser(request)) return attemptLogin(request.getEmail(), request.getPassword());

        return LoginResponse.builder().build();
    }

    public void attemptLogout(String token) {
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}
