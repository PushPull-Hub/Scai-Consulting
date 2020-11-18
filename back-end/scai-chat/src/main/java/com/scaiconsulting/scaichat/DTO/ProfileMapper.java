package com.scaiconsulting.scaichat.DTO;

import com.scaiconsulting.scaichat.entities.Profile;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProfileMapper implements RowMapper<Profile> {

    @Override
    public Profile mapRow(ResultSet resultSet, int i) throws SQLException {
        Profile profile = new Profile();
        profile.setId(resultSet.getInt("id"));
        profile.setPassword(resultSet.getString("password"));
        return profile;
    }
}
