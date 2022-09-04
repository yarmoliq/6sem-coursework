package com.traditionenergy.models.responses;

import com.traditionenergy.domain.entities.users.UserRole;
import lombok.Data;

@Data
public class SignInResponse {
    private String email;
    private UserRole role;
    private String token;
}
