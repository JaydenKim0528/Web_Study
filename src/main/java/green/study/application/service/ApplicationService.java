package green.study.application.service;

import green.study.domain.entity.UserEntity;
import green.study.domain.model.User;
import green.study.infrastructure.repository.UserRepository;
import green.study.presentation.dto.UserLoginRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    public final UserRepository userRepository;

    public User userCreate(final User user) {
        //Entity Save
        UserEntity saved = userRepository.save(user.toEntity());
        return User.from(saved);
    }

    public UserLoginRes userLogin(final User user) {
        UserEntity read = userRepository.findByUserId(user.getUserId()).orElseThrow(IllegalAccessError::new);

        if(!user.getPassword().equals(read.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return UserLoginRes.builder()
                .userNo(user.getUserNo())
                .userId(user.getUserId())
                .role(user.getRole())

                .build();
    }

}
