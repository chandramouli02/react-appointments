import './index.css'
import {v4 as uuidV4} from 'uuid'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointment: '',
    appointmentDate: '',
    appointmentsList: [],
    starredAppointmentsList: [],
    isStarredClick: 'inActive',
  }

  handleAppointmentDate = e => {
    this.setState({appointmentDate: e.target.value})
  }

  handleAppointmentInput = e => {
    this.setState({appointment: e.target.value})
  }

  handleAddButtonClick = () => {
    const {appointment, appointmentDate} = this.state
    const newAppointment = {
      id: uuidV4(),
      appointment,
      appointmentDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      appointment: '',
      appointmentDate: '',
    }))
  }

  handleStarButtonClick = () => {
    const {appointmentsList, isStarredClick} = this.state
    const filterStarredAppointmentsList = appointmentsList.filter(
      eachItem => eachItem.isStarred,
    )
    this.setState({
      starredAppointmentsList: filterStarredAppointmentsList,
      isStarredClick: isStarredClick === 'inActive' ? 'active' : 'inActive',
    })
  }

  toggleStarBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {
      appointment,
      appointmentDate,
      appointmentsList,
      starredAppointmentsList,
      isStarredClick,
    } = this.state

    return (
      <div className="main-container">
        <div className="elements-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="add-appointment-container">
            <form className="appointment-form">
              <label htmlFor="text-input">Title</label>
              <input
                id="text-input"
                onChange={this.handleAppointmentInput}
                className="appointment-text"
                type="text"
                placeholder="Add Appointment"
                value={appointment}
              />
              <label htmlFor="date-input">Date</label>
              <input
                id="date-input"
                onChange={this.handleAppointmentDate}
                className="date-input"
                type="date"
                placeholder="add Date"
                value={appointmentDate}
              />
              <button
                onClick={this.handleAddButtonClick}
                className="add-btn"
                type="button"
                data-testid="add"
              >
                Add
              </button>
            </form>
            <img
              className="appointment-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div className="starred-btn-container">
            <h1 className="appointments-text">Appointments</h1>
            <button
              onClick={this.handleStarButtonClick}
              className="starred-btn"
              type="button"
              data-testid="star"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {isStarredClick === 'inActive' &&
              appointmentsList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentItem={eachItem}
                  starBtnClick={this.toggleStarBtn}
                />
              ))}
            {isStarredClick === 'active' &&
              starredAppointmentsList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentItem={eachItem}
                  starBtnClick={this.toggleStarBtn}
                />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
