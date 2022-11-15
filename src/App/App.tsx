import { useState } from "react";
import "./global.css";
import { Progress } from "antd";
import "antd/dist/antd.css";
import postApi from "../api/api";

const App = () => {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);

  const title = "#686A6C";
  const sub_title = "#aeaeae";
  const primary = "#54B095";
  // const result = [
  //   [0, 0, 0, 0, 0, 0],
  //   [83.91, 3.65, 0.93, 0.78, 1.79, 8.95],
  //   [0, 99.99, 0, 0, 0, 0],
  //   [99.98, 0, 0, 0.01, 0.01, 0],
  //   [0, 0, 0, 0, 0, 99.99],
  //   [99.98, 0, 0, 0, 0.01, 0],
  // ];
  const result = [
    [0, 0, 0, 0, 0, 0],
    [0, 99.99, 0, 0, 0, 0],
    [83.91, 3.65, 0.93, 0.78, 1.79, 8.95],
    [99.98, 0, 0, 0.01, 0.01, 0],
    [99.98, 0, 0, 0, 0.01, 0],
    [0, 0, 0, 0, 0, 99.99],
    [3.56, 77.81, 18.39, 0.02, 0.05, 0.18],
    [0.05, 0.02, 93.46, 0.05, 6.38, 0.04],
    [43.13, 56.53, 0.11, 0.18, 0.01, 0.04],
    [0.04, 0.08, 15.96, 63.23, 20.64, 0.05],
    [0.02, 85.86, 0.07, 0.3, 13.73, 0.02],
  ];

  const feelList = ["기쁨", "불안", "우울", "당황", "상처", "분노"];

  const start = async () => {
    const body = {
      sentence: input,
    };
    const { data }: any = await postApi(body);
    console.log(data);
  };

  return (
    <div id="wrap">
      <header className={`text-center pt-16`}>
        <h1 className={`bold text-4xl text-[${title}]`}>
          AI 텍스트 마이닝 솔루션
        </h1>
        <h2 className={`text-xl text-[${sub_title}]`}>
          Mental Health Care Services
        </h2>
      </header>
      <div className={`max-w-5xl mx-auto my-0 pt-14`}>
        {/* 진단데이터 입력 */}
        <div>
          <div>
            <h1 className={`text-[${title}] text-2xl`}>텍스트 입력</h1>
            <textarea
              style={{ minHeight: "280px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full border-[${primary}] border-2 resize-none p-2 text-xl rounded-lg`}
              name=""
              id=""
            />
          </div>
          <div className={`text-right`}>
            <button
              onClick={start}
              className={`px-16 py-3 border-2 rounded-lg border-white text-white`}
            >
              분석하기
            </button>
          </div>
        </div>
        <hr className="my-8" />
        {/* 결과데이터 */}

        {count > -1 && (
          <div>
            <h1 className={`text-2xl text-[${title}]`}>분석 결과</h1>
            <div className="flex justify-between mt-10">
              {feelList.map((el, idx) => (
                <div>
                  <h2 className="text-xl text-center">{el}</h2>
                  <Progress type="circle" percent={result[count][idx]} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
