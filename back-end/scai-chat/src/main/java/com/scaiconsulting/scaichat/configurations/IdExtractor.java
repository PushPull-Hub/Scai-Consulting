package com.scaiconsulting.scaichat.configurations;

import io.jsonwebtoken.Jwts;

public class IdExtractor {

    private final String token;

    public IdExtractor(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public int getAuthenticatedUserId() {
        String token = this.token.replace("Bearer","");
        return (Integer) Jwts.parser().setSigningKey("scaiconsulting").parseClaimsJws(token).getBody().get("id");
    }

}
