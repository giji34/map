import * as React from "react";

import { isWorld, World } from "./landmark";

type MainState = {
  world: World;
};

export class MainComponent extends React.Component<{}, MainState> {
  constructor(props: {}) {
    super(props);
    this.state = { world: "2434_main" };
  }

  componentDidMount() {
    const params = window.location.hash.split("&");
    let world = this.state.world;
    params.forEach((param) => {
      if (param.startsWith("#")) {
        param = param.substr(1);
      }
      const keyAndValue = param.split("=");
      if (keyAndValue.length !== 2) {
        return;
      }
      const key = keyAndValue[0];
      if (key === "world") {
        const value = keyAndValue[1];
        if (isWorld(value)) {
          world = value;
        }
      }
    });
    this.setState({ world });
  }

  render() {
    const moveTo = (world: World) => {
      return () => {
        this.setState({ world });
      };
    };
    return (
      <>
        <iframe className="frame" src={`/${this.state.world}`} />
        <div className="menu">
          <div className="menuItem">
            <div className="menuItemContent" style={{ fontSize: 18 }}>
              giji34.world
            </div>
          </div>
          <div style={{ width: "30px" }} />
          <div className="menuItem clickable">
            <div className="menuItemContent" onClick={moveTo("2434_main")}>
              にじ鯖メイン
              <span className="pulldownMarker" />
            </div>
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div className="menuItemContent" onClick={moveTo("2434_world06")}>
              にじ鯖新規ワールド
              <span className="pulldownMarker" />
            </div>
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div className="menuItemContent" onClick={moveTo("hololive_00")}>
              旧ホロ鯖
              <span className="pulldownMarker" />
            </div>
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div className="menuItemContent" onClick={moveTo("hololive_01")}>
              新ホロ鯖
              <span className="pulldownMarker" />
            </div>
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div className="menuItemContent" onClick={moveTo("en_hololive")}>
              ENホロ鯖
              <span className="pulldownMarker" />
            </div>
          </div>
          <div className="hspacer" />
        </div>
      </>
    );
  }
}
