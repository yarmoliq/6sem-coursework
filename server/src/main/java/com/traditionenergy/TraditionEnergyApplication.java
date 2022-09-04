package com.traditionenergy;

import com.traditionenergy.security.jwt.JwtConfigurationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({JwtConfigurationProperties.class})
public class TraditionEnergyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TraditionEnergyApplication.class, args);
    }
}
