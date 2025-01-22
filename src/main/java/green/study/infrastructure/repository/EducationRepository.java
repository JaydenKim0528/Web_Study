package green.study.infrastructure.repository;

import green.study.domain.education.entity.EducationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<EducationEntity, Long> {


}
