package green.study.domain.education.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "CURRICULUM")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EducationCurriculumEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long curriculum_no;

    @Column(nullable = false)
    private Long education_no;

    @Column(nullable = false)
    private String education_chapter;

    @Column(nullable = false)
    private int education_order;

    @Column(nullable = false)
    private String lecture_name;

    @Column(nullable = false)
    private String lecture_media_path;

    @Column(nullable = false)
    private LocalDateTime lecture_created_at;

    @Column(nullable = false)
    private LocalDateTime lecture_updated_at;
}

