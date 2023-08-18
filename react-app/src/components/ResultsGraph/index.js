import {ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts"




function ResultsGraph({relevantScores}) {

    console.log("rel on RG comp", relevantScores )
    return (
      <>
       <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={relevantScores}>
            <Area dataKey="kpm"/>
            <XAxis dataKey="createdAt"/>
            <YAxis dataKey="kpm"/>
            <Tooltip/>
        </AreaChart>
       </ResponsiveContainer>


      </>
    );
  }

  export default ResultsGraph;
