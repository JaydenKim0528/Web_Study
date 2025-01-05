package green.study.application.member.service;

import green.study.domain.member.model.User;
import green.study.presentation.member.dto.UserLoginRes;

public interface MemberService {

    // 계정 생성
    User userCreate(final User user, String userConfirmPassword);

    // 계정 로그인
    UserLoginRes userLogin(final User user);

    // 아이디 중복 검사
    boolean isUserIdAvailable(String userId);

}
