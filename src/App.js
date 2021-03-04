import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./Component/DashBoard/DashBoard.jsx";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={DashBoard} />
			</Switch>
		</Router>
	);
}

export default App;
