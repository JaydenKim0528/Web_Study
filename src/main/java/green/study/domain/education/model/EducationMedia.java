package green.study.domain.education.model;

import green.study.domain.education.entity.EducationCurriculumEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationMedia {

    private List<LectureMedia> lectureMediaList;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LectureMedia {
        private String chapterName; // 챕터 이름
        private String lectureName; // 강의 이름
        private String videoPath;   // 강의 파일 경로
    }

    public List<EducationCurriculumEntity> toCurriculumEntities(Long educationNo) {
        return lectureMediaList.stream()
                .map(lecture -> EducationCurriculumEntity.builder()
                        .education_no(educationNo)
                        .education_chapter(lecture.getChapterName())
                        .lecture_name(lecture.getLectureName())
                        .lecture_media_path(lecture.getVideoPath())
                        .build())
                .toList();
    }
}
