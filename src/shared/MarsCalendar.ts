//var { DateTime } = require('luxon');
const { DateTime } = require("luxon");
//import {BanfieldUtilities} from './BanfieldUtilities';

export namespace MarsCalendar {

    export function ReturnFiscalYear(date:Date):number{// date obj
        let result = 0;
        let currentYear = date.getFullYear();
        let currentMonth = (date.getMonth() );
        if ((date.getMonth()+1) > 1 && (date.getMonth()+1) < 12)
        {
            // If the month isn't the beginning or end of the year, the fiscal year is always
            // equal to the year of the date passed to the function.
            result = currentYear;
        }
        else
        {
            // We have to handle January and December differently.
            if (currentMonth === 12)
            {
                // December can mark the end of the fiscal year or the beginning of the next
                // fiscal year.
                let nextStart = ReturnFiscalStartDate(currentYear + 1);
                if (date >= nextStart)
                {
                    result = currentYear + 1;
                }
                else
                {
                    result = currentYear;
                }
            }
            else
            {
                // January can mark the end of the fiscal year or the beginning of the next 
                // fiscal year.
                let currentStart = ReturnFiscalStartDate(currentYear);
                if (date >= currentStart)
                {
                    result = currentYear;
                }
                else
                {
                    result = currentYear - 1;
                }
            }
        }
        
        return result;
    }

    export function  ReturnFiscalPeriod( date:Date):number {// date obj
        let dateYear = date.getFullYear();
        let workingDate = new Date();


        if ((date.getMonth() + 1) > 1 && (date.getMonth()+1) < 12)
        {
            workingDate = ReturnFiscalStartDate(dateYear);
        }
        else if ((date.getMonth()+1) === 12)
        {
            if (date >= ReturnFiscalQuarterEnd(dateYear, 4))
            {
                // This date is in the next quarter. The working date needs
                // to be the first day of the next fiscal year.
                workingDate = ReturnFiscalStartDate(dateYear + 1);
            }
            else
            {
                // Otherwise, this day falls within the current fiscal year.
                workingDate = ReturnFiscalStartDate(dateYear);
            }
        }
        else
        {
            // It's January.
            if (date >= ReturnFiscalStartDate(dateYear))
            {
                workingDate = ReturnFiscalStartDate(dateYear);
            }
            else
            {
                // This day is part of the previous fiscal year.
                workingDate = ReturnFiscalStartDate(dateYear - 1);
            }
        }

        let week = 1;
        let period = 1;
        let tempDate = new Date(workingDate.getFullYear(), (workingDate.getMonth()), workingDate.getDate()+6) ;
        let endOfWeek = new Date(tempDate.getFullYear(), (tempDate.getMonth()), tempDate.getDate(), 23, 59, 59);

        while (date > endOfWeek)
        {
            // Add one more day to get the start of the next week.
            workingDate = new Date(endOfWeek.getFullYear(), (endOfWeek.getMonth()), endOfWeek.getDate() +1);
            week++;

            // Each period is equal to four weeks or 28 days.
            if (week > 4)
            {
                // Once we exceed four weeks increment the period and reset our week counter.
                period++;
                if (period <= 13)
                {
                    week = 1;
                }
                else
                {
                    // Period 13 can actually have 5 weeks sometimes, which breaks our nifty
                    // 4 weeks = 1 period heuristic and allow our period count to exceed 13. If this happens, cap the period
                    // at 13 and exit the loop.
                    period = 13;
                    break;
                }
            }
            // Now recalculate the end of the week so we don't accidentally overshoot into the following week if
            // the date passed to the function is greater than the last endOfWeek calculation.
            //endOfWeek = workingDate.AddDays(6);
            tempDate = new Date(workingDate.getFullYear(), (workingDate.getMonth()), workingDate.getDate() +6);
            endOfWeek = new Date(tempDate.getFullYear(), (tempDate.getMonth()), tempDate.getDate(), 23, 59, 59);
        }
        return period;
    }

