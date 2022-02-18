import React from 'react'
import {connect} from "react-redux"
import { Avatar } from '@mui/material';
import "./Ride.css"
import AllRides from './AllRides';
function Ride(props) {
  return (
    <div>
        <div className='First-container'>
            <h1 style={{margin:0,color:"white",marginLeft:"8rem"}}>Edvora</h1>
            <div className='User-details' style={{marginRight:"8rem"}}>
                <h3 style={{marginRight:"2rem",color:"white"}}>{props.user.name}</h3>
                <Avatar src={props.user.profile}/>
            </div>
        </div>
        <div className='Second-container'>
            <AllRides userData={props.user.code}/>
        </div>
    </div>
  )
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Ride);