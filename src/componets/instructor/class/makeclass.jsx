import React, { useState } from 'react'
import styles from './makeclass.module.css'
import button from '../../../common/button.module.css'
import float from '../../../common/float.module.css'
import { postClass } from '../../../api/class/class'
import { useNavigate } from 'react-router-dom'
import { fetchTagByNm, createTag } from '@/api/tag/tag'

const MakeClass = (props) => {
  const navigate = useNavigate()
  const [classInfo, setClassInfo] = useState({
    category: '',
    classId: 0,
    descriptions: '',
    endDate: '',
    endTime: '',
    instructorId: localStorage.getItem('instructorId'),
    numberOfStudents: 0,
    place: '',
    startDate: '',
    startTime: '',
    title: '',
  })
  const [input, setInput] = useState('')
  const [tags, setTags] = useState([])

  const {
    category,
    descriptions,
    endDate,
    endTime,
    numberOfStudents,
    place,
    startDate,
    startTime,
    title,
  } = classInfo

  const onChange = (e) => {
    const { name, value } = e.target
    setClassInfo({
      ...classInfo,
      [name]: value,
    })
  }

  //태그 메소드
  const onChangeTag = (e) => {
    setTagInput(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setInput('')
      fetchTagByNm(input)
        .then((res) => {
          setTags([...tags, res.data])
        })
        .catch(() => {
          createTagName()
        })
    }
  }

  const postData = () => {
    postClass(classInfo).then((res) => {
      if (res.status === 200) navigate('/mypage')
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <section className={styles.section1}>
          <div className={styles.form}>
            <div className={styles.label}>클래스명</div>
            <input
              type='text'
              className={styles.inputForm}
              onChange={onChange}
              name='title'
              value={title}
            ></input>
          </div>
          <div className={styles.form}>
            <div className={styles.label}>카테고리</div>
            <input
              type='text'
              className={styles.inputForm}
              onChange={onChange}
              name='category'
              value={category}
            ></input>
          </div>

          <div className={styles.form}>
            <div className={styles.label}>시작 날짜</div>
            <input
              type='date'
              name='startDate'
              className={styles.inputForm}
              onChange={onChange}
              value={startDate}
            ></input>
          </div>
          <div className={styles.form}>
            <div className={styles.label}>종료 날짜</div>
            <input
              type='date'
              name='endDate'
              className={styles.inputForm}
              onChange={onChange}
              value={endDate}
            ></input>
          </div>

          <div className={styles.form}>
            <div className={styles.label}>시작 시간</div>
            <input
              type='time'
              name='startTime'
              className={styles.inputForm}
              onChange={onChange}
              value={startTime}
            ></input>
          </div>
          <div className={styles.form}>
            <div className={styles.label}>종료 시간</div>
            <input
              type='time'
              name='endTime'
              className={styles.inputForm}
              onChange={onChange}
              value={endTime}
            ></input>
          </div>
        </section>
        <section className={styles.section2}>
          <div className={styles.form}>
            <div className={styles.label}>수강인원</div>
            <select
              className={styles.inputForm}
              onChange={onChange}
              value={numberOfStudents}
              name='numberOfStudents'
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
            </select>
          </div>
          <div className={styles.form}>
            <div className={styles.label}>장소</div>
            <input
              type='text'
              name='place'
              className={styles.inputForm}
              onChange={onChange}
              value={place}
            ></input>
          </div>
          <div className={styles.form}>
            <div className={styles.label}>태그</div>
            <input
              type='text'
              className={styles.inputForm}
              onChange={onChangeTag}
              onKeyPress={handleKeyPress}
              value={tagInput}
            ></input>
            {tags.map((tag) => (
              <li className={styles.item} key={tag.tagInfoId}>
                <ol className={styles.tagNm}>{tag.tagName}</ol>
                <ol
                  className={styles.tagDel}
                  onClick={() => delTag(tag.tagInfoId)}
                >
                  X
                </ol>
              </li>
            ))}
          </div>
          <div className={styles.form}>
            <div className={styles.label}>설명</div>
            <textarea
              type='text'
              name='descriptions'
              className={styles.inputForm}
              onChange={onChange}
              value={descriptions}
            ></textarea>
          </div>
        </section>
      </div>
      <button
        className={` ${button.fullPrimaryBtn} ${float.floatRight}`}
        onClick={postData}
      >
        제출하기
      </button>
    </div>
  )
}
export default MakeClass
