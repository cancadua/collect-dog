import './navigation.css'
import {useEffect} from "react";

const Navigation = ({data}) => {

  useEffect(() => {}, [data])

  return (
    <div className="navigation">
        {data && data.map(item => {
          return <button className={'breeds'}>{item.breed}</button>
        })}
    </div>
  )
}

export default Navigation;