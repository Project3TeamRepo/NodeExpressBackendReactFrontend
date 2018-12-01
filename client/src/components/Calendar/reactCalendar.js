//npx create-react-app  reactcalendar
//cd reactcalendar
//npm start

//npm install date-fns
//npm start

import React, {Component} from "react";
import dateFns from "date-fns";
import Button from '@material-ui/core/Button';
import Dialogue1 from './Dialogue1';

class ReactCalendar extends Component {
  state = {
    calendars: [],
    currentMonth: new Date(),
    selectedDate: new Date(),
    showdialogue: false
  };

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers() {
    fetch('/api/calendars')
    .then(res => res.json())
    .then(calendars => this.setState({calendars}));
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}

          {/* Determine the day */}
          {/* Compare to what you receive from the database */}
          {/* API Call from the database(lifecycle component) */}
          {/* Also call the function when changing the month */}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    var dailyAppointments = [];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        dailyAppointments = this.getAppointments(day);
        var appointmentSpansForThisDay = "";
        for(let j=0; j<dailyAppointments.length; j++){
          appointmentSpansForThisDay += "<span className=appt id=appt-" + dailyAppointments[j]._id + ">" + dailyAppointments[j].title + ", " + dailyAppointments[j].location + "</span>";
        }
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {appointmentSpansForThisDay}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    console.log('testing')
    this.setState({
      selectedDate: day,
    showdialogue:true
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
  
  getAppointments = (date) => {
    var dateToCompare = "";
    var formatToUse = "MM-DD-YYYY";
    var dateToMatch = dateFns.format(date, formatToUse);
    var apptsThisDate = [];

    this.state.calendars.map( calendar => (
      dateToCompare = dateFns.format(calendar.date, formatToUse),
      dateToCompare === dateToMatch ? apptsThisDate.push(calendar) : console.log('')
    ))
      
    return apptsThisDate;
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <Button id="neweventbutton" onClick={this.onDateClick} >Click Here ...</Button>
      {this.state.showdialogue ? <Dialogue1/>:null}
      
      </div>
    );
  }
}



export default ReactCalendar;
