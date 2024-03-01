package com.dsa.springrestauth.controller;

import com.dsa.springrestauth.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HelloController {

    @GetMapping("/")
    public String greeting(){
        return "Hello world!";
    }

    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return "logged in as "+userPrincipal.getEmail()+" with userId: "+userPrincipal.getUserId();
    }

    @GetMapping("/admin")
    public String admin(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return "logged in as admin, user: "+userPrincipal.getEmail()+" with userId: "+userPrincipal.getUserId()
                +" has role "+userPrincipal.getAuthorities().toString();
    }
}
