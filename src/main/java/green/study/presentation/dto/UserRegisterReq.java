package green.study.presentation.dto;

import green.study.domain.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
    @Pattern(regexp = "^(?=.*[a-z])[a-z0-9]{6,20}$", message = "영문 소문자 + 숫자 6 ~ 20자리여야 합니다.")
    private String userId;

    @NotBlank(message = "사용자의 비밀번호 입력은 필수입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$", message = "영문+숫자+특수문자를 포함하여 8~20자로 입력하세요.")
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
                .confirmPassword(confirmPassword)
                .userName(userName)
                .role(role)
                .build();
    }
}
