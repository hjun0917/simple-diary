import React, { useEffect, useState } from "react";

const LifeCycle = () => {
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // useEffect(() => {
  //   console.log("Mount!");
  // }, []); // 의존성 배열을 빈 배열로 전달하면 Mount를 제어

  // useEffect(() => {
  //   console.log("Update!");
  // }); // 의존성 배열을 전달하지 않으면 Update를 제어

  // useEffect(() => {
  //   console.log("Count Update!");
  //   if (count > 5) {
  //     alert("count가 5가 넘었습니다. 따라서 1로 초기화합니다.");
  //     setCount(1);
  //   }
  // }, [count]); // 의존성 배열에 명시를 해주면 해당 Update를 제어

  // useEffect(() => {
  //   console.log("Text Update!");
  // }, [text]);

  const [isVisible, setIsvisible] = useState(false);
  const toggle = () => setIsvisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div> */}
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />} {/* 단락 회로 평가 */}
    </div>
  );
};

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");
    return () => {
      console.log("Unmount!");
    }; // 리턴하는 함수는 Unmount 시점에 호출이 된다!!!
  }, []);
  return <div>Unmount Testing Component</div>;
};

export default LifeCycle;
