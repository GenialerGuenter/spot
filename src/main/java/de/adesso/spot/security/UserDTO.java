package de.adesso.spot.security;

import org.antlr.v4.runtime.misc.NotNull;

public class UserDTO {
    @NotNull
//    @NotEmpty
    private String firstName;

    @NotNull
//    @NotEmpty
    private String lastName;

    @NotNull
//    @NotEmpty
    private String password;
    private String matchingPassword;

    @NotNull
//    @NotEmpty
    private String email;

    // standard getters and setters
}