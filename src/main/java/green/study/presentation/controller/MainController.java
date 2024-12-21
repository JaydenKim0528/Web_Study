package green.study.presentation.controller;

import green.study.application.service.ApplicationService;
import green.study.domain.model.User;
import green.study.presentation.dto.UserLoginReq;
import green.study.presentation.dto.UserLoginRes;
import green.study.presentation.dto.UserRegisterReq;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MainController {

    private final ApplicationService service;

    @PostMapping("/register")
    public User userRegister(@RequestBody @Valid UserRegisterReq userReq) {
        return service.userCreate(userReq.toUser());
    }

    @PostMapping("/login")
    public UserLoginRes userLogin(@RequestBody @Valid UserLoginReq userLoginReq) {
        return service.userLogin(userLoginReq.toLogin());
    }

    @GetMapping("/checkUserId")
    public Map<String, Boolean> checkUserId(@RequestParam("userId") String userId) {
        boolean isAvailable = service.isUserIdAvailable(userId);
        return Map.of("available", isAvailable);
    }

}

