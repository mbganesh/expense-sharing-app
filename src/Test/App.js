import { useState } from "react";
import "./App.css";

function App() {
  const img1 =
    "https://images.unsplash.com/photo-1702923828891-05493a94c2ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNTUxMjAwOQ&ixlib=rb-4.0.3&q=80&w=1080";

   const [mark , setMark] =  useState('')

  return (
    <div>
      <div style={{ display: "flex", border:'3px solid grey' , borderRadius:'5px' , maxWidth:'400px' , padding: "3px", margin: "5px" }}>
        <div 
        style={{ position:'relative'}}
        >
            {
         mark && <p style={{left:15 , bottom:10 , fontSize:'95px'   , color:'red' , fontWeight:'bolder' , fontFamily:'Schoolbell' , position:'absolute'}}>{mark}</p>

            }
          <img  loading="lazy" width={'100%'} height={'400px'} alt="2 marks" src={img1} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: 3,
            padding: "3px", margin: "5px"
          }}
        >
          <button onClick={() => setMark('1/2')}>1/2</button>
          <button onClick={() => setMark('1')}>1</button>
          <button onClick={() => setMark('1 1/2')}>1 1/2</button>
          <button onClick={() => setMark('2')}>2</button>
          <button>✔️</button>
          <button>❌</button>
        </div>
      </div>


      
    </div>
  );
}

export default App;
