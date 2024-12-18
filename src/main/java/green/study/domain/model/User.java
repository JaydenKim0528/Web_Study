package green.study.domain.model;

import green.study.domain.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;

import javax.swing.text.html.parser.Entity;

@Getter
@Builder
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
