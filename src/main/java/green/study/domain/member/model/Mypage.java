package green.study.domain.member.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Mypage {

    private Long userNo;
    private String userId;
    private String role;
    private String category;



}
