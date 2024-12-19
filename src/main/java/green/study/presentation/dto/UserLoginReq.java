package green.study.presentation.dto;

import green.study.domain.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserLoginReq {

    @NotNull
    private String userId;

    @NotNull
    private String password;

    public UserLoginReq(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public User toLogin() {
        return User.builder()
                .userId(userId)
                .password(password)
                .build();
    }
}
