const intialState={
    user:{}
}

const LoginReducer=(state=intialState,action)=>{
    switch(action.type){
        case 'Change_User':
            return {...state,user:{...action.payload}}
        default:
            return state;
    }
}
export default LoginReducer