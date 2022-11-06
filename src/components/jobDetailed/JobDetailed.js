import arrow from '../../assets/Arrow.svg';
import share from '../../assets/share.svg';
import save from '../../assets/save.svg';
import { setJob } from '../jobList/jobSlice';
import ApplyButton from '../buttons/applyButton';
import Features from '../buttons/Features';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {useEffect, useDispatch} from 'react';
import { useSelector } from 'react-redux';
const JobDetailed = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const jobs = useSelector(state=> state.jobs);
    const job = useSelector(state => state.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    console.log('nigger');
    useEffect(()=>{
        
        if (!id || !jobs[id]) {
            navigate('/');
        }
        dispatch(setJob(jobs[id]));
        
    }, [])
    console.log(job);
    console.log(id);

    const {address, 
        benefits,
        createdAt,
        description,
        email,
        employment_type,
        name,
        phone,
        pictures,
        salary,
        title
    } = job;
    console.log('error');
    return(
        
        <div className="jobDetailed__wrapper">
            <div className="jobDetailed__descr">
                <div className="jobDetailed__header">
                    <div className="jobDetailed__header__title">Job Details</div>
                    <div className="jobDetailed__header__save">
                        <img src={save} alt="" />
                        <span>Save to my list</span>
                    </div>
                    <div className="jobDetailed__header__share">
                        <img src={share} alt="" />
                        <span>Share</span>
                    </div>
                </div> 

                <ApplyButton/>

                <div className="jobDetailed__container">
                    <div className="jobDetailed__intro">
                        <div className="jobDetailed__intro__text"></div>
                        <div className="jobDetailed__intro__salary">
                            <div className="salary">{salary}</div>
                            <div className="brutto">Brutto, per year</div>
                        </div>
                    </div>
                    <div className="jobDetailed__posted">
                        {createdAt.slice(0,10)}
                    </div>
                    <div className="jobDetailed__description">
                        {description}
                    </div>
                    <ApplyButton/>
                    <div className="jobDetailed__additional">
                        <div className="jobDetailed__additional__type">
                            {
                                employment_type.map((i)=>{
                                    return(
                                        <Features name={employment_type[i]}/>
                                    )
                                })
                            }
                        </div>
                        <div className="jobDetailed__additional__benefits">

                        </div>
                    </div>
                    <div className="jobDetailed__attached">
                        <div className="jobDetailed__attached__text">
                            Attached images
                        </div>
                        <div className="jobDetailed__attached__img">

                        </div>
                    </div>
                </div>

            </div>
            <div className="jobDetailed__map">

            </div>
            <button>
                <img src={arrow} alt="" />
                <span>RETURN TO JOB BOARD</span>
            </button>
        </div>
    )
    

}

export default JobDetailed;