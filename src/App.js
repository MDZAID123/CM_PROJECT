
import './App.css';

import gptLogo from './assets/chatgpt.svg';


import addBtn from './assets/add-30.png';

import msgIcon from './assets/message.svg';
import ic from './assets/ic2.jpg';

import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';

import sendBtn from './assets/send.svg';

import userIcon from './assets/user-icon2.jpg';


import gptImgLogo from './assets/chatgptLogo.svg';

import drc2 from './assets/drc2.jpg';
import {sendMsgToDoctorGPT} from '../src/openai';
import { useEffect, useRef, useState } from 'react';

function App() {


  const msgEnd=useRef(null);

  // text:"Hi ,I am chatgpt a state of the art model to asist",
  // isBot:true,

  const [input,setInput]=useState("");

  const [messages,setMessages]=useState([]);
  //the initial value of the above use state variable is nothing but
  //the initial value is an array of objects

  // note that every message can be an object 
  const handleReload = () => {
    window.location.reload();
  };



  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);

  // dependency array is the second argument of the usestate hoook


  const handleSend=async ()=>{


    const text=input;
    setInput('');

    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res=await sendMsgToDoctorGPT(text);
    //whenever we get the response we will set the messages
    setMessages([
      ...messages,
      {text:text,isBot:false},
      {text:res,isBot:true}
    ]);

    console.log(res);
  }


  const handleEnter=async (e)=>{
    if(e.key === 'Enter') await handleSend();
  }


  const handleQuery=async (e)=>{



    const text=e.target.value;
    setMessages([
      ...messages,
      {text,isBot:false}
    ]);
    const res=await sendMsgToDoctorGPT(text);
    setMessages([
      ...messages,
      {text,isBot:false},
      {text:res,isBot:true}
    ])

  }

  return (
    <div className="App">

      <div className="sideBar">

        <div className="upperSide">
          <div className="upperSideTop "><img  className='mylogo' src={ic} alt="Logo" /><span className="brand">BHARAT CDSS</span></div>
          <button className="midBtn" onClick={handleReload}>
  <img src={addBtn} alt="new chat" className="addBtn" />
  New Consultation
</button>
          <div className="upperSideBottom">

            <button className="query" onClick={handleQuery} value={"what is cancer"}><img src={msgIcon} alt="Query" />what is cancer</button>
            <button className="query" onClick={handleQuery} value={" How to Use an antidepressant"}><img src={msgIcon} alt="Query" /> How to Use an antidepressant</button>

          </div>
          

        </div>
        <div className="lowerSide">

          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          {/* <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Save</div> */}
          {/* <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div> */}

        </div>

      </div>
      <div className="main">

        <div className="chats">
          {/* baic layout of chat contains single image and text side by side  */}
          {/* <div className="chat ">
            <img className='chatImg' src={userIcon} alt="" /><br/> <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam hic enim dicta nam similique, corporis laudantium excepturi. Ratione, nihil unde libero voluptatem aperiam hic magni laudantium nulla veniam sit delectus odio at obcaecati. Praesentium, quam asperiores? Magnam doloribus quidem ratione delectus provident quaerat facere blanditiis quam nobis error vero, id neque, officia suscipit quibusdam illum culpa est? Placeat, necessitatibus quia?</p>

          </div>
          <div className="chat bot">
            <img className='chatImg' src={gptImgLogo} alt="" /> <br/><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam hic enim dicta nam similique, corporis laudantium excepturi. Ratione, nihil unde libero voluptatem aperiam hic magni laudantium nulla veniam sit delectus odio at obcaecati. Praesentium, quam asperiores? Magnam doloribus quidem ratione delectus provident quaerat facere blanditiis quam nobis error vero, id neque, officia suscipit quibusdam illum culpa est? Placeat, necessitatibus quia?</p>

          </div> */}
       
          {messages.map((message,i)=>
            <div key={i} className={message.isBot?"chat bot":"chat"}>
            <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" />
            <br></br>
            <p className="txt">{message.text}</p>

          </div>
          

          )}
          <div ref={msgEnd}/>
          {/* the above is the last message that we have to show */}
       

        </div>

        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Get consulted by BHARAT CDSS' value={input} onKeyDown={handleEnter}
            onChange={(e)=>{setInput(e.target.value)}}/>
            <button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>
            Disclaimer: BHARAT CDSS  may produce inaccurate information about disease as it not an actual doctor

          </p>
          
          

        </div>

      </div>
      
    </div>
  );
}

export default App;
