package green.study.presentation.member.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import green.study.domain.member.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class UserLoginReq {

    @NotBlank(message = "아이디 입력은 필수입니다.")
    @Pattern(regexp = "^(?=.*[a-z])[a-z0-9]{6,20}$", message = "영문 소문자 + 숫자 6 ~ 20자리여야 합니다.")
    private String userId;

    @NotBlank(message = "패스워드 입력은 필수입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$", message = "영문+숫자+특수문자를 포함하여 8~20자로 입력하세요.")
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
