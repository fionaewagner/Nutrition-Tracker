export const validateRegister=(values)=>{
    const errors = {}
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!values.email){
        errors.email="Required"
    }
    else if(!emailReg.test(values.email)){
        errors.email="Please enter a valid email address."
    }
    if(!values.username){
        errors.username="Required"
    }
    else if(values.username.length < 6 || values.username.length >15){
        errors.username = "Username must be between 6 and 15 characters"
    }
    if(!values.password){
        errors.password="Required"
    }
    else if(values.password.length < 8){
        errors.password = "Password must be at least 8 characters"
    }
    if(!values.weight || values.weight === 0){
        errors.weight='Required'
    }
    if(!values.feet){
        errors.feet='Required'
    }
    if(!values.inches){
        errors.inches='Required'
    }else if(values.inches === 0 && values.feet === 0){
        errors.inches='Please enter a valid height.'
    }
    if(!values.activity){
        errors.activity = "Required"
    }
    if(!values.sex){
        errors.sex = "Required"
    }
    
    return errors
}