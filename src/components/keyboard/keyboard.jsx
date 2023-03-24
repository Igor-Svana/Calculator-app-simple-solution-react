import "./keyboard.css";
import { useEffect, useState} from "react";
const keys = ["7", "8", "9", "DEL", "4", "5", "6", "+", "1", "2", "3", "-", ".", "0", "/", "*", "RESET", "="]

const Keyboard = ({ theme, screenNumber }) => {

    const [firstNum, setFirstNum] = useState(0)
    const [secondNum, setSecondNum] = useState(0)
    const [operator, setOperator] = useState(null)
    const [backupOperator, setBackupOperator] = useState(null)
    const [backupSecondNum, setBackupSecondNum] = useState(0)

    const mathFunction = (op) => {
        let mathFunc = `${parseFloat(firstNum !==null ? firstNum : "0")} ${operator!== null ? operator : backupOperator} ${parseFloat((secondNum !==0 && secondNum !=null) ? secondNum : backupSecondNum)}`
            setFirstNum(eval(mathFunc).toString().slice(0,12))
            if(op==null){
              if(secondNum!=null && secondNum!=0)setBackupSecondNum(secondNum)
            }else if( op !=null) {
              setBackupSecondNum(eval(mathFunc).toString().slice(0,12))
            }
            if(operator != null)setBackupOperator(operator)
            setSecondNum(0)
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
              if(secondNum===null){
                 setFirstNum(key), setSecondNum("0")
                return;
                }
              setFirstNum(firstNum+key)
            }else{
            
              if(secondNum === null){
                 setSecondNum(key)
                 return
                }
              setSecondNum(secondNum+key)
            }
        }else if(key==="RESET" || key==="Delete"){
            setFirstNum(0)
            setSecondNum(0)
            setBackupSecondNum(0)
            setOperator(null)
            setBackupOperator(null)
         
        }else if(key==="="){
            mathFunction(null)
            setOperator(null)
            setSecondNum(null)
            
        }else if(key==="DEL" || key==="Backspace") {
            if(secondNum!=0){
                if(secondNum.length ===1){
                  setSecondNum("0")
                    return
                }
                setSecondNum(secondNum.slice(0,-1))
            }else if(firstNum!=0){
                if(firstNum.length ===1){
                  setFirstNum("0")
                    return
                }
                setFirstNum(firstNum.slice(0,-1))
            }
        }
        else{
          if(operator!=backupOperator)setBackupSecondNum(firstNum)
            if(firstNum != 0 && secondNum != 0 && secondNum !=null && operator != null )mathFunction('operator')
            setOperator(key)
        }
    }

    useEffect(() => {
      screenNumber(parseFloat(secondNum !==null && secondNum))
       }, [secondNum])
    useEffect(() => {
        screenNumber(parseFloat(firstNum!==null && firstNum))
      }, [firstNum])
  
  return (
    <div className="keyboard-container" >
      <div className="keyboard-grid" style={{ background: theme.toggle_bg }} >
        {keys.map((key) => {
          return (
            <button
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
