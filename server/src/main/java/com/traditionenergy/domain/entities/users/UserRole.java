package com.traditionenergy.domain.entities.users;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {
    customer, supplier;

    @JsonValue
    public int getCode() {
                       return ordinal();
        }
}
