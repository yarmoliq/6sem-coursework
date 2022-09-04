package com.traditionenergy.mappers;

import com.traditionenergy.domain.entities.users.User;
import com.traditionenergy.models.requests.SignUpUserRequest;
import com.traditionenergy.models.responses.UserInfoResponse;
import com.traditionenergy.models.responses.UserInfoTokenResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User signUpDtoToUser(SignUpUserRequest signUpDto);

    UserInfoResponse userToUserInfoResponse(User user);

    UserInfoTokenResponse userToUserInfoTokenResponse(User user);
}
