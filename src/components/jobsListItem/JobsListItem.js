import "./jobsListItem.scss";
import location from '../../assets/location.svg';
import rate from '../../assets/rate.svg';
import save from '../../assets/save.svg';
import { useNavigate } from "react-router-dom";
const JobsListItem  = ({title, address, pictures, benefits, createdAt,id})=>{
    const navigate = useNavigate();
    return(
        <li onClick={()=>navigate(`/?id=${id}`)}
        className="job">
            
            <img src={pictures[0]} className="round__circle" alt="" />
            
            <div className="job__description">
                <div className="job__title">{title}</div>
                <div className="job__address">{address}</div>
                <div className="job__location">
                    <img src={location} alt="" className="location__img" />
                    <div className="job__location__text"><a href="#">Vienna, Austria</a></div>
                </div>
                
            </div>
            
                
                <img style={{'visibility' : benefits.length >= 2 ? 'visible' : 'hidden'}} 
                    src={rate} alt='' className="job__rate"/>  
            
            <img className='job__saved' src={save} alt="" />
            <div className="job__posted">{createdAt.slice(0,10)}</div>
                

        </li>
    )

}
export default JobsListItem;