    export function  ReturnFiscalQuarter( date:Date):number  {// date obj
        
        let result = 0;
        let period = ReturnFiscalPeriod(date);

        // We have four quarters broken up into 3-periods (mostly; the fourth quarter can have more) so we don't have to do anything
        // fancy here.  Just check the period returned from ReturnFiscalPeriod with a simple if-then-else. block;
        if (period <= 3)
        {
            result = 1;
        }
        else if (period <= 6)
        {
            result = 2;
        }
        else if (period <= 9)
        {
            result = 3;
        }
        else
        {
            result = 4;
        }

        
        return result;
    }

    ///<remarks>
    /// Author: Serdar N
    /// Date: April 21, 2016 Wed.
    /// 
    /// Modified By: Alan Lampe
    /// Date: 5/10/2016
    /// Added logic to enable developers to bypass the logic through a database setting.
    /// 
    /// Modified By: Alan Lampe
    /// Date: 1/5/2018
    /// Refactored to fix logic errors.  The count was closed prematurely on 12/31/2017 and then reopened automatically on 1/1/2017.
    /// New logic has been tested through the end of 2021.
    /// 
    /// Modified by: Alan Lampe
    /// Date: 3/17/2020
    /// Added logic check to force the Q1, 2020 count to remain closed.  This change is in response to a business decision to
    /// reduce the potential impact of the coronavirus on the health of hospital associates.
    /// 
    /// Modified by: Steve Sclimenti
    /// Date: 2/2021
    /// Added function to this solution/helper class
    /// </remarks>
    /// <summary>
    /// Finance requires the Sharepoint Site to not be allowed access until the Saturday of inventory 
    /// count at 2am which occurs every Saturday of the Quarter the weekend before the Quarter Close. 
    /// Example would befor Q2 the Saturday before the Quarter close would be June 18th 2016_ — Current 
    /// system does have some restrictions but not really its only open for I week. 
    /// </summary>
    /// <param name="time">Takes the client date time.</param>
    /// <returns>Returns true or false wheter count is open or not</returns>
    export function IstheCountOpen(time:Date,debug:boolean):boolean  { // date obj
        let result = false;

        // During development, we cannot wait for the count to be open so we need a way to override
        // this logic without redeploying.
        //let setting = DataHelper.GetCountSetting("DevIgnoreCountOpenEnforcement");
        let ignoreCountEnforcement = false;
        /* if (setting.ToString() != String.Empty)
        {
            ignoreCountEnforcement = Convert.ToBoolean(setting);
        } */
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.IstheCountOpen() ',' time  ',time);
        } */

