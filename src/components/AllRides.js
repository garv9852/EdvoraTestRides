import React, { useEffect } from 'react'
import locate from "../views/locate.jpeg"
import Ride from '../views/Data'
import { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';

function AllRides(props) {
  const {code}=useParams();
  const [allrides,setAllrides]=useState(Ride);
  const [allType,setAlltype]=useState(["Nearest Rides","Upcoming Rides","Past Rides"])
  const [type,setType]=useState("Nearest Rides")
  const [Allstate,setAllstate]=useState([]);
  const [Allcity,setAllcity]=useState([]);
  const [state,setState]=useState("All");
  const [city,setCity]=useState("All");
  const [filterModal,setFilterModal]=useState(false)
  useEffect(()=>{
    let arr=[];
    for(let i=0;i<Ride.length;i++)
    {
      for(let j=0;j<Ride[i].station_path.length;j++)
      {
        if(Ride[i].station_path[j]>=code)
        {
          let date=new Date(Ride[i].date);
          arr.push({...Ride[i],sort_id:Ride[i].station_path[j],date_id:date,station_path_id:`${Ride[i].station_path}`})
          break;
        }
      }
    }
    arr.sort((a, b) => {
      return a.sort_id - b.sort_id;
    });
    let statearr=[];
    let cityarr=[];
    for(let i=0;i<allrides.length;i++)
    {
      if(!statearr.includes(allrides[i].state))
        statearr.push(allrides[i].state);
      if(!cityarr.includes(allrides[i].city))
        cityarr.push(allrides[i].city);
    }
    statearr.unshift("All");
    cityarr.unshift("All");
    setAllcity(cityarr);
    setAllstate(statearr);
    setAllrides(arr);
  },[])
  useEffect(()=>{
    let arr=[];
    if(type=="Nearest Rides")
    {
      for(let i=0;i<Ride.length;i++)
      {
        let date=new Date(Ride[i].date);
        let curr=new Date(Date.now());
        if(date.getTime()<curr.getTime())
          continue;
        for(let j=0;j<Ride[i].station_path.length;j++)
        {
          if(Ride[i].station_path[j]>=code)
          {
            arr.push({...Ride[i],sort_id:Ride[i].station_path[j],date_id:date,station_path_id:`${Ride[i].station_path}`})
            break;
          }
        }
      }
      arr.sort((a, b) => {
        return a.sort_id - b.sort_id;
      });
    }
    else if(type=="Upcoming Rides")
    {
      for(let i=0;i<Ride.length;i++)
      {
        let date=new Date(Ride[i].date);
        let curr=new Date(Date.now());
        if(date.getTime()>curr.getTime())
        {
          let z=Ride[i].station_path.filter((e)=>{
            return e>=code;
          }).sort();
          arr.push({...Ride[i],date_id:date,sort_id:z[0],station_path_id:`${Ride[i].station_path}`});
        }
      }
      arr.sort((a, b) => {
        return a.date_id.getTime() - b.date_id.getTime();
      });
    }
    else{
      for(let i=0;i<Ride.length;i++)
      {
        let date=new Date(Ride[i].date);
        let curr=new Date(Date.now());
        if(date.getTime()<curr.getTime())
        {
          let z=Ride[i].station_path.filter((e)=>{
            return e>=code;
          }).sort();
          arr.push({...Ride[i],date_id:date,sort_id:z[0],station_path_id:`${Ride[i].station_path}`});
        }
      }
      arr.sort((a, b) => {
        return a.date_id.getTime() - b.date_id.getTime();
      });
    }
    setAllrides(arr);
  },[type])
  useEffect(()=>{
    let statearr=[];
    let cityarr=[];
    for(let i=0;i<allrides.length;i++)
    {
      if(!statearr.includes(allrides[i].state))
        statearr.push(allrides[i].state);
      if(!cityarr.includes(allrides[i].city))
        cityarr.push(allrides[i].city);
    }
    statearr.unshift("All");
    cityarr.unshift("All");
    setAllcity(cityarr);
    setAllstate(statearr);
  },[allrides])
  useEffect(()=>{
    let arr=[];
    if(state=="All")
    {
      handleChange();
      if(city!='All')
      {
        for(let i=0;i<allrides.length;i++)
      {
        if(allrides[i].city==city)
        {
          arr.push(allrides[i]);
        }
      }
      setAllrides(arr);
      }
    }
    else{
      for(let i=0;i<allrides.length;i++)
      {
        if(allrides[i].state==state)
        {
          arr.push(allrides[i]);
        }
      }
      setAllrides(arr);
    }
  },[state])
  useEffect(()=>{
    let arr=[];
    if(city=="All")
    {
      handleChange();
      if(state!='All')
      {
        for(let i=0;i<allrides.length;i++)
      {
        if(allrides[i].state==state)
        {
          arr.push(allrides[i]);
        }
      }
      setAllrides(arr);
      }
    }
    else{
      for(let i=0;i<allrides.length;i++)
      {
        if(allrides[i].city==city)
        {
          arr.push(allrides[i]);
        }
      }
      setAllrides(arr);
    }
  },[city])
  let changeFuncState=(e)=>{
    setState(e.target.value);
  }
  let changeFuncCity=(e)=>{
    setCity(e.target.value);
  }
  let handleChange=()=>{
    let arr=[];
    if(type=="Nearest Rides")
    {
      for(let i=0;i<Ride.length;i++)
      {
        let date=new Date(Ride[i].date);
        let curr=new Date(Date.now());
        if(date.getTime()<curr.getTime())
          continue;
        for(let j=0;j<Ride[i].station_path.length;j++)
        {
          if(Ride[i].station_path[j]>=code)
          {
            arr.push({...Ride[i],sort_id:Ride[i].station_path[j],date_id:date,station_path_id:`${Ride[i].station_path}`})
            break;
          }
        }
      }
      arr.sort((a, b) => {
        return a.sort_id - b.sort_id;
      });
    }
    else if(type=="Upcoming Rides")
    {
      for(let i=0;i<Ride.length;i++)
      {
        let date=new Date(Ride[i].date);
        let curr=new Date(Date.now());
        if(date.getTime()>curr.getTime())
        {
          let z=Ride[i].station_path.filter((e)=>{
            return e>=code;
          }).sort();
          arr.push({...Ride[i],date_id:date,sort_id:z[0],station_path_id:`${Ride[i].station_path}`});
        }
      }
      arr.sort((a, b) => {
        return a.date_id.getTime() - b.date_id.getTime();
      });
    }
    else{
      for(let i=0;i<Ride.length;i++)
      {
        let date=new Date(Ride[i].date);
        let curr=new Date(Date.now());
        if(date.getTime()<curr.getTime())
        {
          let z=Ride[i].station_path.filter((e)=>{
            return e>=code;
          }).sort();
          arr.push({...Ride[i],date_id:date,sort_id:z[0],station_path_id:`${Ride[i].station_path}`});
        }
      }
      arr.sort((a, b) => {
        return a.date_id.getTime() - b.date_id.getTime();
      });
    }
    setAllrides(arr);
  }
  return (
    <>
      <div className='All-rides-container'>
        <div className='Rides-selector'>
          {
            allType.map((e)=>(
              <h3 className={e==type?"selected":""} onClick={()=>setType(e)}>{e}{e==type?`(${allrides.length})`:""}</h3>
            ))
          }
        </div>
        <div className='Filter-icon-container'>
          <div className="material-icons filter-icon" onClick={()=>setFilterModal(!filterModal)}>sort</div>
        </div>
      </div>
      <div className='Rides-container'>
        {
          allrides.map((item,index)=>(
            <div className='Ride-tab' index={index}>
            <div className='first'>
              <div className='Loaction-img'>
                <img src={locate} style={{height:"90%",width:"90%",borderRadius:"8px"}}/>
              </div>
              <div className='Ride-details'>
                <div><span>Ride Id : </span>{item.id}</div>
                <div><span>Origin Station : </span>{item.origin_station_code}</div>
                <div><span>Station_Path : </span>{item.station_path_id}</div>
                <div><span>Date : </span>{`${item.date_id}`}</div>
                <div><span>Distance : </span>{item.sort_id-code}</div>
              </div>
            </div>
            <div className='Location-details'>
              <div>{item.city}</div>
              <div>{item.state}</div>
            </div>
          </div>
          ))
        }
      </div>
      {
        filterModal && <div className='Filter-container'>
        <div>Filter</div>
        <select name="States" className="States-names" onChange={(e)=>changeFuncState(e)}>
          {
            Allstate.map((e)=>(
              <option value={e} selected={e==state}>{e}</option>
            ))
          }
        </select>
        <select name="City" className="Cities-names" onChange={(e)=>changeFuncCity(e)}>
          {
            Allcity.map((e)=>(
              <option value={e} selected={e==city}>{e}</option>
            ))
          }
        </select>
      </div>
      }
    </>
  )
}

const mapStateToProps=(state)=>{
  return{
      user:state.user
  }
}

export default connect(mapStateToProps)(AllRides);