package com.traditionenergy.models.requests;

import com.traditionenergy.domain.entities.users.UserRole;
import lombok.Data;

@Data
public class SignInUserRequest
{
    private String email;

    private String password;
    private UserRole role;
}
