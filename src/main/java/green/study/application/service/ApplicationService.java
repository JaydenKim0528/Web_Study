package green.study.application.service;

import green.study.domain.entity.UserEntity;
import green.study.domain.model.User;
import green.study.infrastructure.repository.UserRepository;
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



}
