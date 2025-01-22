package green.study.domain.education.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "EDUCATION")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EducationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long education_no;

    @Column(nullable = false)
    private String education_name;

    @Column(nullable = false)
    private Long teacher_no;

    @Lob
    @Column(nullable = false)
    private String education_description;

    @Column(nullable = false)
    private String education_thumbnail;

    @Column(nullable = false)
    private String education_thumbnail_path;

    @Column(nullable = false)
    private String education_status = "OPEN";

    @Column(nullable = false)
    private LocalDateTime education_created_at;

    @Column(nullable = false)
    private int education_price;
}

