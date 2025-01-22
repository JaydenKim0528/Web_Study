package green.study.domain.education.model;

import green.study.domain.education.entity.EducationEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class EducationInfo {

    private String educationName;
    private Long userNo;
    private String userName;
    private String description;
    private String mainCategory;
    private List<String> subCategory;
    private String thumbnailName; // 썸네일 이름
    private String thumbnailPath; // 썸네일 경로
    private int price;
    private List<ChapterInfo> chapters;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChapterInfo {
        private String chapterName;
        private List<LectureInfo> lectures;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LectureInfo {
        private String lectureName;
        private String videoPath;
    }

    public EducationEntity toEducationEntity() {
        return EducationEntity.builder()
                .education_name(educationName)
                .education_description(description)
                .education_thumbnail(thumbnailName)
                .education_thumbnail_path(thumbnailPath)
                .teacher_no(userNo)
                .education_price(price)
                .build();
    }
}
