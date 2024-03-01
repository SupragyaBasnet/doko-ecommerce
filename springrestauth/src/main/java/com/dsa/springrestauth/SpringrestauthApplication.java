package com.dsa.springrestauth;

import com.dsa.springrestauth.configs.StorageProperties;
import com.dsa.springrestauth.entity.UserEntity;
import com.dsa.springrestauth.repository.UserRepository;
import com.dsa.springrestauth.service.interfaces.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
@EnableConfigurationProperties(StorageProperties.class)
public class SpringrestauthApplication {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(SpringrestauthApplication.class, args);
    }

    @Bean
    CommandLineRunner Initialize(StorageService storageService) {
        return (args) -> {
            UserEntity user = new UserEntity();
            user.setEmail("next@test.com");
            user.setPassword(passwordEncoder.encode("test"));
            user.setRole("ROLE_USER");
            user.setExtraInfo("This is an admin user");
//            userRepository.save(user);

            try {
                storageService.init();
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        };
    }
}
