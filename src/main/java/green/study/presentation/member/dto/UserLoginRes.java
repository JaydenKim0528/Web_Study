package green.study.presentation.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLoginRes {
    private Long userNo;
    private String userId;
    private String role;
    private String token;
}
