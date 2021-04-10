import * as React from "react";
import { FC, useEffect, useState } from "react";

import { isWorld, World, worldToString } from "./world";

export const MainComponent: FC = () => {
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
        {[
          "2434_main",
          "2434_world06",
          "hololive_00",
          "hololive_01",
          "en_hololive",
          "sightseeing",
        ].map((w: World, index: number) => {
          return (
            <>
              <div
                className="menuItem clickable"
                data-selected={world === w}
                key={index}
              >
                <div className="menuItemContent" onClick={moveTo(w)}>
                  {worldToString(w)}
                </div>
              </div>
              <div style={{ width: "10px" }} />
            </>
          );
        })}
        <div className="hspacer" />
      </div>
    </>
  );
};
