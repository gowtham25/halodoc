import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';

const IndividualIssueContainer = styled.div`
    display: flex;
    flex-direction: column;
    .header {
        cursor: pointer;
    }
    .content {
        display: flex;
        flex-direction: column;
    }
    .issueDetails {
        flex-grow: 1;
        .descrition {
            h4 {
                text-align: left;
                margin-bottom: 4px;
            }
            p{
                word-break: break-all;
                text-align: left;
            }
        }
    }
`;
const IndividualIssue = () => {
    const [issetDet, setIssueDet] = useState({});
    let { number } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`https://api.github.com/repos/angular/angular/issues/${number}`)
            .then(data => data.json())
            .then(data => {
                setIssueDet(data);
            })
    }, [number]);
    console.log(issetDet);
    const handleGoHome = () => {
        history.push(`/`)
    }
    const { body = '' } = issetDet || {};
    return (
        <IndividualIssueContainer>
            <div className='header' onClick={() => { handleGoHome() }}>Go Home</div>
            <div className='content'>
                <div className='issueDetails'>
                    <div className='descrition'>
                        <h4>Description</h4>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: body || `No description found`,
                            }}
                        />
                    </div>
                </div>
                <div className='other-details'>
                    labels
            </div>
            </div>
        </IndividualIssueContainer>
    )
}

export default IndividualIssue;