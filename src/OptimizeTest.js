import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";

// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`UPDATE :: TEXT => ${text}`);
//   });
//   return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`UPDATE :: COUNT => ${count}`);
//   });
//   return <div>{count}</div>;
// });

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Counter A update = count : ${count}`); // count의 state가 변화하지않기 때문에 console에 아무런 값도 찍히지 않음.
  });
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`Counter B update = count : ${obj.count}`);
    // console에 값이 찍히지 않을 것으로 예상하였지만, obj.count가 계속 찍힘.
    // 객체(비원시 타입)에 대해 얕은 비교(값에 의한 비교가 아닌, 주소에 의한 비교)를 하기 때문이다.
  });
  return <div>{obj.count}</div>;
};

const areEqual = (preProps, nextProps) => {
  // if (preProps.obj.count === nextProps.obj.count) {
  //   return true; // 이전 프롭스와 현재 프롭스가 같다. -> 리렌더링 X
  // } else {
  //   return false; // return false; // 다르다. -> 리렌더링 O
  // }
  return preProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  // const [count, setCount] = useState(1);
  // const [text, setText] = useState("");

  // return (
  //   <div style={{ padding: 50 }}>
  //     <div>
  //       <h2>count</h2>
  //       <button onClick={() => setCount(count + 1)}>+</button>
  //       <CountView count={count} />
  //     </div>
  //     <div>
  //       <h2>text</h2>
  //       <input value={text} onChange={(e) => setText(e.target.value)} />
  //       <TextView text={text} />
  //     </div>
  //   </div>
  // );

  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
