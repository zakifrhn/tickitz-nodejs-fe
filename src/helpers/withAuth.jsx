import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"

const withAuth = (Component) => {
  return (props) =>{
    const {isAuth} = useSelector((s)=> s.users)
    const {role} = useSelector((s)=> s.users)
    console.log({role})

    if(!isAuth){
        
      // console.log(isAuth)
      
      return <Navigate to='/register' replace />
        
    }

    return <Component {...props}/>
  }
}

export default withAuth
