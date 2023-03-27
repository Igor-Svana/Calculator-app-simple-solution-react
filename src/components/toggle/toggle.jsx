import { Theme } from "../../themes/themes";
import './toggle.css';

const Toggle = ({setTheme, theme}) => {
    return(
        <div className='toggle-container'>
            <p>Theme</p>
            <div className='toggle' style={{background: theme.toggle_bg}}>
              <div className='dot-container' id="dot-container-1" onClick={() => setTheme(Theme.dark_blue)}>
                <label className="dot-label" htmlFor="dot-container-1">1</label>
              <span className='dot'style={{background: theme.toogle_color, visibility: theme !==Theme.dark_blue &&  'hidden'}} ></span>
              </div>
              <div className='dot-container' id="dot-container-2" onClick={() =>setTheme(Theme.light_gray)}>
              <label className="dot-label" htmlFor="dot-container-2">2</label>
              <span className='dot'style={{background: theme.toogle_color, visibility: theme !==Theme.light_gray &&  'hidden'}}></span>
              </div> 
              <div className='dot-container' id="dot-container-3" onClick={() => setTheme(Theme.dark_violet)}>
              <label className="dot-label" htmlFor="dot-container-3">3</label>
              <span className='dot'style={{background: theme.toogle_color, visibility: theme !==Theme.dark_violet &&  'hidden'}} ></span>
              </div>             
            </div>
        </div> 
    )
}

export default Toggle;