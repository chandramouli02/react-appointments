import './index.css'
import {Component} from 'react'
import {format} from 'date-fns'

class AppointmentItem extends Component {
  render() {
    const {appointmentItem, starBtnClick} = this.props
    const {appointment, appointmentDate, id, isStarred} = appointmentItem
    const likeStyle = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    const onClickStarBtn = () => {
      starBtnClick(id)
    }
    const formattedDate = format(
      new Date(appointmentDate),
      'dd MMMM yyyy, EEEE',
    )
    return (
      <li className="appointmentItem">
        <div className="appointment">
          <p className="appointment-heading">{appointment}</p>
          <button
            onClick={onClickStarBtn}
            data-testid="star"
            className="like-btn"
            type="button"
          >
            <img src={likeStyle} alt="star" />
          </button>
        </div>
        <p className="date">{formattedDate}</p>
      </li>
    )
  }
}

export default AppointmentItem
