package green.study.presentation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import green.study.presentation.dto.UserRegisterReq;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MainControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void userRegister() throws Exception {
        String requestBody = objectMapper.writeValueAsString(
                UserRegisterReq.builder()
                        .userId("sample")
                        .password("qwer1234!")
                        .confirmPassword("qwer1234!")
                        .userName("홍길동")
                        .role("user")
                        .build()
        );

        final ResultActions resultActions = this.mockMvc.perform(
                MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
        );

        resultActions.andExpect(status().isOk());
    }

    @Test
    @DisplayName("테스트")
    void userRegister_no() throws Exception {
        String requestBody = objectMapper.writeValueAsString(
                UserRegisterReq.builder()
                        .userId("")
                        .password("qwer1234!")
                        .confirmPassword("qwer1234!")
                        .userName("홍길동")
                        .role("user")
                        .build()
        );

        final ResultActions resultActions = this.mockMvc.perform(
                MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
        );

        resultActions.andExpect(status().isBadRequest());
    }
}