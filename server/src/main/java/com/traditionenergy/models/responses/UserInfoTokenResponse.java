package com.traditionenergy.models.responses;

import lombok.Data;

@Data
public class UserInfoTokenResponse {

    private String email;

    private String userName;

    private String token;
}
