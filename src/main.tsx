import * as React from "react";

import { isWorld, World } from "./landmark";
import { FC, useEffect, useState } from "react";

type MainState = {
  world: World;
};

export const MainComponent: FC<MainState> = ({}) => {
  const [world, setWorld] = useState<World>(() => {
    const params = window.location.search.split("&");
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (param.startsWith("?")) {
        param = param.substr(1);
      }
      const keyAndValue = param.split("=");
      if (keyAndValue.length !== 2) {
        continue;
      }
      const key = keyAndValue[0];
      if (key === "world") {
        const value = keyAndValue[1];
        if (isWorld(value)) {
          return value;
        }
      }
    }
    return "2434_main";
  });
  useEffect(() => {
    window.history.replaceState(null, document.title, `?world=${world}`);
  }, [world]);
  const moveTo = (world: World) => {
    return () => {
      setWorld(world);
    };
  };
  return (
    <>
      <iframe className="frame" src={`/${world}/`} />
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
          </div>
        </div>
        <div style={{ width: "10px" }} />
        <div className="menuItem clickable">
          <div className="menuItemContent" onClick={moveTo("2434_world06")}>
            にじ鯖新規ワールド
          </div>
        </div>
        <div style={{ width: "10px" }} />
        <div className="menuItem clickable">
          <div className="menuItemContent" onClick={moveTo("hololive_00")}>
            旧ホロ鯖
          </div>
        </div>
        <div style={{ width: "10px" }} />
        <div className="menuItem clickable">
          <div className="menuItemContent" onClick={moveTo("hololive_01")}>
            新ホロ鯖
          </div>
        </div>
        <div style={{ width: "10px" }} />
        <div className="menuItem clickable">
          <div className="menuItemContent" onClick={moveTo("en_hololive")}>
            ENホロ鯖
          </div>
        </div>
        <div className="menuItem clickable">
          <div className="menuItemContent" onClick={moveTo("sightseeing")}>
            観光鯖
          </div>
        </div>
        <div className="hspacer" />
      </div>
    </>
  );
};

// export class MainComponent_ extends React.Component<{}, MainState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = { world: "2434_main" };
//   }
//
//   componentDidMount() {
//     this.setState({ world });
//   }
//
//   render() {
//   }
// }
