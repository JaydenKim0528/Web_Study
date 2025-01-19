package green.study.application.member.service.impl;

import green.study.application.member.service.MemberService;
import green.study.domain.member.entity.UserEntity;
import green.study.domain.member.model.Mypage;
import green.study.domain.member.model.User;
import green.study.infrastructure.repository.UserRepository;
import green.study.infrastructure.util.JwtUtil;
import green.study.presentation.member.dto.member.UserLoginRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    public final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User userCreate(final User user, String userConfirmPassword) {
        if(!user.getPassword().equals(userConfirmPassword)) {
            throw new IllegalArgumentException("비밀번호와 비밀번호 확인이 일치하지 않습니다");
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());

        User updateUser = user.toBuilder()
                .password(encodedPassword)
                .build();

        UserEntity userEntity = updateUser.toEntity();
        UserEntity savedEntity = userRepository.save(userEntity);

        return User.from(savedEntity);
    }

    @Override
    public UserLoginRes userLogin(final User user) {
        log.info("로그인 요청: userId={}, password={}", user.getUserId(), user.getPassword());

        UserEntity foundEntity = userRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        User foundUser = User.from(foundEntity);

        log.info("데이터베이스에서 조회된 사용자: {}", foundUser);

        if (!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            log.warn("비밀번호 불일치: 입력된 비밀번호={}", user.getPassword());
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        log.info("로그인 성공: userId={}", foundUser.getUserId());
        String token = JwtUtil.generateToken(foundUser.getUserNo(), foundUser.getUserId(), foundUser.getUserName(), foundUser.getRole());

        return UserLoginRes.builder()
                .userNo(foundUser.getUserNo())
                .userId(foundUser.getUserId())
                .userName(foundUser.getUserName())
                .role(foundUser.getRole())
                .token(token)
                .build();
    }

    @Override
    public Map<String, Object> validateUser(String token) {
        Map<String, Object> response = new HashMap<>();
        if (token != null && JwtUtil.validateToken(token)) {
            Map<String, String> userInfo = JwtUtil.getUserInfoFromToken(token);
            response.put("loggedIn", true);
            response.put("userId", userInfo.get("userId"));
            response.put("userName", userInfo.get("userName"));
            response.put("role", userInfo.get("role"));
        } else {
            response.put("loggedIn", false);
            response.put("userId", "");
            response.put("userName", "");
            response.put("role", "");
        }
        return response;
    }


    @Override
    public boolean isUserIdAvailable(String userId) {
        return !userRepository.existsByUserId(userId);
    }

    public Map<String, Object> dashboardData(final Mypage mypage) {
        return Map.of();
    }

    public Map<String, Object> learningData(final Mypage mypage) {
        return Map.of();
    }

    public Map<String, Object> accountData(final Mypage mypage) {
        return Map.of();
    }

}
