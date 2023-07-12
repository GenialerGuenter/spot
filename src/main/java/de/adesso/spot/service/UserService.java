package de.adesso.spot.service;

import de.adesso.spot.controller.UserDTO;
import de.adesso.spot.persistence.UserEntity;
import de.adesso.spot.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService implements IUserService {
    @Autowired
    private UserRepository repository;

    @Override
    public UserEntity registerNewUserAccount(UserDTO userDTO){
        UserEntity user = new UserEntity();
        user.setUserName(userDTO.getUserName());
        user.setPassword(userDTO.getPassword());
        user.setRole("USER");
        return repository.save(user);
    }
}
