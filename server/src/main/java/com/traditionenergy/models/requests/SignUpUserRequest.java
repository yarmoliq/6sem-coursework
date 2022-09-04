package com.traditionenergy.models.requests;

import lombok.Data;

@Data
public class SignUpUserRequest
{
    private String email;

    private String userName;

    private String password;

    private String confirmPassword;
    private Boolean isCustomer;
}