        if (!ignoreCountEnforcement)
        {
            // First find what quarter they are in
            let quarter = ReturnFiscalQuarter(time);
            let year = ReturnFiscalYear(time); // Always use fiscal year instead of date time year

            if (quarter === 1 && year === 2020)
            {
                // We're forcing the Q1, 2020 count to remain closed.
                result = false;
            }
            else
            {
                let quarterStart = ReturnFiscalQuarterStart(year, quarter);
                let tempDate = new Date(quarterStart.getFullYear(), (quarterStart.getMonth()), quarterStart.getDate()+3);
                let previousCountClose = new Date(tempDate.getFullYear(), (tempDate.getMonth()), tempDate.getDate(), 8, 0, 0);

                if (time < previousCountClose)
                {
                    // We are still counting the previous quarter.
                    result = true;
                }
                else
                {
                    // Find the end of the quarter.
                    let quarterEnd = ReturnFiscalQuarterEnd(year, quarter);

                    // Find the count open time.
                    let countOpenTime =  new Date(quarterEnd.getFullYear(), quarterEnd.getMonth(), quarterEnd.getDate(),quarterEnd.getHours()-22);
                    let countCloseTime = new Date(quarterEnd.getFullYear(), quarterEnd.getMonth(), quarterEnd.getDate()+3);
                    countCloseTime = new Date(countCloseTime.getFullYear(), (countCloseTime.getMonth()),   countCloseTime.getDate(), 8, 0, 0);

                    if (time > countOpenTime  &&  time < countCloseTime) // If the current time is greater than the Count Open Time  AND current time is less than the Cout Close Time
                        result = true;
                }
            }
        }
        else
        {
            result = true;
        }
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.IstheCountOpen() ',' result  ',result);
        }*/
        return result;
    }
    

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 2/25/2015
    /// </remarks>
    /// <summary>
    /// Returns the date and time that the specified period begins in the specified fiscal year.
    /// </summary>
    /// <param name="year">Four-digit integer representing the fiscal year the function should use in its calculation.</param>
    /// <param name="period">Integer betwee 1 and 13 representing the fiscal period the function should use in its calculation</param>
    /// <returns></returns>
    export function   ReturnFiscalPeriodStart ( year:number,  period:number):Date  {
        //if (period >= 1 && period <= 13)        {
            // This is simple control-break processing based on the starting date of 
            // the fiscal year passed through the year function.
            let fiscalStart = ReturnFiscalStartDate(year);
            //let holdDate = fiscalStart;
            let result = fiscalStart;

            // Why don't we process period 1?  Because we've already calculated its start date in the previous statements.
            if (period !== 1)
            {
                // Initialize control variables before we start looping.
                let workingdate = fiscalStart;
                let week = 1;
                let holdPeriod = 1;

                // While the current period count is not equal to the period we were passed.
                while (holdPeriod !== period)
                {
                    // Move the date ahead by seven days, which is the starting date of the next week.
                    // workingdate = workingdate.AddDays(7);
                    workingdate.setDate(workingdate.getDate() + 7);
                    week++;
                    if (week > 4)
                    {
                        holdPeriod++;
                        week = 1;
                        result = workingdate;
                    }
                }
            }
            
            return result;
        /*}
        else
        {
            console.log(`The ReturnFiscalPeriodStart function expects the Period argument to be between 1 and 13.  The value provided ${period} is not valid.`,'color:red;');
        }*/
    }

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 2/25/2015
    /// </remarks>
    /// <summary>
    /// Returns the end date and time (.e.g., 3/30/2016 23:59:59) that the specified period ends within the specified fiscal year.
    /// </summary>
    /// <param name="year">Four-digit integer representing the fiscal year the function should use in its calculation.</param>
    /// <param name="period">Integer betwee 1 and 13 representing the fiscal period the function should use in its calculation</param>
    /// <returns>DateTime representing the first second of the first day in the specified period.</returns>
    export function  ReturnFiscalPeriodEnd (year:number,  period:number) : Date  { //     ---   Returns Date obj
        //if (period >= 1 && period <= 13)        {
            let result = new Date();
            if (period === 13)
            {
                // We're at the end of the year, so we can just look at the start of the next period and subtract one day.
                result = ReturnFiscalPeriodStart(year + 1, 1);
                result.setDate(result.getDate()-1);
                result = new Date(result.getFullYear(), (result.getMonth()), result.getDate(), 23, 59, 59);
            }
            else
            {
                // Otherwise, we're going to add the equivalent of 4 weeks time and return the result.  Period 13 is the only
                // period that can have more than 4 weeks and we've already covered that above.
                result = ReturnFiscalPeriodStart(year, period);
                result.setDate(result.getDate() + 27);
            }
            result = new Date(result.getFullYear(), (result.getMonth()), result.getDate(), 23, 59, 59);
            
            return result;
        /*}
        else
        {
            console.log("The ReturnFiscalPeriodEnd function expects the Period argument to be between 1 and 13.  The value provided {0} is not valid.", period);
        }*/
    }

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 11/12/2015
    /// </remarks>
    /// <summary>
    /// Determines the starting date of a fiscal quarter within a specific fiscal year.
    /// </summary>
    /// <param name="year">The fiscal year the quarter falls within.</param>
    /// <param name="quarter">The fiscal quarter you are interested in.</param>
    /// <returns>
    /// DateTime value representing the first day of the fiscal quarter represented by
    /// the Year and Quarter parameters.
    /// </returns>
    export function  ReturnFiscalQuarterStart  ( year:number, quarter:number) :Date    {
        let result;
        // The first three quarters are comprised of 3 periods.  The fourth quarter can have more
        // but that doesn't impact the starting date.
        
        switch (quarter)
        {
            case 1:
                result = ReturnFiscalPeriodStart(year, 1);
                break;
            case 2:
                result = ReturnFiscalPeriodStart(year, 4);
                break;
            case 3:
                result = ReturnFiscalPeriodStart(year, 7);
                break;
            case 4:
                result = ReturnFiscalPeriodStart(year, 10);
                break;
            default:
                console.log("The ReturnFiscalQuarterStart received an invalid Quarter argument of {0}.  Valid values are 1-4.", quarter);
        }
        return result as Date;
    }

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 11/12/2015
    /// </remarks>
    /// <summary>
    /// Determines the ending date of a fiscal quarter within a specific fiscal year.
    /// </summary>
    /// <param name="year">The fiscal year the quarter falls within.</param>
    /// <param name="quarter">The fiscal quarter you are interested in.</param>
    /// <returns>
    /// DateTime value representing the last day of the fiscal quarter represented by
    /// the Year and Quarter parameters.
    /// </returns>
    export function  ReturnFiscalQuarterEnd( year:number, quarter:number) : Date  {//     ---   Returns Date obj
        let result;

        // The first three quarters are comprised of 3 periods.  The fourth quarter has 4 periods,
        // which is why we're getting the period end for Period 13 instead of Period 12 below.
        switch (quarter)
        {
            case 1:
                result = ReturnFiscalPeriodEnd(year, 3);
                break;
            case 2:
                result = ReturnFiscalPeriodEnd(year, 6);
                break;
            case 3:
                result = ReturnFiscalPeriodEnd(year, 9);
                break;
            case 4:
                result = ReturnFiscalPeriodEnd(year, 13);
                break;
            default:
                console.log("The ReturnFiscalQuarterEnd received an invalid Quarter argument of {0}.  Valid values are 1-4.", quarter);
        }
        
        return result as Date;
    }

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 2/25/2015
    /// </remarks>
    /// <summary>
    /// Returns the date and time of the first day and second of the specified four-digit fiscal year.
    /// </summary>
    /// <param name="year">Four-digit integer representing the fiscal year the function should use in its calculation.</param>
    /// <returns>DateTime representing the first second of the first day in the specified fiscal year.</returns>
    export function   ReturnFiscalStartDate ( year:number) : Date  {
        // Start with the first day of the first month of the year passed to us.
        let result = new Date(year, 0, 1);

        let adjustment = 0;
        switch (result.getDay() )
        {
            case 6 ://DayOfWeek.Saturday:
                // If the first day of the year is a Saturday, the fiscal year begins the following Sunday.
                // We use a negative number because we're going to use the DateTime.Subtract function to get a date value.
                // The negative value ensures we'll perform addition instead of subtraction.
                adjustment = 1;
                break;
            case 5 ://DayOfWeek.Friday:
                // If the first day of the year is a Friday, the fiscal year begins the following Sunday.
                adjustment = 2;
                break;
            case 4 ://DayOfWeek.Thursday:
                // If the first day of the year is a Thursday, Wednesday, Tuesday, or Monday, the fiscal year began on the previous Sunday.
                adjustment = -4;
                break;
            case 3 ://DayOfWeek.Wednesday:
                adjustment = -3;
                break;
            case 2 ://DayOfWeek.Tuesday:
                adjustment = -2;
                break;
            case 1 ://DayOfWeek.Monday:
                adjustment = -1;
                break;
            default:
                // Otherwise, it's Sunday and we don't need to adjust the starting date of the 
                adjustment = 0;
                break;
        }

        if (adjustment !== 0){
            // Perform date arithmetic to add/subtract the number of days we need to in order to shift to a Sunday start date.
            //result = result.Subtract(new TimeSpan(adjustment, 0, 0, 0));
            result.setDate( result.getDate() +adjustment );
        }
        return result;
    }

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 5/11/2016
    /// 
    /// Modified by: Steve Sclimenti
    /// Date: 2/2021
    /// Added function to this solution/helper class
    /// </remarks>
    /// <summary>
    /// Returns the quarter of the most recent/in-progress count.
    /// </summary>
    /// <param name="currentDate">The current date and time.</param>
    /// <returns>A value between 1 and 4.</returns>
    export function   GetCountQuarter  ( currentDate:Date,debug:boolean):number { // Input : date obj    ---  Output : int
        let result = 0;

        // In development, we need a way to work with the current period and year outside of the 
        // the count window.  This flag prevents the code from automatically regressing the quarter
        // on the days after the last day of the quarter but before the count is closed.  Similar logic
        // is in place in the Count.IstheCountOpen function.
        let useDevLogic = false;
        //let setting = DataHelper.GetCountSetting("DevIgnoreQuarterRegressionLogic");
        //if (setting ) { useDevLogic = Convert.ToBoolean(setting); }

        let currentQuarter = ReturnFiscalQuarter(currentDate);
        let currentYear = ReturnFiscalYear(currentDate);

        if (!useDevLogic)
        {
            if (IstheCountOpen(currentDate,debug))
            {
                if (!useDevLogic)
                {
                    let quarterStart = ReturnFiscalQuarterStart(currentYear, currentQuarter);
                    let tempDate = new Date(quarterStart.getFullYear(), (quarterStart.getMonth()), quarterStart.getDate()+3);
                    let previousCountClose = new Date(tempDate.getFullYear(), (tempDate.getMonth()),  tempDate.getDate(), 8, 0, 0);

                    if (currentDate.getDate() !== 6)
                    {
                        // We are not at the end of the fiscal quarter (they end on a Saturday), which means the values returned were
                        // actually for the quarter after the one we want to count.  We need to adjust the values
                        // to reflect the previous quarter.

                        if (currentQuarter === 1 || (currentQuarter === 4 && currentYear === currentDate.getFullYear() && currentDate > previousCountClose))
                        {
                            // If the current quarter is equal to 1, the previous quarter is going to be 4
                            // and will be in the previous year.
                            result = 4;
                        }
                        else
                        {
                            // Otherwise, we just subtract 1 from the current quarter and keep the year the same.
                            result = currentQuarter - 1;
                        }
                    }
                    else
                    {
                        // This means it's Saturday and the value of currentQuarter is going to actually reflect the
                        // quarter we want to count.
                        result = currentQuarter;
                    }
                }
            }
            else
            {
                // The count is not open so we're going to show the previous quarter's count.
                result = currentQuarter === 1 ? 4 : currentQuarter - 1;
            }

        }
        else
        {
            // We're using dev logic, which means we're just going to return the current quarter, without worrying about whether
            // we're on the last day of the count quarter (Saturday) or the first days of the new quarter (Sunday,Monday,Tuesday,Wednesday).
            // This means we just use the initial value returned from the MarsCalendar function.
            result = currentQuarter;
        }
/*
        if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.GetCountQuarter() ',' result  ',result);
        } */
        return result;
    }

    /// <remarks>
    /// Author: Alan Lampe
    /// Date: 5/11/2016
    /// 
    /// Modified by: Steve Sclimenti
    /// Date: 2/2021
    /// Added function to this solution/helper class
    /// 
    /// </remarks>
    /// <summary>
    /// Returns the year of the most recent/in-progress count.
    /// </summary>
    /// <param name="currentDate">The current date and time.</param>
    /// <returns>A four-digit integer representing the year of the count.</returns>
    export function  GetCountYear ( currentDate:Date,debug:boolean):number  {   // Input : date obj    ---  Output : int
        let result = 0;
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.GetCountYear() ',' currentDate  ',currentDate);
        } */

        // In development, we need a way to work with the current period and year outside of the 
        // the count window.  This flag prevents the code from automatically regressing the quarter
        // on the days after the last day of the quarter but before the count is closed.  Similar logic
        // is in place in the Count.IstheCountOpen function.
        let useDevLogic = false;
        /*let setting = DataHelper.GetCountSetting("DevIgnoreQuarterRegressionLogic");
        if (setting != String.Empty) { useDevLogic = Convert.ToBoolean(setting); }*/

        let currentYear = ReturnFiscalYear(currentDate);
        let currentQuarter = ReturnFiscalQuarter(currentDate);

        if (!useDevLogic)
        {
            if (IstheCountOpen(currentDate,debug))
            {
                if (!useDevLogic)
                {
                    if (currentDate.getDate() !== 6)
                    {
                        // We are not at the end of the fiscal quarter (they end on a Saturday), which means the values returned were
                        // actually for the quarter after the one we want to count.  We need to adjust the values
                        // to reflect the previous quarter.

                        if (currentQuarter === 1)
                        {
                            // If the current quarter is equal to 1, the previous quarter is going to be 4
                            // and will be in the previous year.
                            result = currentYear - 1;
                        }
                        else
                        {
                            // Otherwise, we just return the year we got from the MarsCalendar function call.
                            result = currentYear;
                        }
                    }
                    else
                    {
                        // This means it's Saturday and the value of currentQuarter is going to actually reflect the
                        // year we want to count.
                        result = currentYear;
                    }
                }
            }
            else
            {
                // The count is not open so we're going to show the previous quarter's count.
                result = currentQuarter === 1 ? currentYear - 1 : currentYear;
            }
        }
        else
        {
            // We're using dev logic, which means we're just going to return the current year, without worrying about whether
            // we're on the last day of the count quarter (Saturday) or the first days of the new quarter (Sunday,Monday,Tuesday,Wednesday).
            // This means we just use the initial value returned from the MarsCalendar function.
            result = currentYear;
        }

        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.GetCountYear() ',' result  ',result);
        } */
        return result;
    }

        /// <remarks>
        /// Author: Serdar N.
        /// Date: April 22, Thur.
        ///         
        /// Modified by: Steve Sclimenti
        /// Date: 2/2021
        /// Added function to this solution/helper class
        /// </remarks>
        /// <summary>
        /// Calculating  how many days to get the counting open.
        /// </summary>
        /// <param name="currentTime">Taking date time object client current time</param>
        /// <returns>Returns timespan object to inform how many days left to count time to open</returns>    
    export function HowLongUntiltheCountBegins( currentTime:Date,debug:boolean):string {
        //TimeSpan result;
        let result;
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' currentTime  ',currentTime);
        } */

        if (IstheCountOpen(currentTime,debug)){
            // The count is already underway.  There is no time left until it begins.
            result = "0.0:0:0";
        }
        else
        {
            let quarter = ReturnFiscalQuarter(currentTime);
            let year = ReturnFiscalYear(currentTime);

            let quarterEnd = ReturnFiscalQuarterEnd(year, quarter);
             //let countOpenTime = quarterEnd.AddHours(-22);
             // .log("HowLongUntiltheCountBegins => quarterEnd.toISOString()",quarterEnd.toISOString());


             let countOpenTimeI = DateTime.fromISO(quarterEnd.toISOString());
             /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' countOpenTime  ',countOpenTime);
            } */
            //console.log("HowLongUntiltheCountBegins => countOpenTimeI",countOpenTimeI);

             let countOpenTime = DateTime.fromObject({year:countOpenTimeI.year,month:countOpenTimeI.month,day:countOpenTimeI.day,hour:2},{zone:"America/Los_Angeles"} );

             let currentTimeLuxon = DateTime.fromISO(currentTime.toISOString());

             /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' currentTimeLuxon  ',currentTimeLuxon);
            }*/

             let diffTime = countOpenTime.diff(currentTimeLuxon,['days','hours','minutes','seconds']);

             /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' diffTime  ',diffTime);
            }*/

            //result = countOpenTime.Subtract(currentTime);
            let resultObj = `${diffTime.days}.${diffTime.hours}:${diffTime.minutes}:${diffTime.seconds.toFixed(0)}`;
            result = resultObj;
        }
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' result  ',result);
        } */

        return result;
    }

    /// <remarks>
    /// Author: Serdar N.
    /// Date: April 23, Thur.
    ///         
    /// Modified by: Steve Sclimenti
    /// Date: 2/2021
    /// Added function to this solution/helper class
    /// </remarks>
    /// <summary>
    /// Calculating how many days to get the counting close
    /// </summary>
    /// <param name="currentTime">Taking date time object client current time</param>
    /// <returns>Returns timespan object to inform how many days left to count time to close</returns>
    export function  HowLongUntiltheCountEnds(currentTime:Date,debug:boolean,quarterEndOverride:boolean)  {  // date obj
        let result;
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' currentTime  ',currentTime);
        } */

        if (IstheCountOpen(currentTime,debug))
        {
            // We're currently in a count.
            let quarter = GetCountQuarter(currentTime,debug);
            //let quarter = GetCountQuarter(currentTime,debug);
            let year = GetCountYear(currentTime,debug);

            
            let nextQuarterYear = quarter === 4 ? year+1 : year;
            let nextQuarter = quarter === 4 ? 1 : quarter+1;
            let quarterEnd = ReturnFiscalQuarterEnd( quarterEndOverride ? nextQuarterYear : year, quarterEndOverride ? nextQuarter : quarter );
            
            //let tempDate = quarterEnd.AddDays(4);
            let tempDate = DateTime.fromISO(quarterEnd.toISOString()).plus({days:4});
            /*
            if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' tempDate  ',tempDate);
            } */
            //let countClose = DateTime.local(tempDate.year, tempDate.month, tempDate.day, 8, 0, 0);
            let countClose = DateTime.fromObject({year:tempDate.year, month:tempDate.month, day:tempDate.day, hour:8, minutes:0, seconds:0} as any);

            /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' countClose  ',countClose);
            } */

            let currentTimeLuxon = DateTime.fromISO(currentTime.toISOString());
            /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' currentTimeLuxon  ',currentTimeLuxon);
            } */

            let diffTime = countClose.diff(currentTimeLuxon,['days','hours','minutes']);
            //let diffTime = currentTimeLuxon.diff( countClose,['days','hours','minutes']);
            /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' diffTime  ',diffTime);
            } */

            let resultObj = `${diffTime.days}:${diffTime.hours}:${diffTime.minutes}`;
            result = resultObj;
            //result = countClose.minus(currentTime.toISOString());
        }
        else
        {
            // The count is already closed.
            //result = new TimeSpan(0, 0, 0, 0, 0);
            result = "0:0:0";
            
        }
        //return result.toHTTP();
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' result  ',result);
        } */
        return result;
    }

    
