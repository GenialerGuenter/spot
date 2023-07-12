package de.adesso.spot.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MY_USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @Column(name = "USER_NAME", length = 1000)
    private String userName;

    @Column(name = "PASSWORD", length = 1000, nullable = false)
    private String password;

    @Column(name = "ROLE", length = 1000, nullable = false)
    private String role;
}
