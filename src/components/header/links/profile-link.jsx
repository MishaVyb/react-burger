import React from 'react'
import PropTypes from 'prop-types'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './links.module.css'

const ProfileLink = props => {
  return (
    <div className={`pl-5 pr-5 ${style.container}`}>
      <ProfileIcon/>
      <p className="text text_type_main-default ml-2">
        Личный кабинет
      </p>
    </div>
  )
}

ProfileLink.propTypes = {

}

export default ProfileLink