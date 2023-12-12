/* global kakao */
// 위 주석 반드시 써줘야만 된다. 
//url 도 등록하도록 바뀌었음
//autoload=false 무조건 해야 에러 안난다
import React, { useEffect, useState, useRef } from "react";


export default function KakaoMap(props) {
  const { markerPositions, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    document.head.appendChild(script);
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4a91df601c49b1bcb79ec787a4408dd1&autoload=false";
        

    script.onload = () => {
      
      kakao.maps.load(() => {
       
        console.log( kakao.maps.LatLng );
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3
        };
        const map = new kakao.maps.Map(container.current, options);
        //setMapCenter(center);
        setKakaoMap(map);
       
      });

     

    };
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    const [width, height] = size;
    container.current.style.width = `${width}px`;
    container.current.style.height = `${height}px`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap, size]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    const positions = markerPositions.map(pos => new kakao.maps.LatLng(...pos));

    setMarkers(markers => {
      // clear prev markers
      markers.forEach(marker => marker.setMap(null));

      // assign new markers
      return positions.map(
        position => new kakao.maps.Marker({ map: kakaoMap, position })
      );
    });

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
      );

      kakaoMap.setBounds(bounds);
    }
  }, [kakaoMap, markerPositions]);

  return <div id="container" ref={container} />;
}