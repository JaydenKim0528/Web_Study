package green.study.domain.education.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "STUDY_INFO")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyInfoEntity {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyNo;

    @Column(nullable = false)
    private String studyName;

    @Lob
    @Column(nullable = false)
    private String studyDetail;

    @Column(nullable = false)
    private String thumnail;


}
