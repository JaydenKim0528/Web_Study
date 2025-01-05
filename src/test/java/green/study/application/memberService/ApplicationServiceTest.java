package green.study.application.memberService;

import green.study.application.member.service.impl.MemberServiceImpl;
import green.study.domain.member.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class ApplicationServiceTest {

    @Autowired
    MemberServiceImpl service;

    @Test
    void userCreate() {
        User user1 = User.builder()
                .userId("sample")
                .password("qwer1234!")
                .userName("홍길동")
                .role("user")
                .build();

        String confirmPassword = "qwer1234!";

        User user = service.userCreate(user1, confirmPassword);

        assertThat(user.getUserId().equals("sample"));
    }
}