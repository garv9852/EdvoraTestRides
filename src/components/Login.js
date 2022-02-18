import * as React from 'react';
import { useState ,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import  {Link ,useNavigate}  from 'react-router-dom';
import {connect} from "react-redux"
function Login(props) {
    const [name,setName]=useState("")
    const [stationCode,setStationCode]=useState("");
    const [file,setFile]=useState(null);
    const history=useNavigate();
    const handleClick=async ()=>{
      let reader=new FileReader();
      let img;
      reader.onload=(e)=>{
        const user={
          name:name,
          code:stationCode,
          profile:e.target.result
        }
        props.ChangeUser(user);
      }
      reader.readAsDataURL(file);
      history(`EdvoraTestRides/ride${stationCode}`);
    }
  return (
    <div>
        <div className="signupWrapper">
      <div className='signupCard'>
        <Card variant="outlined">
            <CardContent>
              <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth={true} margin='dense'size='small' value={name} focused onChange={(e)=>{setName(e.target.value)}}/> 
              <TextField id="outlined-basic" label="Station Code" variant="outlined" fullWidth={true} margin='dense'size='small' focused value={stationCode} onChange={(e)=>{setStationCode(e.target.value)}} /> 
              <Button variant="outlined" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon/>} component="label">
              Upload Profile Image
              <input type="file" accept="image/*" hidden onChange={(e)=>{setFile(e.target.files[0])}}/>
              </Button>
            </CardContent>
          <CardActions>
          <Button variant="contained" fullWidth={true} onClick={handleClick} sx={{backgroundColor:"white",color:"black"}}>Check Availability</Button>
          </CardActions>
        </Card>
      </div>
    </div>
    </div>
  )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        ChangeUser:(qty)=>dispatch({type:"Change_User",payload:qty})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);