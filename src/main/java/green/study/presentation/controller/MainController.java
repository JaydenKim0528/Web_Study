package green.study.presentation.controller;

import green.study.application.service.ApplicationService;
import green.study.domain.model.User;
import green.study.presentation.dto.UserLoginReq;
import green.study.presentation.dto.UserLoginRes;
import green.study.presentation.dto.UserRegisterReq;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<UserLoginRes> userLogin(@RequestBody @Valid UserLoginReq userLoginReq, HttpServletResponse response) {
        UserLoginRes userLoginRes = service.userLogin(userLoginReq.toLogin());

        Cookie tokenCookie = new Cookie("token", userLoginRes.getToken());
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(false);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(86400);
        response.addCookie(tokenCookie);

        return ResponseEntity.ok(userLoginRes);
    }

    @GetMapping("/checkUserId")
    public Map<String, Boolean> checkUserId(@RequestParam("userId") String userId) {
        boolean isAvailable = service.isUserIdAvailable(userId);
        return Map.of("available", isAvailable);
    }

}

