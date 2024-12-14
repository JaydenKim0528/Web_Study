// 기본 회원가입 정보 (아이디 중복 검사용)
const existingUsers = ['testuser', 'admin', 'sampleuser'];
let isUsernameAvailable = false;

// DOM 요소
const signupContainer = document.getElementById('signup-container');
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const nameInput = document.getElementById('name');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const usernameError = document.getElementById('username-error');
const usernameAvailable = document.getElementById('username-available');
const nameError = document.getElementById('name-error');

// 아이디 유효성 검사
const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9]{4,12}$/; // 영문, 숫자만 허용, 길이 4~12자
    return usernamePattern.test(username);
};

// 비밀번호 유효성 검사
const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // 최소 8자 이상, 영문, 숫자, 특수문자 하나 이상 포함
    return passwordPattern.test(password);
};

// 아이디 중복 검사
document.getElementById('check-username').addEventListener('click', () => {
    const username = usernameInput.value;

    if (!validateUsername(username)) {
        usernameError.textContent = '아이디는 영문과 숫자만 포함되어야 하며, 4~12자 사이여야 합니다.';
        usernameAvailable.textContent = '';
        isUsernameAvailable = false;
        return;
    }

    if (existingUsers.includes(username)) {
        usernameError.textContent = '아이디가 이미 존재합니다.';
        usernameAvailable.textContent = '';
        isUsernameAvailable = false;
    } else {
        usernameError.textContent = '';
        usernameAvailable.textContent = '사용 가능한 아이디입니다.';
        isUsernameAvailable = true;
    }
});

// 비밀번호 확인 실시간 체크
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        confirmPasswordError.textContent = '';
    }
});

// 이름 유효성 검사 (공백 포함되지 않게)
const validateName = (name) => {
    return name.trim() !== '';
};

// 회원가입 폼 제출
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const name = nameInput.value;

    let isValid = true;

    // 아이디 유효성 검사
    if (!validateUsername(username)) {
        usernameError.textContent = '아이디는 영문과 숫자만 포함되어야 하며, 4~12자 사이여야 합니다.';
        isValid = false;
    } else if (!isUsernameAvailable) {
        alert('아이디 중복 확인을 해주세요.');
        isValid = false;
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
        passwordError.textContent = '비밀번호는 최소 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    // 비밀번호 확인 검사
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
    }

    // 이름 유효성 검사
    if (!validateName(name)) {
        nameError.textContent = '이름을 입력해 주세요.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    if (isValid) {
        // 유효성 검사 통과 후 처리 (회원가입 성공)
        alert('회원가입이 완료되었습니다!');
        signupForm.reset();
        usernameAvailable.textContent = '';
        usernameError.textContent = '';
        location.href="login.html"
    }
});