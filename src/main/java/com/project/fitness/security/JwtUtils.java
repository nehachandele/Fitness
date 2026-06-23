package com.project.fitness.security;

import java.security.Key;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
    private final String jwtSecret = "ZmFrZXNlY3JldGtleWZvcnNwcmluZ2Jvb3Rqand0dG9rZW5hdXRoZW50aWNhdGlvbg==";
    private int jwtExpirations = 172800000;

    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer"))
            return bearerToken.substring(7);
        return null;
    }

    public String generateToken(String useId, String role) {

        return Jwts.builder()
                .subject(useId)
                .claim("roles", List.of(role))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + jwtExpirations))
                .signWith(key())
                .compact();
    }

   public boolean validateJwtToken(String jwtToken) {
    try {
        Jwts.parser()
            .verifyWith((SecretKey) key())
            .build()
            .parseSignedClaims(jwtToken);

        return true;
    } catch (Exception e) {
        e.printStackTrace();
        return false;
    }
}

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserIdFromToken(String jwt) throws JwtException, IllegalArgumentException {
        return Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(jwt)
                .getPayload().getSubject();
    }

     public String getUsernameFromToken(String jwt) throws JwtException, IllegalArgumentException {
        return Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(jwt)
                .getPayload().getSubject();
    }
    public Claims getAllClaims(String jwt) {
        return Jwts.parser().verifyWith((SecretKey) key())
                .build().parseSignedClaims(jwt).getPayload();
    }

    public String generateTokenFromUsername(String username) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'generateTokenFromUsername'");
    }

}
