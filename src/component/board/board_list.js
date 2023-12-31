
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import {  Link } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";

function BoardList( ){
     const [board, setBoard] = useState([])
     const [page, setPage] = useState(0);
     const [totalCnt, setTotalCnt] = useState(0);
     const [loading, setLoading]=useState(false);
     const [flag, setFlag] = useState(false);
    
          /*
         useEffect( function, deps )
        - function : 수행하고자 하는 작업
        - deps : 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열
        화면불러올때 이 부분이 호출된다. 
        */
        
        // setBoard(
        //    ...board,
        //    [
        //      {id:1, title:"제목1", writer:"홍길동1", contents:"내용을 막 넣자1"},
        //      {id:2, title:"제목2", writer:"홍길동2", contents:"내용을 막 넣자2"},
        //      {id:3, title:"제목3", writer:"홍길동3", contents:"내용을 막 넣자3"},
        //      {id:4, title:"제목4", writer:"홍길동4", contents:"내용을 막 넣자4"},
        //      {id:5, title:"제목5", writer:"홍길동5", contents:"내용을 막 넣자5"}
        //   ]
        // );

      const loadData = async () => {
        setLoading(false);
        console.log(process.env );
        const res = await Axios.get(process.env.REACT_APP_HOST_URL  + '/board/list/'+page);
        
        console.log(res.data);
        setTotalCnt(res.data.totalCnt);
        setBoard(res.data.list.content);
        setLoading(true);
      }

      const itemDelete=()=>{
        setFlag(!flag);
      }


     useEffect( ()=>
     {
        loadData();
      }, [page, flag]);
  
      const handlePageChange = (page) => {
        setPage(page-1);
      };
      
      return (
        <div>
          <h3 align="center">***** 게시판 목록(수정)  ******</h3>
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
                        return <TableRow obj={object} key={i} totalCnt={totalCnt} itemDelete={itemDelete}/>
                    }):""
                 }                                                               
            </tbody>
          </table>

          <Pagination
            activePage={page}
            itemsCountPerPage={3}
            totalItemsCount={totalCnt}
            pageRangeDisplayed={3}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
          <Link className="btn btn-danger" to="/board/write">글쓰기</Link>
          
        </div>
      );
}


export default BoardList;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/