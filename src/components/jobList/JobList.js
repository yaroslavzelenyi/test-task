import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { Pagination } from '../pagination/Pagination';
import  "./jobList.scss";
import { useNavigate } from "react-router-dom";
import { fetchJobs, setCurrentPage, setJob} from './jobSlice';
import JobsListItem from '../jobsListItem/JobsListItem';
import Spinner from '../spinner/Spinner';


const JobList = ()=> {

    const {jobs, jobsLoadingStatus, currentPage} = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const jobsData = Object.values(jobs);
   
    const jobsPerPage = 4;
    const pageCount = jobsData.length / jobsPerPage;
    const currentEnd = currentPage * jobsPerPage;
    const currentStart = (currentPage - 1) * jobsPerPage ; 

    
    

    useEffect(() => {
        dispatch(fetchJobs());

        
    }, [currentPage]);
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    };
    


    if (jobsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (jobsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderJobList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="empty">
                    <h5 className="text-center mt-5">No job found</h5>
                </CSSTransition>
            )
        }
        const someText =()=>{
            console.log('some');
        }
        return arr.slice(currentStart, currentEnd)    
            .map(({id, ...props}) => 

                (
                    <CSSTransition 
                        key={id}
                        timeout={500}
                        onClick={someText}
                        classNames="job">
                        
                        <JobsListItem 
                            id={id}
                            {...props} />
                    </CSSTransition>
                )
                
                
            )
    }
    console.log(jobsData);
    const elements = renderJobList(Object.values(jobs));


    
    return (
        <TransitionGroup component="ul">
            <div className="jobList__wrapper">
                {elements}
            </div>
            <Pagination  pageCount={pageCount} currentPage={currentPage} onChangePage={onChangePage}/>
        </TransitionGroup>
        
    )
    
}
export default JobList;