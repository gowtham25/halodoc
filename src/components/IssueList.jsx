import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const IssueListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .countDetails {
        text-align: left;
    }
    table {
        border: 1px solid #eaecef;
        tr { 
            &:nth-child(even) {
                background: #f5f8fa;
            }
            td {
                border-top: 1px solid #eaecef;
                padding: 8px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: baseline;
                p {
                    margin: 0;
                    padding: 4px;
                    &.title {
                        font-weight: 600;
                        color: #24292e;
                        font-size: 16px;
                    }
                    &.description {
                        font-size: 12px;
                        color: #586069;
                    }
                }
            }
        }
    }
    .pagination {
        display: flex;
        justify-content: center;
    }
  
    ul {
        list-style: none;
        padding: 0;
    }
  
    ul.pagination li {
        display: inline-block;
        width: 30px;
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        font-size: 25px;
    }
  
    ul.pagination li a {
        text-decoration: none;
        color: #337ab7;
        font-size: 20px;
    }
  
    ul.pagination li.active a {
        color: white;
    }
    ul.pagination li.active {
        background-color: #337ab7;
    }
  
    ul.pagination li a:hover,
    ul.pagination li a.active {
        color: blue;
    }
  
    .page-selection {
        width: 48px;
        height: 30px;
        color: #337ab7;
    }
  
    .pagination-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
`;
const IssueList = () => {
    const [issueList, setIssueList] = useState();
    const [repoDetails, setRepoDetails] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [queryString, setQueryString] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetch(`https://api.github.com/repos/angular/angular`)
            .then(data => data.json())
            .then(data => {
                setRepoDetails(data);
            })

    }, []);

    useEffect(() => {
        fetch(`https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:open&per_page=10&page=${activePage}`)
            .then(data => data.json())
            .then(data => {
                setIssueList(data);
            })
    }, [activePage])
    const { items = [], total_count = 0 } = issueList || {};

    const handlePageChange = (val) => {
        setActivePage(val)
    }

    const handleClickIssue = (num) => {
        history.push(`/${num}`)
    }
    return (
        <IssueListContainer>
            <div className='filter-container'>
                <label>Filter</label><input type='text' value={queryString} onChange={(e) => { setQueryString(e.target.value) }} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            total Issue: {total_count}
                        </td>
                    </tr>
                    {items && items.length > 0 && items.map((iVal, iIndex) => {
                        const { title = '', number = 0, created_at = '', user = {} } = iVal || {};
                        const { login = '' } = user || {};
                        return (
                            <tr onClick={() => handleClickIssue(number)}>
                                <td>
                                    <p className='title'>{title}</p>
                                    <p className='description'>{`#${number} opened ${new Date(created_at).toLocaleDateString()} by ${login}`}</p>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={total_count}
                pageRangeDisplayed={8}
                onChange={handlePageChange}
            />
        </IssueListContainer>
    )
}

export default IssueList;