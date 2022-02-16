import * as React from 'react';
import styles from '../stylesheets/style.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container,Row, Col } from 'react-bootstrap';
import {MarsCalendar} from '../shared/MarsCalendar.ts';



export interface ICountOpenCloseComponent {
    debug:boolean;
    isAdmin:boolean;
    testEnvironment:boolean;
    quarterEndOverrideVal:boolean;
    countOverride:boolean;
}


export const useNewTimer = (currentDate:Date):Date => {
    const [date, setDate] = React.useState(currentDate);
    
    React.useEffect(() => {
    var timerID = setInterval( () => tick(), 1000 );
    return () => {
        clearInterval(timerID);
        };
    });
    
    function tick() {
        setDate(new Date());
    }
    
    return date;
};

    export const CountOpenCloseComponent:React.FunctionComponent<ICountOpenCloseComponent> = (props) => {
        const timer = useNewTimer(new Date());

/*        let newDate = new Date() ;
  
        let ReturnFiscalStartDate = MarsCalendar.ReturnFiscalStartDate(2021);
        let IsCountOpen = MarsCalendar.IstheCountOpen(newDate,true);
        console.log("CountOpenCloseComponent => ReturnFiscalStartDate : ",ReturnFiscalStartDate);
        console.log("CountOpenCloseComponent => IsCountOpen : ",IsCountOpen);

        let quarter = MarsCalendar.ReturnFiscalQuarter(newDate);
        console.log("CountOpenCloseComponent => ReturnFiscalQuarter : ",quarter);

        let year = MarsCalendar.ReturnFiscalYear(newDate);
        console.log("CountOpenCloseComponent => ReturnFiscalYear : ",year);

        let ReturnFiscalQuarterEnd = MarsCalendar.ReturnFiscalQuarterEnd(year, quarter);
        console.log("CountOpenCloseComponent => ReturnFiscalQuarterEnd : ",ReturnFiscalQuarterEnd);

        let CountYear = MarsCalendar.GetCountYear(newDate,true);
        console.log("CountOpenCloseComponent => CountYear : ",CountYear);

        let HowLongUntiltheCountEnds = MarsCalendar.HowLongUntiltheCountEnds(newDate,true,false);
        console.log("CountOpenCloseComponent => HowLongUntiltheCountEnds : ",HowLongUntiltheCountEnds);

        let HowLongUntiltheCountBegins = MarsCalendar.HowLongUntiltheCountBegins(newDate,true);
        console.log("CountOpenCloseComponent => HowLongUntiltheCountBegins : ",HowLongUntiltheCountBegins);
*/

        let nextCountEvent = MarsCalendar.ReturnNextCountDateEvent(new Date(),true,-2);
        if(props.debug){
            console.log("CountOpenCloseComponent => nextCountEvent : ",nextCountEvent);
            console.log("CountOpenCloseComponent => typeof(nextCountEvent) : ",typeof(nextCountEvent));
        }
        

        let thisCountDateObj = MarsCalendar.ReturnCountObject(timer, props.debug,props.quarterEndOverrideVal);
        /*if(props.debug){
            BanfieldUtilities.writeToConsole('CountOpenCloseComponent() ',' thisCountDateObj  ',thisCountDateObj);
        } */
            
        let days, hours, minutes, seconds, openBool;

        if(thisCountDateObj && 
            thisCountDateObj.CountQuarter && 
            thisCountDateObj.CountYear ){//&& thisCountDateObj.IsCountOpen){

            //If count is open
            if(((thisCountDateObj.IsCountOpen && thisCountDateObj.IsCountOpen === true) || props.countOverride ) && thisCountDateObj.HowLongUntiltheCountEnds ){
                openBool=true;
                days = thisCountDateObj.HowLongUntiltheCountEnds.split(":")[0];
                hours = thisCountDateObj.HowLongUntiltheCountEnds.split(":")[1];
                minutes = thisCountDateObj.HowLongUntiltheCountEnds.split(":")[2];
            }
        
            //If count is closed
            else {//if(thisCountDateObj.HowLongUntiltheCountBegins){
                
                openBool=false;
                let countBegginsSplit1 = thisCountDateObj.HowLongUntiltheCountBegins ? thisCountDateObj.HowLongUntiltheCountBegins.split(".") : ['invalid','invalid:invalid'];
                let countBegginsSplit2 = thisCountDateObj.HowLongUntiltheCountBegins ? thisCountDateObj.HowLongUntiltheCountBegins.split(":") : ['invalid','invalid','invalid'];

                days = countBegginsSplit1[0];
                hours = countBegginsSplit1[1].split(":")[0];
                minutes = countBegginsSplit2[1];
                seconds = countBegginsSplit2[2];
            }
        }
        return <Container >
{/*}            <Row>
                <Col xs={8}>{ props.isAdmin ? <span style={{color:"red"}}>Admin</span> : null }</Col>
                <Col xs={4}>{ props.debug ? <span style={{color:"orange"}}>Debug</span> : null }</Col>
            </Row> */}
            <Row>
                <Col xs={12}>
                    { openBool ?
                        <div> The count for Q{props.quarterEndOverrideVal ? thisCountDateObj.NextCountQuarter : thisCountDateObj.CountQuarter }, {thisCountDateObj.CountYear} is open.   The count for Q{props.quarterEndOverrideVal ? thisCountDateObj.NextCountQuarter : thisCountDateObj.CountQuarter} will close in {days} days, {hours} hours, {minutes ? parseInt(minutes) : null } minutes. </div>  :
                        <span><div> The count for Q{thisCountDateObj.CountQuarter}, {thisCountDateObj.CountYear} is closed.</div><div>   The count for Q{thisCountDateObj.NextCountQuarter} will open in</div>
                        <div> {days} days, </div><div>{hours} hours,</div><div> {minutes} minutes and </div><div> {seconds} seconds. </div></span>
                    }
                </Col>
            </Row>
            {
                props.debug ? 
                <Row>
                    <Col xs={12}>
                        { openBool ?
                            <div> The count opens on {(nextCountEvent as Date).getDate()} </div>
                          :
                          <div> The count opens on {new Date(nextCountEvent).toDateString() } at {new Date(nextCountEvent).toLocaleTimeString() } </div>
                        }
                    </Col>
                </Row> : null
            }
        </Container>;
    };
