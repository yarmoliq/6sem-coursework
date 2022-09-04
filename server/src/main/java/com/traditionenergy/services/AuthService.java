package com.traditionenergy.services;

import com.traditionenergy.domain.entities.users.User;
import com.traditionenergy.domain.entities.users.UserRepository;
import com.traditionenergy.domain.entities.users.UserRole;
import com.traditionenergy.mappers.UserMapper;
import com.traditionenergy.models.requests.SignInUserRequest;
import com.traditionenergy.models.requests.SignUpUserRequest;
import com.traditionenergy.models.responses.ServiceResponse;
import com.traditionenergy.models.responses.ServiceResponseT;
import com.traditionenergy.models.responses.SignInResponse;
import com.traditionenergy.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public ServiceResponseT<SignInResponse> signIn(SignInUserRequest authenticationDTO) {
        if (authenticationDTO.getEmail() == null || authenticationDTO.getPassword() == null) {
            return new ServiceResponseT<>("Bad credential");
        }
        try {
            User user = findUser(authenticationDTO);
            return new ServiceResponseT<>(createSignInResponse(user));
        } catch (AuthenticationException e) {
            return new ServiceResponseT<>("Invalid email or password");
        }
    }

    public ServiceResponseT<SignUpUserRequest> signUp(SignUpUserRequest signUpUserRequest) {
        if (!signUpUserRequest.getPassword().equals(signUpUserRequest.getConfirmPassword())) {
            return new ServiceResponseT<>("password mustMatch");
        }
        if (signUpUserRequest.getEmail() == null || signUpUserRequest.getPassword() == null ||
                signUpUserRequest.getConfirmPassword() == null || signUpUserRequest.getUserName() == null) {
            throw new BadCredentialsException("Fill in required fields");
        }

        var emailUnique = checkUniqueEmail(signUpUserRequest.getEmail());
        if (!emailUnique.isSuccess())
        {
            return new ServiceResponseT<>(emailUnique);
        }
        var userNameUnique = checkUniqueUserName(signUpUserRequest.getUserName());
        if (!userNameUnique.isSuccess())
        {
            return new ServiceResponseT<>(userNameUnique);
        }

        User user = userMapper.signUpDtoToUser(signUpUserRequest);
        user.setRole(signUpUserRequest.getIsCustomer() ? UserRole.customer : UserRole.supplier);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return new ServiceResponseT<>(signUpUserRequest);
    }

    public ServiceResponse checkUniqueEmail(String email)
    {
        if (userRepository.existsByEmail(email))
        {
            return new ServiceResponse("email notUnique");
        }
        return new ServiceResponse();
    }

    public ServiceResponse checkUniqueUserName(String userName)
    {
        if (userRepository.existsByUserName(userName))
        {
            return new ServiceResponse("userName notUnique");
        }
        return new ServiceResponse();
    }

    private User findUser(SignInUserRequest authenticationDto) {
        String email = authenticationDto.getEmail();
        String password = authenticationDto.getPassword();
        var user = userRepository.findByEmail(email).get();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), password));
        return user;
    }

    private SignInResponse createSignInResponse(User user) {
        String token = tokenProvider.createToken(user.getUserName());
        SignInResponse signInResponse = new SignInResponse();
        signInResponse.setToken(token);
        try{
            signInResponse.setRole(user.getRole());
        }
        catch (Exception ex) {
            signInResponse.setRole(UserRole.supplier);
        }
        signInResponse.setEmail(user.getEmail());
        return signInResponse;
    }
}
