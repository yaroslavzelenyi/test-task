import './features.scss'
const Features = ({name,className}) =>{
    return(
        <div className={`features ${className}`}>{name}</div>
    )
}
export default Features;