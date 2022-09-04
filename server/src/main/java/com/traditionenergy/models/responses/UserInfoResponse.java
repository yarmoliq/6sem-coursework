package com.traditionenergy.models.responses;

import com.traditionenergy.domain.entities.users.UserRole;
import lombok.Data;

@Data
public class UserInfoResponse {
    private String email;

    private String userName;

    private UserRole role;
}
