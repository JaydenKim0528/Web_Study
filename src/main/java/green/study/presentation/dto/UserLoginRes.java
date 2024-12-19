package green.study.presentation.dto;

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
