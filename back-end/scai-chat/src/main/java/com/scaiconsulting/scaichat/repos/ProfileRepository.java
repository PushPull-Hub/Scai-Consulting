package com.scaiconsulting.scaichat.repos;

import com.scaiconsulting.scaichat.DTO.ProfileMapper;
import com.scaiconsulting.scaichat.entities.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProfileRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public Profile getAuthenticatedProfile(String email, String pass) {
        return jdbcTemplate.queryForObject("SELECT * from profile where profile.email = ? and profile.password = ?",
                new Object[]{email, pass}, new ProfileMapper());
    }

}
