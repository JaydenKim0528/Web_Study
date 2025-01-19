package green.study.domain.member.model;

import green.study.domain.member.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder(toBuilder = true)
public class User {

    private Long userNo;
    private String userId;
    private String password;
    private String userName;
    private String role;

    public static User from(UserEntity userEntity) {
        return User.builder()
                .userNo(userEntity.getUserNo())
                .userId(userEntity.getUserId())
                .password(userEntity.getPassword())
                .userName(userEntity.getUserName())
                .role(userEntity.getRole())
                .build();
    }

    public UserEntity toEntity() {
        return UserEntity.builder()
                .userId(userId)
                .password(password)
                .userName(userName)
                .role(role)
                .build();
    }
}
