package green.study.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Builder
@Getter
@AllArgsConstructor
public class UserEntity {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;

    private String userId;
    private String password;
    private String userName;
    private String role;

    public UserEntity(String userId, String password, String userName, String role) {
        this.userId = userId;
        this.password = password;
        this.userName = userName;
        this.role = role;
    }

}
