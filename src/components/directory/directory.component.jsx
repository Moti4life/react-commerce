import React from 'react'
import {MenuItem} from '../menu-item/menu-item.component'
import './directory.style.scss'

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const Directory = ({ sections }) => {
  return (
    <div className='directory-menu'>
      { sections.map( ({ id, ...restAttributes}) => (
          <MenuItem 
          key={id}
          {...restAttributes}
          />
      ))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)