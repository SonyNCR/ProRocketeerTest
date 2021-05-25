import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import Detail from "./Detail";
import Edit from "./Edit";
import Create from "./Create";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import { ButtonGroup, ToggleButton, Navbar } from "react-bootstrap";
import { strings } from "./Localization/Localization";

function App() {
  const languages = [
    { name: "English", value: "en" },
    { name: "Czech", value: "cs" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState<string>(strings.getLanguage());
  return (
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light">
        <ButtonGroup toggle>
          {languages.map((language, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              value={language.value}
              checked={selectedLanguage === language.value}
              onChange={(e) => {
                setSelectedLanguage(e.currentTarget.value);
                strings.setLanguage(e.currentTarget.value);
              }}
            >
              {language.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/create" component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
