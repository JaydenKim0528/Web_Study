package green.study.presentation.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import green.study.domain.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserLoginReq {

    @NotBlank(message = "아이디 입력은 필수입니다.")
    private String userId;

    @NotBlank(message = "패스워드 입력은 필수입니다.")
    private String password;

    @NotNull
    private String role;

    @JsonCreator
    public UserLoginReq(@JsonProperty("userId") String userId, @JsonProperty("password") String password, @JsonProperty("role") String role) {
        this.userId = userId;
        this.password = password;
        this.role = role;
    }

    public User toLogin() {
        return User.builder()
                .userId(userId)
                .password(password)
                .role(role)
                .build();
    }
}
