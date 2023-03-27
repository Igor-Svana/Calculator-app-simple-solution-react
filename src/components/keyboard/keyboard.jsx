import "./keyboard.css";
import { useEffect, useState} from "react";
const keys = ["7", "8", "9", "DEL", "4", "5", "6", "+", "1", "2", "3", "-", ".", "0", "/", "*", "RESET", "="]

const Keyboard = ({ theme, screenNumber }) => {

    const [firstNum, setFirstNum] = useState(null)
    const [secondNum, setSecondNum] = useState(null)
    const [operator, setOperator] = useState(null)
    const [backupEquals, setBackupEquals] = useState(false)
    const [backupSecondNum, setBackupSecondNum] = useState(0)

    const mathFunction = (op) => {
      let mathFunc = `${parseFloat(firstNum===null ? "0" : firstNum)} ${operator!== null && operator } ${parseFloat(secondNum===null ? backupSecondNum : secondNum ) }`
      if(op==="operator")setSecondNum(null), setBackupSecondNum(eval(mathFunc).toString().slice(0,12))
      setFirstNum(eval(mathFunc).toString().slice(0,12))
    }

    const keyFunction = (event) => {
      if(keys.includes(parseFloat(event.key)) || keys.includes(event.key) || event.key==="Enter" || event.key==="Backspace" || event.key==="Delete" ) mathHandler(event.key)
    }

    useEffect(() => {
      window.addEventListener('keydown', keyFunction)
      return () => {
        window.removeEventListener('keydown', keyFunction)
      }
    }, [firstNum, secondNum, operator])

    const mathHandler = (key) => {
    
      if(key==="Enter")key="=";
        if(!isNaN(key) || key==="."){
            if(operator===null){
              if(firstNum==null){
                setFirstNum(key)
                return
              }
              setFirstNum(firstNum+key)
              
            }else{
              if(secondNum==null){
                setSecondNum(key)
                return
              }
              setSecondNum(secondNum+key)
            }
        }else if(key==="RESET" || key==="Delete"){
            setFirstNum(null)
            setSecondNum(null)
            setBackupEquals(false)
            setBackupSecondNum(0)
            setOperator(null)         
        }else if(key==="="){
            mathFunction(null)
            setBackupEquals(true)
                        
        }else if(key==="DEL" || key==="Backspace") {
          if(backupEquals == true){ 
            setSecondNum(null)
            return
          }
            if(secondNum!=null){
                if(secondNum.length ===1){
                  setSecondNum("0")
                    return
                }
                setSecondNum(secondNum.slice(0,-1))
            }else if(firstNum!=null){
                if(firstNum.length ===1){
                  setFirstNum("0")
                    return
                }
                setFirstNum(firstNum.slice(0,-1))
            }
        }
        else{
            if(backupEquals == true)setSecondNum(null)
            setBackupSecondNum(firstNum)
            if(operator!=null && secondNum != null && backupEquals == false)mathFunction('operator')
            setBackupEquals(false)
            setOperator(key)
        }
    }

    useEffect(() => {
      screenNumber(parseFloat(secondNum !==null ? secondNum: firstNum))
       }, [secondNum])
    useEffect(() => {
        screenNumber(parseFloat(firstNum!==null ? firstNum : "0"))
      }, [firstNum])
  
  return (
    <div className="keyboard-container" >
      <div className="keyboard-grid" style={{ background: theme.toggle_bg }} >
        {keys.map((key) => {
          return (
            <button
            key={Math.random()}
              onClick={mathHandler.bind(this, key)}
              className={"key-btn" + (key === "RESET" ? " reset" : "") + (key === "=" ? " equals" : "")}
              style={{boxShadow: ((key === "DEL" || key === "RESET") && `0px 5px ${theme.dark_key_shadow}`) || (key === "=" && `0px 5px ${theme.toogle_shadow_color}`) || ((key !== "DEL" || key !== "RESET" || key !== "=") && `0px 5px ${theme.key_shadow}`),
                color: (key === "DEL" || key === "RESET" || key === "=" ? theme.light_text : theme.dark_text),
                background: ((key === "DEL" || key === "RESET") && theme.darker_key_bg) || (key === "=" && theme.toogle_color) || ((key !== "DEL" || key !== "RESET" || key !== "=") && theme.key_bg)}}
            >
              {key==="*" ? "x" : key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
