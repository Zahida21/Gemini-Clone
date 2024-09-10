import { createContext, useState } from "react";
import runchat from "../config/gemini";

export const Context= createContext();

const ContextProvider=(props) =>{

const [input,setInput]=useState("");
    const [recentprompt,setRecentprompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");

    const delayPara=(index,nextword)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextword)

        },75*index);

    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
        
    }

    const onSent=async(prompt)=>{

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){
            response=await runchat(prompt);
            setRecentprompt(prompt)

        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentprompt(input)
          response =  await runchat(input) 
        }
    
     let responseArray = response.split("**");
     let newResponse="";
     for(let i=0; i<responseArray.length;i++){
        if(i===0||i%2!==1){
            newResponse += responseArray[i]
        }
        else{
            newResponse += "<b>"+responseArray[i]+"</b>"
        }
     }
     let newResponse2 = newResponse.split("*").join("</br>");
    //  setResultData(newResponse2) the result without typing effect
    let newResponseArray = newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
        const nextword= newResponseArray[i];
        delayPara(i,nextword+" ")
    }
     setLoading(false);
     setInput("");

    }

    
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentprompt,
        recentprompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider