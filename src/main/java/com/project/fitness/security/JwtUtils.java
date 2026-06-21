package com.project.fitness.security;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
private final String jwtSecret =
"ZmFrZXNlY3JldGtleWZvcnNwcmluZ2Jvb3Rqand0dG9rZW5hdXRoZW50aWNhdGlvbg==";
    private int jwtExpirations = 172800000;

    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken= request.getHeader("Authorization");
        if(bearerToken!=null && bearerToken.startsWith("Bearer"))
            return bearerToken.substring(7);
        return null;
    }

    public String generateTokenFromUsername(String username) {

        return Jwts.builder()
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(new Date().getTime()+jwtExpirations))
        .signWith(key())
        .compact();
    }
    public boolean validateJwtToken(String jwtToken){
        try{
            Jwts.parser().verifyWith((SecretKey)key()).build().parseSignedClaims(jwtToken);
        }catch(Exception e){
            e.printStackTrace();
        }
        return true;
    }
     private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        
     }

     public static String getUsernameFromToken(String jwt) throws JwtException, IllegalArgumentException {
     return Jwts.parser().verifyWith((SecretKey)key()).build().parseSignedClaims(jwt).getPayload().getSubject();
     }

}
