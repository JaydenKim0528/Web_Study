package green.study.presentation.member.dto.education;

import green.study.domain.education.model.EducationInfo;
import green.study.domain.education.model.EducationMedia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EducationInsertReq {

    @NotBlank(message = "강의 제목 입력은 필수입니다.")
    private String title;

    @NotNull
    private Long userNo;

    @NotBlank(message = "강사 이름 입력은 필수입니다.")
    private String userName;

    @NotBlank(message = "강의 설명 입력은 필수입니다.")
    private String description;

    @NotNull
    private String mainCategory;

    @NotNull
    private List<String> subCategory;

    private MultipartFile thumbnail;

    @NotBlank(message = "가격 입력은 필수입니다.")
    private int price;

    @NotNull
    private List<ChapterRequest> chapters;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChapterRequest {
        private String chapterName;
        private List<LectureRequest> lectures;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LectureRequest {
        private String lectureName;
        private MultipartFile video;
    }

    public EducationInfo toEducationInfo(String thumbnailName, String thumbnailPath) {
        return EducationInfo.builder()
                .educationName(title)
                .userNo(userNo)
                .userName(userName)
                .description(description)
                .mainCategory(mainCategory)
                .subCategory(subCategory)
                .thumbnailName(thumbnailName)
                .thumbnailPath(thumbnailPath)
                .price(price)
                .chapters(
                        chapters.stream().map(chapter ->
                                EducationInfo.ChapterInfo.builder()
                                        .chapterName(chapter.getChapterName())
                                        .lectures(new ArrayList<>()) // Lecture 데이터는 별도 처리
                                        .build()
                        ).toList()
                )
                .build();
    }

    public EducationMedia toEducationMedia(List<String> videoPaths) {
        List<EducationMedia.LectureMedia> lectureMediaList = new ArrayList<>();
        int index = 0;

        for (ChapterRequest chapter : chapters) {
            for (LectureRequest lecture : chapter.getLectures()) {
                lectureMediaList.add(
                        EducationMedia.LectureMedia.builder()
                                .chapterName(chapter.getChapterName())
                                .lectureName(lecture.getLectureName())
                                .videoPath(videoPaths.get(index))
                                .build()
                );
                index++;
            }
        }

        return EducationMedia.builder()
                .lectureMediaList(lectureMediaList)
                .build();
    }
}
