
import TableRow2 from './TableRow'
import React, { useState, useEffect} from "react";
import {  Link } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import { useInView } from 'react-intersection-observer';

function BoardList2( ){
     const [board, setBoard] = useState([])
     const [page, setPage] = useState(0);
     const [totalCnt, setTotalCnt] = useState(0);
     const [loading, setLoading]=useState(false);
     const [flag, setFlag] = useState(false);
     const [ref, inView] = useInView(); //관찰자 추가하기 
          /*
         useEffect( function, deps )
        - function : 수행하고자 하는 작업
        - deps : 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열
        화면불러올때 이 부분이 호출된다. 
        */
        
     

      const loadData = async () => {
        setLoading(false);
        //console.log(process.env );
        const res = await Axios.get(process.env.REACT_APP_HOST_URL  + '/board/list/'+page);
        console.log(res.data);
        setTotalCnt(res.data.totalCnt);
        setBoard([...board, ...(res.data.list.content)])
        // 요청 성공 시에 페이지에 1 카운트 해주기
        setPage((page) => page + 1);
        console.log(page);
        setLoading(true);
      }

      const itemDelete=()=>{
        setFlag(!flag);
      }

      useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
            console.log(inView, '무한 스크롤 요청 🎃')
            loadData();
        }
      }, [inView, flag]);
      
  
    
      
      return (
        <div>
          <h3 align="center">게시판 목록</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <colgroup>
              <col width="8%"/>
              <col width="*"/>
              <col width="12%"/>
              <col width="12%"/>
              <col width="12%"/>
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th> 
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
                 {
                  loading==true?
                    board.map(function(object, i){
                        return <TableRow2 obj={object} key={i} totalCnt={totalCnt} itemDelete={itemDelete}/>
                    }):""
                 }                                                               
            </tbody>
          </table>

        
          <Link className="btn btn-danger" to="/board/write">글쓰기</Link>
          <div ref={ref} style={{"marginTop":"200px"}}>CopyWrite</div>
        </div>
      );
}


export default BoardList2;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/