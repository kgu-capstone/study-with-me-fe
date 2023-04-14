import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class StudySidebar extends Component {
  render() {
    return (
      <div>
        <NavLink to = '/StudyWork/Announce'>공지사항</NavLink>
        <NavLink to = '/StudyWork/Attend'>출석부</NavLink>
        <NavLink to = '/StudyWork/ByWeek'>스터디</NavLink>
      </div>
    )
  }
}
