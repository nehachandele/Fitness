package com.project.fitness.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.fitness.security.AuthTokenFilter;

import org.springframework.security.core.userdetails.User;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    DataSource dataSource;

    @Autowired
    AuthTokenFilter authTokenFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf-> csrf.disable())

                .authorizeHttpRequests(auth ->

                auth.requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/signin").permitAll()
                        .anyRequest().authenticated());

                //.httpBasic(Customizer.withDefaults());
                http.addFilterBefore(authTokenFilter,UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user1 = User.withUsername("user1")
                // .password("{noop}password1")
                .password(passwordEncoder().encode("password1"))
                .roles("USER")
                .build();

        UserDetails user2 = User.withUsername("user2")
                .password(passwordEncoder().encode("password2"))
                .roles("USER")
                .build();

        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder().encode("adminP"))
                .roles("ADMIN")
                .build();
        // return new InMemoryUserDetailsManager(user1,user2,admin);
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
        if (!userDetailsManager.userExists(user1.getUsername())) {
            userDetailsManager.createUser(user1);
        }
        if (!userDetailsManager.userExists(user2.getUsername())) {
            userDetailsManager.createUser(user2);
        }
        if (!userDetailsManager.userExists(admin.getUsername())) {
            userDetailsManager.createUser(admin);
        }

        return userDetailsManager;

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   @Bean
public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
}

}