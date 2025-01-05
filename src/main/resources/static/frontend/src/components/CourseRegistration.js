import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import '../css/CourseRegistration.css';

const CourseRegistration = () => {
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            courseName: '',
            instructorName: '',
            mainCategory: 'development',
            subCategories: [],
            thumbnail: null,
            lectures: [{ lectureName: '', video: null }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'lectures',
    });

    const [customSubCategories, setCustomSubCategories] = useState([]);

    // 개선된 상태 관리 및 폼 데이터 처리 코드
const handleCustomSubCategory = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
        if (!customSubCategories.includes(event.target.value.trim())) {
            setCustomSubCategories([...customSubCategories, event.target.value.trim()]);
        }
        event.target.value = '';
    }
};

const onSubmit = async (data) => {
    try {
        const formData = new FormData();
        formData.append('courseName', data.courseName);
        formData.append('instructorName', data.instructorName);
        formData.append('mainCategory', data.mainCategory);

        data.subCategories.forEach((subcategory) => {
            formData.append('subCategories[]', subcategory);
        });

        customSubCategories.forEach((subcategory) => {
            formData.append('subCategories[]', subcategory);
        });

        formData.append('thumbnail', data.thumbnail[0]);

        data.lectures.forEach((lecture, index) => {
            if (lecture.video && lecture.video[0]) {
                formData.append(`lectures[${index}][lectureName]`, lecture.lectureName);
                formData.append(`lectures[${index}][video]`, lecture.video[0]);
            }
        });

        await axios.post('http://localhost:8080/api/courses', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        alert('강의가 성공적으로 등록되었습니다.');
        reset();
    } catch (error) {
        console.error('강의 등록 실패:', error);
        alert('강의 등록에 실패했습니다. 다시 시도해주세요.');
    }
};

    return (
        <div className="course-registration">
            <h2>강의 등록</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="course-registration-form">
                {/* 강의명 */}
                <div className="form-group">
                    <label htmlFor="courseName">강의명</label>
                    <input
                        id="courseName"
                        {...register('courseName', { required: true })}
                        placeholder="강의명을 입력하세요"
                    />
                </div>

                {/* 강사 이름 */}
                <div className="form-group">
                    <label htmlFor="instructorName">강사 이름</label>
                    <input
                        id="instructorName"
                        {...register('instructorName', { required: true })}
                        placeholder="강사 이름을 입력하세요"
                    />
                </div>

                {/* 강의 대분류 */}
                <div className="form-group">
                    <label htmlFor="mainCategory">강의 대분류</label>
                    <select id="mainCategory" {...register('mainCategory')}>
                        <option value="development">개발</option>
                        <option value="design">디자인</option>
                        <option value="security">보안</option>
                    </select>
                </div>

                {/* 강의 소분류 */}
                <div className="form-group">
                    <label>강의 소분류</label>
                    <select multiple {...register('subCategories')}>
                        <option value="frontend">프론트엔드</option>
                        <option value="backend">백엔드</option>
                        <option value="publishing">퍼블리싱</option>
                        <option value="infoProcessing">정보처리</option>
                    </select>
                    <div className="custom-subcategory">
                        <label>커스텀 소분류 추가</label>
                        <input
                            type="text"
                            placeholder="엔터를 눌러 추가"
                            onKeyPress={handleCustomSubCategory}
                        />
                        <div className="custom-subcategory-list">
                            {customSubCategories.map((category, index) => (
                                <span key={index}>{category}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 썸네일 이미지 */}
                <div className="form-group">
                    <label htmlFor="thumbnail">썸네일 이미지 등록</label>
                    <input
                        id="thumbnail"
                        type="file"
                        {...register('thumbnail', { required: true })}
                        accept="image/*"
                    />
                </div>

                {/* 동영상 등록 */}
                <div className="form-group">
                    <label>동영상 등록</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="lecture-group">
                            <input
                                type="text"
                                placeholder="세부 강의명"
                                {...register(`lectures.${index}.lectureName`, { required: true })}
                            />
                            <input
                                type="file"
                                {...register(`lectures.${index}.video`, { required: true })}
                                accept="video/*"
                            />
                            <button type="button" onClick={() => remove(index)}>
                                삭제
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ lectureName: '', video: null })}>
                        강의 추가
                    </button>
                </div>

                {/* 제출 버튼 */}
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default CourseRegistration;
