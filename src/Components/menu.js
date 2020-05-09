import React from "react";
import { Button, Text, Select, Slider } from "./components.js";

class LoadGame extends React.Component {
  constructor() {
    super();
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {
    e.persist();
  }

  render() {
    return (
      <>
        <div>Load Game constructor</div>
        <div className="button" onClick={this.handleEvent}>
          New
        </div>
      </>
    );
  }
}

// new game form
class NewGame extends React.Component {
  constructor() {
    super();
    this.handleEvent = this.onChange.bind(this);
    this.state = {
      ratio: {
        land: 50,
        forest: 30,
        hills: 30,
        mountains: 10
      }
    };
  }

  onChange(item) {
    console.log("Selection...")
    console.log(item);
    console.log(this.state);
    this.setState(item);
    /*
    this.setState({
      name: window.getCompo
    })
    this.props.onSelection({
      numplayers: 4,
      mapSize: "small",
      ratio: this.state.ratio
    });
    */
  }

  render() {
    const playernumber = [1, 2, 3, 4, 5, 6, 7, 8];
    const mapsize = ["small", "medium", "large", "huge"];
    return (
      <>
        <div className="inputmenu">
          <Text onChange={this.onChange} name="name">Player name:</Text>
          <Select items={playernumber} onChange={this.onChange}>Number of players:</Select>
          <Select items={mapsize} onChange={this.onChange}>Map size:</Select>
          <Slider value={this.state.ratio.land} onChange={this.onChange}>Land ratio</Slider>
          <Slider value={this.state.ratio.forest} onChange={this.onChange}>Forest ratio</Slider>
          <Slider value={this.state.ratio.hills} onChange={this.onChange}>Hills ratio</Slider>
          <Slider value={this.state.ratio.mountains} onChange={this.onChange}>Mountains ratio</Slider>
          <Button primary onClick={this.onChange} >Start Game</Button>
        </div>
      </>
    );
  }
}

// meny
export default class Menu extends React.Component {
  // contructor
  constructor() {
    super();
    this.state = { selection: 0 };
    this.callback = null;
    this.onMenuSelection = this.onMenuSelection.bind(this);
    this.onSelection = this.onDataSelection.bind(this);
  }
  // on click event
  onMenuSelection(e) {
    e.persist();
    switch (e.target.innerText) {
      case "New Game":
        this.setState({ selection: 1 });
        break;
      case "Load Game":
        this.setState({ selection: 2 });
        break;
      case "Credits":
        this.setState({ selection: 3 });
        break;
      default:
        break;
    }
  }

  // on data selection
  onDataSelection(p) {
    this.props.useCallback(p);
    //this.callback(p);
  }

  // render m
  render() {
    //this.callback = Object.assign({}, this.props);
    //console.log(this.callback);

    const elements = ["New Game", "Load Game", "Credits"];
    const items = [];
    switch (this.state.selection) {
      case 0:
        // display menu options
        for (const [index, value] of elements.entries()) {
          items.push(
            <li key={index} onClick={this.onMenuSelection}>
              {value}
            </li>
          );
        }
        return (
          <div className="appmenu">
            <ul>{items}</ul>
          </div>
        );
      case 1:
        return <NewGame onSelection={this.onSelection} />;
      case 2:
        return <LoadGame onSelection={this.onSelection} />;
      case 3:
        return "Credits";
      default:
        break;
    }
  }
}
