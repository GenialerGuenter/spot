package de.adesso.spot.controller;

import de.adesso.spot.persistence.UserEntity;
import de.adesso.spot.service.MyUserDetailsService;
import de.adesso.spot.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.User;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

//@RestController
@RequestMapping("/api")
public class RegistrationController {
    UserService userService;

    @GetMapping("/user/register")
    public String showRegistrationForm(WebRequest request, Model model){
        UserDTO userDTO = new UserDTO();
        model.addAttribute("user", userDTO);
        return "registration";
    }

    @PostMapping("/user/registration")
    public ModelAndView registerUserAccount(@ModelAttribute("user") @Valid UserDTO userDTO,
                                            HttpServletRequest request, Errors errors){
        UserEntity registered = userService.registerNewUserAccount(userDTO);

        return new ModelAndView("successRegister", "user", userDTO);
    }
}
