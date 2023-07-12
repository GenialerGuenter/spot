package de.adesso.spot.service;

import de.adesso.spot.controller.UserDTO;
import de.adesso.spot.persistence.UserEntity;

public interface IUserService {
    UserEntity registerNewUserAccount(UserDTO userDTO);
}
