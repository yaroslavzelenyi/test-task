import { setJob } from '../jobList/jobSlice';
import ApplyButton from '../buttons/applyButton';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './jobDetailed.scss';
import Features from '../buttons/Features';
import Spinner from '../spinner/Spinner';
import arrow from '../../assets/Arrow.svg';
import share from '../../assets/share.svg';
import save from '../../assets/save.svg';

const JobDetailed = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const {jobs} = useSelector(state => state.jobs);
    const {job} = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    useEffect(()=>{
        
        if (!id || !jobs[id]) {
            navigate('/');
        }
        dispatch(setJob(jobs[id]));
        
    }, [])
    console.log(job);
     return !job ||!Object.keys(job).length ? <Spinner/> :(
        
        <div className="jobDetailed">
            <div className="jobDetailed__wrapper">
                <div className="jobDetailed__descr">
                    <div className="jobDetailed__header">
                        <div className="jobDetailed__header__title">Job Details</div>
                        <div className="jobDetailed__header__title__btns">
                            <div className="jobDetailed__header__save">
                                <img src={save} alt="" />
                                <span>Save to my list</span>
                            </div>
                            <div className="jobDetailed__header__share">
                                <img src={share} alt="" />
                                <span>Share</span>
                            </div>
                        </div>
                    </div> 

                    <ApplyButton id="upperBtn"/>

                    <div className="jobDetailed__container">
                        <div className="jobDetailed__intro">
                            <div className="jobDetailed__intro__text">{job.title}</div>
                            <div className="jobDetailed__intro__salary">
                                <div className="salary">€ {job.salary}</div>
                                <div className="brutto">Brutto, per year</div>
                            </div>
                        </div>
                        <div className="jobDetailed__posted">
                            {job.createdAt.slice(0,10)}
                        </div>
                        <div className="jobDetailed__description">
                            {job.description}
                        </div>
                        <ApplyButton/>
                        <div className="jobDetailed__additional">
                            <div className="jobDetailed__additional__info">Additional info</div>
                            <div className="jobDetailed__additional__type">
                                <div className="jobDetailed__additional__type__text">Employment type</div>
                                <div className="jobDetailed__additional__type__blocks">
                                    {
                                        job.employment_type.map(i=>{
                                            return(
                                                <Features className='employment' name={i}/>
                                            )
                                        })
                                    }
                                </div>
                                
                            </div>
                            <div className="jobDetailed__additional__benefits">
                                <div className="jobDetailed__additional__benefits__text">Benefits</div>
                                <div className="jobDetailed__additional__benefits__blocks">
                                    {
                                        job.benefits.map(i=>{
                                            return(
                                                <Features className='benefits' name={i}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="jobDetailed__attached">
                            <div className="jobDetailed__attached__text">
                                Attached images
                            </div>
                            <div className="jobDetailed__attached__blocks">
                                    {
                                        job.pictures.map(i=>{
                                            return(
                                                <div className='jobDetailed__attached__img'>
                                                    <img className='attached__image' src={i} alt=""/>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                    </div>

                </div>
                <div  className="jobDetailed__map">
                    <div id="jobDetailed__contacts">Contacts</div>
                    <div className="jobDetailed__map__info">
                        <span id='jobInfoName' className="jobDetailed__map__name">{job.name}</span>
                        <span className="jobDetailed__map__address">{job.address}</span>
                        <span className="jobDetailed__map__phone">{job.phone}</span>
                        <span className="jobDetailed__map__email">{job.email}</span>
                    </div>
                </div>
                
            </div>
            <button onClick={()=>navigate(`/`)} className='jobDetailed__return'>
                <img src={arrow} alt="" />
                <span>RETURN TO JOB BOARD</span>
            </button>
        </div>
    )
    

}

export default JobDetailed;