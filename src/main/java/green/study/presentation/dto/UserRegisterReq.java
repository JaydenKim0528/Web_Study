package green.study.presentation.dto;

import green.study.domain.model.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterReq {

    @NotBlank(message = "사용자의 아이디 입력은 필수입니다.")
    private String userId;

    @NotBlank(message = "사용자의 비밀번호 입력은 필수입니다.")
    private String password;

    @NotBlank(message = "비밀번호 확인은 필수입니다.")
    private String confirmPassword;

    @NotBlank(message = "사용자의 이름 입력은 필수입니다.")
    private String userName;

    private String role;

    public User toUser() {
        return User.builder()
                .userId(userId)
                .password(password)
                .userName(userName)
                .role(role)
                .build();
    }
}
