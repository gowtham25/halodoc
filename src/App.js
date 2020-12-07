import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import './App.css';
import IndividualIssue from './components/IndividualIssue';
import IssueList from './components/IssueList';

const AppContainer = styled.div`

`;

function App() {
	return (
		<AppContainer className="App">
			<Router>
				<Switch>
					<Route path="/:number">
						<IndividualIssue />
					</Route>
					<Route path="/">
						<IssueList />
					</Route>
				</Switch>
			</Router >

		</AppContainer >
	);
}

export default App;
