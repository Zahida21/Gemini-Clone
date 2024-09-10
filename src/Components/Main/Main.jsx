import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
import './Main.css';
import React, { useContext } from 'react'

const Main = () => {

    const {onSent,recentprompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  return (
    <div className='main' >
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">

        {!showResult?<>
            <div className="greet">
                <p><span>Hello, Fathima.</span></p>
                <p>How can I help you today?</p>
            </div>
        
            <div className="cards">
                <div className="card">
                    <p>Suggest an organized list of the best food spots in a city</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                
                <div className="card">
                    <p>Give me a beginner's guide to an activity</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Create a travel itinerary for a city</p>
                    <img src={assets.message_icon} alt="" />
                </div>

                <div className="card">
                    <p>improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
                
            </div>
        
        </>
    :<div className='result'>
        <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentprompt}</p>
        </div>
        <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading?<div className='loader'>
                <hr />
                <hr />
                <hr />
            </div>:
             <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
           
        </div>
    </div>    
    }

            

        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                  {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null} 
                    
                </div>
            </div>
            <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
        </div>
      
    </div>
  )
}

export default Main
