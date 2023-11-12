import "./App.css";
import React, {
  useReducer,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date: created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => action.targetId !== it.id);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

const App = () => {
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    // console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // Math.floor() => 소수점 아래의 수를 버려주는 함수
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
    // dispatch는 함수형 업데이트가 필요없이 호출하면 알아서 현재의 state를 reduce가 참조하여 동작한다.
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        author,
        content,
        emotion,
        id: dataId.current,
      },
    });

    dataId.current += 1;
    // setData([newItem, ...data]);
    // setData((data) => [newItem, ...data]); // 함수형 업데이트, 최신의 state를 함수의 인자를 통해 참고할 수 있게 된다.
  }, []); // oncreate 함수는 컴포넌트가 mount될 때, 한 번만 생성되기 때문에, 당시 데이터 state의 값을 기억하고 있기 때문이다. => 현재의 경우 []

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.floor((goodCount / data.length) * 100);
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // [] 배열로 넘겨주는 인자가 변화할 때만 useMemo의 첫번째 인자로 전달한 Callback 함수가 실행

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <span style={{ fontSize: "10px" }}>
        소수점 아래의 숫자는 표기되지 않습니다.
      </span>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
};

export default App;
