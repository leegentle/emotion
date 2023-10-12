import { useState } from "react";
import "./global.css";
import { Progress } from "antd";
import "antd/dist/antd.css";
import postApi from "../api/api";

const App = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState({
    data: [],
    level: "",
    score: 0,
  });

  const TITLE_COLOR = "#686A6C";
  const SUB_TITLE_COLOR = "#aeaeae";
  const PRIMART_COLOR = "#54B095";

  const feelList = ["기쁨", "불안", "우울", "당황", "상처", "분노"];

  const emotion = (valList: number[]) => {
    const maxValue = Math.max.apply(null, valList);
    const idx = valList.findIndex((el) => el === maxValue);
    return feelList[idx];
  };

  const start = async () => {
    const body = {
      sentence: input,
    };
    const { data }: any = await postApi(body);
    console.log(data);
    setData(data);
  };

  return (
    <div id="wrap">
      <header className={`text-center pt-16`}>
        <h1 className={`bold text-4xl text-[${TITLE_COLOR}]`}>
          AI 텍스트 마이닝 솔루션
        </h1>
        <h2 className={`text-xl text-[${SUB_TITLE_COLOR}]`}>
          Mental Health Care Services
        </h2>
      </header>
      <div className={`max-w-5xl mx-auto my-0 pt-14`}>
        {/* 진단데이터 입력 */}
        <div>
          <div>
            <h1 className={`text-[${TITLE_COLOR}] text-2xl`}>텍스트 입력</h1>
            <textarea
              style={{ minHeight: "280px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full border-[${PRIMART_COLOR}] border-2 resize-none p-2 text-xl rounded-lg`}
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

        <div>
          <h1 className={`text-2xl text-[${TITLE_COLOR}]`}>분석 결과</h1>
          <div className="flex justify-between mt-10">
            {feelList.map((el, idx) => (
              <div>
                <h2 className="text-xl text-center">{el}</h2>
                <Progress type="circle" percent={data.data[idx] * 100} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className={`text-2xl mt-10 text-[${TITLE_COLOR}]`}>
            당신은{emotion(data.data)}
          </h1>
          <div className="flex justify-between mt-10">
            {data.score !== 0 && (
              <>
                {data.level}
                {data.score}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
