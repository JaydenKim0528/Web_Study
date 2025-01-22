package green.study.application.education.service.impl;

import green.study.application.education.service.EducationService;
import green.study.domain.education.entity.EducationCurriculumEntity;
import green.study.domain.education.entity.EducationEntity;
import green.study.domain.education.model.EducationInfo;
import green.study.domain.education.model.EducationMedia;
import green.study.infrastructure.repository.CurriculumRepository;
import green.study.infrastructure.repository.EducationRepository;
import green.study.presentation.member.dto.education.EducationInsertReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;
    private final CurriculumRepository curriculumRepository;

    @Transactional
    @Override
    public void processEducationRegistration(EducationInsertReq educationInsertReq, MultipartFile thumbnailFile) throws IOException {
        // 썸네일 저장
        String thumbnailName = generateUniqueFileName(thumbnailFile.getOriginalFilename());
        String thumbnailPath = saveFile(thumbnailFile, "uploads/thumbnails/", thumbnailName);

        // 강의 정보 저장
        EducationInfo educationInfo = educationInsertReq.toEducationInfo(thumbnailName, thumbnailPath);
        EducationEntity savedEntity = educationRepository.save(educationInfo.toEducationEntity());

        // 강의 데이터 처리
        List<String> videoPaths = saveVideos(educationInsertReq);
        EducationMedia educationMedia = educationInsertReq.toEducationMedia(videoPaths);

        // 커리큘럼 저장
        saveCurriculum(educationMedia, savedEntity.getEducation_no());
    }

    private List<String> saveVideos(EducationInsertReq educationInsertReq) throws IOException {
        List<String> videoPaths = new ArrayList<>();
        for (EducationInsertReq.ChapterRequest chapter : educationInsertReq.getChapters()) {
            for (EducationInsertReq.LectureRequest lecture : chapter.getLectures()) {
                String videoName = generateUniqueFileName(lecture.getVideo().getOriginalFilename());
                videoPaths.add(saveFile(lecture.getVideo(), "uploads/videos/", videoName));
            }
        }
        return videoPaths;
    }

    private void saveCurriculum(EducationMedia educationMedia, Long educationNo) {
        for (EducationMedia.LectureMedia lecture : educationMedia.getLectureMediaList()) {
            curriculumRepository.save(EducationCurriculumEntity.builder()
                    .education_no(educationNo)
                    .education_chapter(lecture.getChapterName())
                    .lecture_name(lecture.getLectureName())
                    .lecture_media_path(lecture.getVideoPath())
                    .build());
        }
    }

    private String saveFile(MultipartFile file, String uploadDir, String fileName) throws IOException {
        String filePath = uploadDir + fileName;
        File destinationFile = new File(filePath);
        if (!destinationFile.exists()) {
            destinationFile.mkdirs();
        }
        file.transferTo(destinationFile);
        return filePath;
    }

    private String generateUniqueFileName(String originalFileName) {
        String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return currentDateTime + "_" + originalFileName;
    }
}
