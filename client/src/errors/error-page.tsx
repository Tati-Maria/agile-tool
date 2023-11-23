import { useRouteError } from "react-router-dom"


const ErrorLog = () => {
    const error = useRouteError();
    console.log(error)
  return (
    <div>
        <h1>error</h1>
    </div>
  )
}

export default ErrorLog;