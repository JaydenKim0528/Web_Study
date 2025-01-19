import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../css/CourseRegistration.css';

const CourseRegistration = () => {
    const { userName } = useAuth();

    const { register, handleSubmit, control, reset, setValue, getValues } = useForm({
        defaultValues: {
            courseName: '',
            instructorName: '',
            mainCategory: 'development',
            subCategories: [],
            customSubCategories: [],
            thumbnail: null,
            description: '',
            chapters: [
                {
                    chapterName: '',
                    lectures: [],
                },
            ],
            price: '',
        },
    });

    const { fields: chapterFields, append: appendChapter, remove: removeChapter } = useFieldArray({
        control,
        name: 'chapters',
    });

    const [lectures, setLectures] = useState(
        chapterFields.map(() => [{ lectureName: '', video: null }])
    );

    const handleLectureAdd = (chapterIndex) => {
        setLectures((prev) => {
            const updated = [...prev];
            updated[chapterIndex].push({ lectureName: '', video: null });
            return updated;
        });
    };

    const handleLectureRemove = (chapterIndex, lectureIndex) => {
        setLectures((prev) => {
            const updated = [...prev];
            updated[chapterIndex].splice(lectureIndex, 1);
            return updated;
        });
    };

    const handleCustomSubCategory = (event) => {
        if (event.key === 'Enter' && event.target.value.trim()) {
            setValue('customSubCategories', [
                ...(getValues('customSubCategories') || []),
                event.target.value.trim(),
            ]);
            event.target.value = '';
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('courseName', data.courseName);
            formData.append('instructorName', userName);
            formData.append('mainCategory', data.mainCategory);

            data.subCategories.forEach((subcategory) =>
                formData.append('subCategories[]', subcategory)
            );
            data.customSubCategories.forEach((subcategory) =>
                formData.append('subCategories[]', subcategory)
            );

            formData.append('thumbnail', data.thumbnail[0]);
            formData.append('description', data.description);
            formData.append('price', data.price);

            // Append chapters and lectures to formData
            data.chapters.forEach((chapter, chapterIndex) => {
                formData.append(`chapters[${chapterIndex}][chapterName]`, chapter.chapterName);
                lectures[chapterIndex].forEach((lecture, lectureIndex) => {
                    formData.append(
                        `chapters[${chapterIndex}][lectures][${lectureIndex}][lectureName]`,
                        lecture.lectureName
                    );
                    formData.append(
                        `chapters[${chapterIndex}][lectures][${lectureIndex}][video]`,
                        lecture.video
                    );
                });
            });

            await axios.post('http://localhost:8080/api/education/insert', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('강의가 성공적으로 등록되었습니다.');
            reset();
            setLectures([]); // Reset lectures state
        } catch (error) {
            console.error('강의 등록 실패:', error);
            alert('강의 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="course-registration">
            <h2>강의 등록</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="course-registration-form">
                {/* 강의 제목 */}
                <div className="form-group">
                    <label htmlFor="courseName">강의 제목</label>
                    <input
                        id="courseName"
                        {...register('courseName', { required: true })}
                        placeholder="강의 제목을 입력하세요"
                    />
                </div>

                {/* 강사 이름 */}
                <div className="form-group">
                    <label htmlFor="instructorName">강사 이름</label>
                    <input id="instructorName" value={userName} className="instructor-name" readOnly />
                </div>

                {/* 강의 대분류 */}
                <div className="form-group">
                    <label htmlFor="mainCategory">강의 대분류</label>
                    <select id="mainCategory" {...register('mainCategory')}>
                        <option value="development">개발·프로그래밍</option>
                        <option value="security">보안·네트워크</option>
                        <option value="design">디자인·아트</option>
                        <option value="business">기획·경영·마케팅</option>
                        <option value="selfDevelopment">커리어·자기개발</option>
                    </select>
                </div>

                {/* 강의 소분류 */}
                <div className="form-group">
                    <label>강의 소분류</label>
                    <select multiple {...register('subCategories')}>
                        <option value="webDevelopment">웹 개발</option>
                        <option value="frontend">프론트엔드</option>
                        <option value="backend">백엔드</option>
                        <option value="fullstack">풀스택</option>
                    </select>
                    <input
                        type="text"
                        placeholder="소분류 추가 (Enter 키로 추가)"
                        onKeyPress={handleCustomSubCategory}
                    />
                </div>

                {/* 챕터 및 강의 등록 */}
                {chapterFields.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="chapter-group">
                        <div className="form-group">
                            <label>챕터명</label>
                            <input
                                {...register(`chapters.${chapterIndex}.chapterName`, { required: true })}
                                placeholder="챕터명을 입력하세요"
                            />
                        </div>
                        {lectures[chapterIndex]?.map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className="lecture-group">
                                <input
                                    type="text"
                                    value={lecture.lectureName}
                                    onChange={(e) =>
                                        setLectures((prev) => {
                                            const updated = [...prev];
                                            updated[chapterIndex][lectureIndex].lectureName =
                                                e.target.value;
                                            return updated;
                                        })
                                    }
                                    placeholder="세부 강의명"
                                />
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setLectures((prev) => {
                                            const updated = [...prev];
                                            updated[chapterIndex][lectureIndex].video =
                                                e.target.files[0];
                                            return updated;
                                        })
                                    }
                                    accept="video/*"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleLectureRemove(chapterIndex, lectureIndex)}
                                >
                                    강의 삭제
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleLectureAdd(chapterIndex)}
                        >
                            강의 추가
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => {
                        appendChapter({ chapterName: '', lectures: [] });
                        setLectures((prev) => [...prev, [{ lectureName: '', video: null }]]);
                    }}
                >
                    챕터 추가
                </button>

                <div className="form-group">
                    <label htmlFor="price">강의 가격</label>
                    <input
                        id="price"
                        {...register('price', { required: true })}
                        type="number"
                        placeholder="강의 가격을 입력하세요"
                    />
                </div>

                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default CourseRegistration;