export interface IFiscalObjectInterface {
    actualPeriod:number;
    actualPeriodStart:Date;
    actualPeriodEnd:Date;
    actualQuarter : number;
    actualQuarterStart : Date;
    actualQuarterEnd : Date;
    actualYear : number;

    actualDaysSincePeroidStart : number;
    actualDaysUntilPeroidEnd : number;
    actualDaysSinceQuarterStart : number;
    actualDaysUntilQuarterEnd : number;
  }
  
  export const ReturnFiscalObject = (dateObj:Date):IFiscalObjectInterface => {
        let date = dateObj;//new Date();
        let thisPeriod = ReturnFiscalPeriod(date);
        let thisPeriodStart = ReturnFiscalPeriodStart(date.getFullYear(),thisPeriod);
        let thisPeriodEnd = ReturnFiscalPeriodEnd(date.getFullYear(),thisPeriod);
        let thisQuarter = ReturnFiscalQuarter(date);
        let thisQuarterStart = ReturnFiscalPeriodEnd(date.getFullYear(),thisQuarter);
        let thisQuarterEnd = ReturnFiscalQuarterEnd(date.getFullYear(),thisQuarter);
        let thisYear = ReturnFiscalYear(date);
        
        let lexonDate = DateTime.fromISO(date.toISOString());
        let lexonPStart = DateTime.fromISO(thisPeriodStart.toISOString());
        let lexonPEnd = DateTime.fromISO(thisPeriodEnd.toISOString());
        let lexonQStart = DateTime.fromISO(thisQuarterStart.toISOString());
        let lexonQEnd = DateTime.fromISO(thisQuarterEnd.toISOString());
    
        let daysSincePeroidStart= lexonDate.diff(lexonPStart,['days']);
        let daysUntilPeroidEnd = lexonPEnd.diff(lexonPEnd,['days']);
        let daysSinceQuarterStart= lexonDate.diff(lexonQStart,['days']);
        let daysUntilQuarterEnd = lexonQEnd.diff(lexonQEnd,['days']);
        
        return ({
          actualPeriod:thisPeriod,
          actualPeriodStart:thisPeriodStart,
          actualPeriodEnd:thisPeriodEnd,
          actualQuarter : thisQuarter,
          actualQuarterStart : thisQuarterStart,
          actualQuarterEnd : thisQuarterEnd,
          actualYear : thisYear,
    
          actualDaysSincePeroidStart : daysSincePeroidStart.days,
          actualDaysUntilPeroidEnd : daysUntilPeroidEnd.days,
          actualDaysSinceQuarterStart : daysSinceQuarterStart.days,
          actualDaysUntilQuarterEnd : daysUntilQuarterEnd.days,
        });
    };

    export interface ICountDateInfo{
        IsCountOpen : boolean;
        HowLongUntiltheCountBegins : any;
        HowLongUntiltheCountEnds : any;
        CountQuarter : number;
        CountYear : number;
        NextCountQuarter : number;
    }

    export const ReturnCountObject = (dateObj:Date,debug:boolean,quarterEndOverrideVal:boolean):ICountDateInfo => {
        /* if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.ReturnCountObject() ',' dateObj  ',dateObj);
        } */
        
        let thisDateObj = dateObj;//new Date();
        let thisCountQuarter = GetCountQuarter(thisDateObj,debug);
        let nextCountQuarter ;
        if(thisCountQuarter === 4){
          nextCountQuarter = 1;
        }
        else{
          nextCountQuarter = thisCountQuarter +1 ;
        }
    
        return({
            IsCountOpen : IstheCountOpen(thisDateObj,debug),
            HowLongUntiltheCountBegins : HowLongUntiltheCountBegins(thisDateObj,debug),
            HowLongUntiltheCountEnds : HowLongUntiltheCountEnds(thisDateObj,debug,quarterEndOverrideVal),
            CountQuarter : thisCountQuarter,
            CountYear : GetCountYear(thisDateObj,debug),
            NextCountQuarter : nextCountQuarter,
        });
    };

    export const ReturnNextCountDateEvent = (currentTime:Date,debug:boolean,daysOffset:number):Date => {
        let result;
        /*if(debug){
            BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' currentTime  ',currentTime);
        } */

        if (IstheCountOpen(currentTime,debug)){
            // The count is already underway.  There is no time left until it begins.
            //result = "0.0:0:0";
            // We're currently in a count.
            let quarter = GetCountQuarter(currentTime,debug);
            //let quarter = GetCountQuarter(currentTime,debug);
            let year = GetCountYear(currentTime,debug);

            
            //let nextQuarterYear = quarter === 4 ? year+1 : year;
            //let nextQuarter = quarter === 4 ? 1 : quarter+1;
            let quarterEnd = ReturnFiscalQuarterEnd( /*quarterEndOverride ? nextQuarterYear :*/ year, /*quarterEndOverride ? nextQuarter :*/ quarter );
            
            //let tempDate = quarterEnd.AddDays(4);
            let tempDate = DateTime.fromISO(quarterEnd.toISOString()).plus({days:4});
            /*
            if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountEnds() ',' tempDate  ',tempDate);
            } */
            //let countClose = DateTime.local(tempDate.year, tempDate.month, tempDate.day, 8, 0, 0);
            let countClose:Date = DateTime.fromObject({year:tempDate.year, month:tempDate.month, day:tempDate.day, hour:8, minutes:0, seconds:0} as any);
            result=countClose;
        }
        else
        {
            let quarter = ReturnFiscalQuarter(currentTime);
            let year = ReturnFiscalYear(currentTime);

            let quarterEnd = ReturnFiscalQuarterEnd(year, quarter);
             //let countOpenTime = quarterEnd.AddHours(-22);
             //console.log("ReturnNextCountDateEvent => quarterEnd.toISOString()",quarterEnd.toISOString());


             let countOpenTimeI = DateTime.fromISO(quarterEnd.toISOString());
             /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' countOpenTime  ',countOpenTime);
            } */
            //console.log("ReturnNextCountDateEvent => countOpenTimeI",countOpenTimeI);

             let countOpenTime:Date = DateTime.fromObject({year:countOpenTimeI.year,month:countOpenTimeI.month,day:countOpenTimeI.day,hour:2},{zone:"America/Los_Angeles"} );
             //let currentTimeLuxon = DateTime.fromISO(currentTime.toISOString());

             /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' currentTimeLuxon  ',currentTimeLuxon);
            }*/

             //let diffTime = countOpenTime.diff(currentTimeLuxon,['days','hours','minutes','seconds']);

             /*if(debug){
                BanfieldUtilities.writeToConsole('MarsCalendar.HowLongUntiltheCountBegins() ',' diffTime  ',diffTime);
            }*/

            //result = countOpenTime.Subtract(currentTime);
            //let resultObj = `${diffTime.days}.${diffTime.hours}:${diffTime.minutes}:${diffTime.seconds.toFixed(0)}`;
            //result = resultObj;
            result = countOpenTime;
        }
        return result;
    }
}