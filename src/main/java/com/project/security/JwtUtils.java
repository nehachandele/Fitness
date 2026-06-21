package com.project.security;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    private String jwtSecret = "a-string-secret-at-least-256-bits-long";
    private int jwtExpirations = 172800000;

    public String getJwtFromHeader() {
        return "";
    }

    public String generateTokenFromUsername(String username) {

        return Jwts.builder()
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(new Date().getTime()+jwtExpirations))
        .signWith(key())
        .compact();
    }
    public boolean validateJwtToken(){
        return true;
    }
     private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        
     }

}
