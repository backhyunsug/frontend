
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Axios from "axios";
//https://www.npmjs.com/package/react-summernote
//https://blog.naver.com/kknd4444/223090317376



//썸머노트
//npm install react-summernote

function BoardWrite2( ){

    let history = useNavigate ();

    const [inputs, setInputs] = useState({
      title: '',
      writer: '',
      contents:'',
      filename:''
    });
  
    const { title, writer,contents, filename  } = inputs; 
  
    const onChange = (e) => {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      //console.log(value, name);
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };
  
    const onReset = () => {
      setInputs({
        title: '',
        writer: '',
        contents:'',
        filename:''
      })
    };

    const onSubmit=(e)=> {
      e.preventDefault();
 
      // Axios.post('http://localhost:9090/mongo/update/', obj)
      //      .then(res => console.log(res.data));3
      //react에서 본래의 자바스크립트 객체는 반드시 window로 시작해야 한다. 
      var frmData = new FormData(window.document.myform); 
      //frmData.append("title", inputs.title);
      //frmData.append("writer", inputs.writer);
      //frmData.append("contents", inputs.contents);
      console.log( frmData);
      for(let key of frmData.keys())
      {
        console.log( frmData.get(key));
      }
      //frmData.append("file", document.myform.filename.files[0]);
      Axios.post(process.env.REACT_APP_HOST_URL +'/board/insert/', frmData)
      .then(
          res =>{
            console.log(res.data);
            alert("등록되었습니다.");
			      history('/board2');
          } 
      );
      
    }

    const onChangeSummer=(contents)=>{
      console.log('onChange', contents);
    }

  
    return (
      <div>
        <form name="myform" onSubmit={onSubmit}  encType="multipart/form-data">
              <div className="form-group">    
                  <label>제목:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={title}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>이름: </label>
                  <input type="text" 
                    className="form-control"
                    name="writer"
                    value={writer}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>내용: </label>
                  <input type="text"
                    name="contents" 
                    className="form-control"
                    value={contents}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>파일: </label>
                  <input type="file"
                    name="filename" 
                    className="form-control"
                    value={filename}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <input type="submit" value="등록 " className="btn btn-primary"/>
              </div>
          </form>

        <div  style={{ marginTop: 20 }}>
          <b>값: </b>
          {title} <br/>
          {writer} <br/>
          {contents} <br/>
        </div>
      </div>
    );
  }

export default BoardWrite2;
