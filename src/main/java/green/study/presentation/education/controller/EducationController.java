package green.study.presentation.education.controller;

import green.study.application.education.service.impl.EducationServiceImpl;
import green.study.presentation.member.dto.education.EducationInsertReq;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class EducationController {

    private final EducationServiceImpl service;

    @PostMapping("/education/insert")
    public ResponseEntity<?> educationInsert(@ModelAttribute @Valid EducationInsertReq educationInsertReq) {
        try {
            service.processEducationRegistration(educationInsertReq, educationInsertReq.getThumbnail());
            return ResponseEntity.ok("강의 등록이 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            log.error("강의 등록 중 오류 발생: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("강의 등록 중 오류가 발생했습니다.");
        }
    }


}
