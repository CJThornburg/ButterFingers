import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from "recharts"




function ResultsGraph({ relevantScores }) {

  console.log("rel on RG comp", relevantScores)




  // if (relevantScores.len <3 ) {
  //     return (<div className="PP-noGraph-div HFont"> <h1 className="st">User has not ran enough tests to generate graph :( </h1></div>)
  // }

  const customFontFamily = "'Lexend Deca', sans-serif";
  const axisLabelStyle = {
    fontSize: "2vh", // Adjust font size as needed
    fontWeight: "normal", // Adjust font weight as needed
    fontFamily: customFontFamily, // Specify desired font family
  };



  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={relevantScores}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
              <stop offset="0%" stopColor="#E2B714" stopOpacity={0.5} ></stop>
              <stop offset="75%" stopColor="#E2B714" stopOpacity={0.08} ></stop>
            </linearGradient>
          </defs>

          <Area dataKey="kpm" stroke="#E2B714" fill="url(#color)" />

          <XAxis dataKey="createdAt" axisLine={false} tickLine={false} tick={{ fontSize: "1.2vh", fontFamily: customFontFamily }} tickFormatter={(num => num.substr(0, 11))} label={{ value: "Test Date", position: "insideBottom", offset: -5, style: axisLabelStyle }}
            interval={Math.ceil(relevantScores.length / 10)}
          />

          <YAxis dataKey="kpm" axisLine={false} tickLine={false} label={{ value: "KSPM", position: "insideLeft", angle: -90, style: axisLabelStyle, }} />

          <Tooltip contentStyle={{ backgroundColor: "#323437", color: "#D1D0C5", "borderColor": "#E2B714", "border-radius": "10px" }} />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>


    </>
  );
}

export default ResultsGraph;
