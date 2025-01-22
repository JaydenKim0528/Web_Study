package green.study.infrastructure.repository;

import green.study.domain.education.entity.EducationCurriculumEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurriculumRepository extends JpaRepository<EducationCurriculumEntity, Long> {
}
