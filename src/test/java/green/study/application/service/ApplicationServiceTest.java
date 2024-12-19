package green.study.application.service;

import green.study.domain.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class ApplicationServiceTest {

    @Autowired
    ApplicationService service;

    @Test
    void userCreate() {
        User user1 = User.builder()
                .userId("sample")
                .password("qwer1234!")
                .userName("홍길동")
                .role("user")
                .build();

        User user = service.userCreate(user1);

        assertThat(user.getUserId().equals("sample"));
    }
}