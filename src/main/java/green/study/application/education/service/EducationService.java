package green.study.application.education.service;

import green.study.presentation.member.dto.education.EducationInsertReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EducationService {

    void processEducationRegistration(EducationInsertReq educationInsertReq, MultipartFile multipartFile) throws IOException;

}
