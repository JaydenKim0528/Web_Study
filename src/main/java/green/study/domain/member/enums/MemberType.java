package green.study.domain.member.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberType {
    USER("USER"), TEACH("TEACH");
    private String type;
}
