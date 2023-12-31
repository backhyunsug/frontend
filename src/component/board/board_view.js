
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";

function BoardView(props, {match} ){

    let history = useNavigate ();
    let { id } = useParams();

    const [inputs, setInputs] = useState({
      id:'',
      title: '',
      writer: '',
      contents:'',
      filename:'',
      image_url:''
    });
  
    const { title, writer,contents  } = inputs; // 비구조화 할당을 통해 값 추출
  
    const onChange = (e) => {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };
  
    useEffect(() => { 
       
       
       console.log( id );

       Axios.get(process.env.REACT_APP_HOST_URL+`/board/view/${id}`)
            .then(
              res => {
                  console.log(res.data);  //f12 눌러서 확인하기 
                  setInputs({
                    id:id,
                    title: res.data.title,
                    writer: res.data.writer,
                    contents:res.data.contents,
                    filename:res.data.filename,
                    image_url:res.data.image_url,
                  });
              }
            );

      //console.log( heroState.hero );
    }, []);

    const onSubmit=(e)=> {
      e.preventDefault();
      var frmData = new FormData(); 
      frmData.append("id", inputs.id);
      frmData.append("title", inputs.title);
      frmData.append("writer", inputs.writer);
      frmData.append("contents", inputs.contents);

      console.log( document.myform.filename.files );
      
      frmData.append("file", document.myform.filename.files[0]);
      
      Axios.post(process.env.REACT_APP_HOST_URL +'/board/update/', frmData)
           .then(
			res => {
				console.log(res.data);
				history('/board');
			}
		  )
		  .catch(error=>{ console.log(error); });
     
    }
  
    return (
      <div>
        <form name="myform" onSubmit={onSubmit}>
              <div className="form-group">    
                  <label>제목:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={inputs.title}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>이름: </label>
                  <input type="text" 
                    className="form-control"
                    name="writer"
                    value={inputs.writer}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>내용: </label>
                  <input type="text"
                    name="contents" 
                    className="form-control"
                    value={inputs.contents}
                    onChange={onChange}
                    />
              </div>
              <div className="form-group">
                  <label>file: </label>
                  <input type="file"
                    name="filename" 
                    className="form-control"
                    onChange={onChange}
                    />
                  <img src={inputs.image_url} alt={inputs.filename}/>

              </div>
              
              <div className="form-group">
                  <input type="submit" value="등록 " className="btn btn-primary"/>
              </div>
          </form>

        
      </div>
    );
  }

export default BoardView;
