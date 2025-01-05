package green.study.presentation.member.controller;

import green.study.application.member.service.impl.MemberServiceImpl;
import green.study.presentation.member.dto.UserLoginReq;
import green.study.presentation.member.dto.UserLoginRes;
import green.study.presentation.member.dto.UserMypageReq;
import green.study.presentation.member.dto.UserRegisterReq;
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
public class MemberController {

    private final MemberServiceImpl service;

    // 계정 생성 요청
    @PostMapping("/register")
    public void userRegister(@RequestBody @Valid UserRegisterReq userReq) {
        service.userCreate(userReq.toUser(), userReq.getConfirmPassword());
    }

    // 계정 로그인 요청
    @PostMapping("/login")
    public void userLogin(@RequestBody @Valid UserLoginReq userLoginReq, HttpServletResponse response) {
        UserLoginRes userLoginRes = service.userLogin(userLoginReq.toLogin());

        Cookie tokenCookie = new Cookie("token", userLoginRes.getToken());
        tokenCookie.setHttpOnly(false); // JavaScript 접근 가능 여부
        tokenCookie.setSecure(true); // HTTPS에서만 접근 가능 여부
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(86400);
        response.addCookie(tokenCookie);

        log.info("쿠키 체크 : tokenCookie={}", tokenCookie);

    }

    // (가입시)아이디 중복 검사
    @GetMapping("/checkUserId")
    public Map<String, Boolean> checkUserId(@RequestParam("userId") String userId) {
        boolean isAvailable = service.isUserIdAvailable(userId);
        return Map.of("available", isAvailable);
    }

    // 마이페이지 요청
    @PostMapping("/mypage/{category}")
    public ResponseEntity<?> getCategoryData(@RequestBody UserMypageReq userMypageReq, @PathVariable("category") String category) {
        log.info("마이페이지 요청 - 카테고리: {}, 사용자 ID: {}, 사용자 번호: {}",
                userMypageReq.getCategory(), userMypageReq.getUserId(), userMypageReq.getUserNo());

        switch (category) {
            case "dashboard" :
                return ResponseEntity.ok(service.dashboardData(userMypageReq.toMypage()));
            case "learning" :
                return ResponseEntity.ok(service.learningData(userMypageReq.toMypage()));
            case "account" :
                return ResponseEntity.ok(service.accountData(userMypageReq.toMypage()));
            default:
                return ResponseEntity.badRequest().body("카테고리가 없습니다.");
        }
    }
}

