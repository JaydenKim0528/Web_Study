package green.study.presentation.member.dto;

import green.study.domain.member.model.Mypage;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserMypageReq {

    @NotNull
    private long userNo;

    @NotNull
    private String userId;

    @NotNull
    private String role;

    @NotNull
    private String category;

    public UserMypageReq(long userNo, String userId, String role, String category) {
        this.userNo = userNo;
        this.userId = userId;
        this.role = role;
        this.category = category;
    }

    public Mypage toMypage() {
        return Mypage.builder()
                .userNo(userNo)
                .userId(userId)
                .role(role)
                .category(category)
                .build();
    }

}
