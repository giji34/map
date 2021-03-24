import * as React from "react";
import { createRef, RefObject } from "react";
import { sprintf } from "sprintf-js";

import { Dimension, isWorld, World } from "./landmark";
import { kLandmarksRightBottom, kLandmarksTopLeft } from "./landmarks/const";
import { clamp } from "./number";
import { Point } from "./point";

type Menu = World;

type MainState = {
  center: Point;
  blocksPerPixel: number;
  isBillboardsVisible: boolean;
  billboardsVisibilityChangedTimestamp: number;
  activeMenu: Menu | undefined;
  attensionPopupVisible: boolean;
  coordinateLabelVisible: boolean;
  dimension: Dimension;
  world: World;
};

function createMainState(
  center: Point = new Point(0, 0),
  blocksPerPixel: number = 1,
  isBillboardsVisible: boolean = true,
  billboardsVisibilityChangedTimestamp: number = 0,
  activeMenu: Menu | undefined = void 0,
  attensionPopupVisible: boolean = true,
  coordinateLabelVisible: boolean = true,
  dimension: Dimension = Dimension.Overworld,
  world: World = "2434_main"
): MainState {
  return {
    center: center.clone(),
    blocksPerPixel,
    isBillboardsVisible,
    billboardsVisibilityChangedTimestamp,
    activeMenu,
    attensionPopupVisible,
    coordinateLabelVisible,
    dimension,
    world,
  };
}

function mergeMainState(
  current: MainState,
  update: Partial<MainState>
): MainState {
  let dimension = update.dimension;
  if (dimension !== void 0) {
    if (
      dimension !== Dimension.Overworld &&
      dimension !== Dimension.TheNether &&
      dimension !== Dimension.TheEnd
    ) {
      delete update.dimension;
    }
  }
  dimension = update.dimension || current.dimension;
  const world: World = update.world || current.world;
  if (
    update.center ||
    world !== current.world ||
    dimension !== current.dimension
  ) {
    let center = update.center || current.center;
    const topLeft = kLandmarksTopLeft.get(world)!.get(dimension)!;
    const rightBottom = kLandmarksRightBottom.get(world)!.get(dimension)!;
    update.center = new Point(
      clamp(center.x, topLeft.x, rightBottom.x),
      clamp(center.z, topLeft.z, rightBottom.z)
    );
  }
  let blocksPerPixel = update.blocksPerPixel;
  if (blocksPerPixel) {
    update.blocksPerPixel = clamp(
      blocksPerPixel,
      MainComponent.MIN_BLOCKS_PER_PIXEL,
      MainComponent.MAX_BLOCKS_PER_PIXEL
    );
  }
  return Object.assign({}, current, update);
}

type JumpToButton = {
  world: World;
  location: Point;
  label: string;
  dimension: Dimension;
};

const k2434MainButtons: JumpToButton[] = [
  {
    world: "2434_main",
    location: new Point(179, 24),
    dimension: Dimension.Overworld,
    label: "中央都市",
  },
  {
    world: "2434_main",
    location: new Point(-1496, 1395),
    dimension: Dimension.Overworld,
    label: "にじさんじランド",
  },
  {
    world: "2434_main",
    location: new Point(-30022, -20180),
    dimension: Dimension.Overworld,
    label: "新天地",
  },
  {
    world: "2434_main",
    location: new Point(-4781, 4843),
    dimension: Dimension.Overworld,
    label: "🌸ンボ村",
  },
  {
    world: "2434_main",
    location: new Point(0, 0),
    dimension: Dimension.TheNether,
    label: "ネザー",
  },
  {
    world: "2434_main",
    location: new Point(0, 0),
    dimension: Dimension.TheEnd,
    label: "ジ・エンド",
  },
];
const k2434World06Buttons: JumpToButton[] = [
  {
    world: "2434_world06",
    location: new Point(61, -174),
    dimension: Dimension.Overworld,
    label: "オーバーワールド",
  },
];
const kHololive01Buttons: JumpToButton[] = [
  {
    world: "hololive_01",
    location: new Point(268, -204),
    dimension: Dimension.Overworld,
    label: "オーバーワールド",
  },
  {
    world: "hololive_01",
    location: new Point(42, -60),
    dimension: Dimension.TheNether,
    label: "ネザー",
  },
];

const kEnHololiveButtons: JumpToButton[] = [
  {
    world: "en_hololive",
    location: new Point(350, -501),
    dimension: Dimension.Overworld,
    label: "オーバーワールド",
  },
  {
    world: "en_hololive",
    location: new Point(49, -58),
    dimension: Dimension.TheNether,
    label: "ネザー",
  },
];

const kHololive00Buttons: JumpToButton[] = [
  {
    world: "hololive_00",
    location: new Point(-47, -136),
    dimension: Dimension.Overworld,
    label: "オーバーワールド",
  },
];

export class MainComponent extends React.Component<{}, MainState> {
  private readonly menu: RefObject<HTMLDivElement> = createRef();
  static readonly MIN_BLOCKS_PER_PIXEL = 0.125;
  static readonly MAX_BLOCKS_PER_PIXEL = 32;
  private isRedrawNeeded = true;
  private pinchStartBlocksPerPixel: number = 1;
  private fragmentUpdateTimer: number | undefined;
  private showWorldBorder: boolean = false;

  constructor(props: {}) {
    super(props);
    this.state = createMainState();
    window.addEventListener("resize", () => {
      this.setState(this.state);
    });
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.key.toLowerCase() !== "b") {
        return;
      }
      this.showWorldBorder = true;
      this.isRedrawNeeded = true;
    });
    window.addEventListener("keyup", (ev: KeyboardEvent) => {
      if (ev.key.toLowerCase() !== "b") {
        return;
      }
      this.showWorldBorder = false;
      this.isRedrawNeeded = true;
    });
  }

  componentDidMount() {
    const params = window.location.hash.split("&");
    let x = this.state.center.x;
    let z = this.state.center.z;
    let blocksPerPixel = this.state.blocksPerPixel;
    let dimension = this.state.dimension;
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
      } else {
        const value = parseFloat(keyAndValue[1]);
        if (isNaN(value)) {
          return;
        }
        if (key === "x") {
          x = value;
        } else if (key === "z") {
          z = value;
        } else if (key === "scale") {
          blocksPerPixel = clamp(
            value,
            MainComponent.MIN_BLOCKS_PER_PIXEL,
            MainComponent.MAX_BLOCKS_PER_PIXEL
          );
        } else if (key === "dimension") {
          switch (value) {
            case 0:
              dimension = Dimension.Overworld;
              break;
            case 1:
              dimension = Dimension.TheEnd;
              break;
            case -1:
              dimension = Dimension.TheNether;
              break;
          }
        }
      }
    });
    this.pinchStartBlocksPerPixel = blocksPerPixel;
    this.setState(
      mergeMainState(this.state, {
        center: new Point(x, z),
        blocksPerPixel,
        dimension,
        world,
      })
    );
    this.fragmentUpdateTimer = window.setInterval(() => {
      const hash = sprintf(
        "#world=%s&x=%.1f&z=%.1f&scale=%.2f&dimension=%d",
        this.state.world,
        this.state.center.x,
        this.state.center.z,
        this.state.blocksPerPixel,
        this.state.dimension
      );
      if (hash !== window.location.hash) {
        window.history.replaceState(void 0, "", hash);
      }
    }, 500);
    window.addEventListener("wheel", this.wheelDisabledHandler, {
      passive: false,
    });
    this.menu.current!.addEventListener("wheel", this.wheelDisabledHandler, {
      passive: false,
    });
  }

  private readonly wheelDisabledHandler = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const moveTo = (world: World, point: Point, dimension: Dimension) => {
      return () => {
        this.setState(
          mergeMainState(this.state, {
            center: point,
            dimension,
            activeMenu: void 0,
            world,
          })
        );
      };
    };
    const onClickJumpTo = (world: World) => () => {
      if (this.state.activeMenu === world) {
        this.setState(mergeMainState(this.state, { activeMenu: void 0 }));
      } else {
        this.setState(mergeMainState(this.state, { activeMenu: world }));
      }
    };
    return (
      <>
        <div className="menu" ref={this.menu}>
          <div className="menuItem">
            <div className="menuItemContent" style={{ fontSize: 18 }}>
              giji34.world
            </div>
          </div>
          <div style={{ width: "30px" }} />
          <div className="menuItem clickable">
            <div
              className="menuItemContent"
              onClick={onClickJumpTo("2434_main")}
            >
              にじ鯖メイン
              <span className="pulldownMarker" />
            </div>
            {this.state.activeMenu === "2434_main" && (
              <div className="dropdownMenu">
                {k2434MainButtons.map((button) => (
                  <div className="menuItem">
                    <div
                      className="menuItemContent menuItemBorder"
                      onClick={moveTo(
                        button.world,
                        button.location,
                        button.dimension
                      )}
                    >
                      {button.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div
              className="menuItemContent"
              onClick={onClickJumpTo("2434_world06")}
            >
              にじ鯖新規ワールド
              <span className="pulldownMarker" />
            </div>
            {this.state.activeMenu === "2434_world06" && (
              <div className="dropdownMenu">
                {k2434World06Buttons.map((button) => (
                  <div className="menuItem">
                    <div
                      className="menuItemContent menuItemBorder"
                      onClick={moveTo(
                        button.world,
                        button.location,
                        button.dimension
                      )}
                    >
                      {button.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div
              className="menuItemContent"
              onClick={onClickJumpTo("hololive_00")}
            >
              旧ホロ鯖
              <span className="pulldownMarker" />
            </div>
            {this.state.activeMenu === "hololive_00" && (
              <div className="dropdownMenu">
                {kHololive00Buttons.map((button) => (
                  <div className="menuItem">
                    <div
                      className="menuItemContent menuItemBorder"
                      onClick={moveTo(
                        button.world,
                        button.location,
                        button.dimension
                      )}
                    >
                      {button.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div
              className="menuItemContent"
              onClick={onClickJumpTo("hololive_01")}
            >
              新ホロ鯖
              <span className="pulldownMarker" />
            </div>
            {this.state.activeMenu === "hololive_01" && (
              <div className="dropdownMenu">
                {kHololive01Buttons.map((button) => (
                  <div className="menuItem">
                    <div
                      className="menuItemContent menuItemBorder"
                      onClick={moveTo(
                        button.world,
                        button.location,
                        button.dimension
                      )}
                    >
                      {button.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ width: "10px" }} />
          <div className="menuItem clickable">
            <div
              className="menuItemContent"
              onClick={onClickJumpTo("en_hololive")}
            >
              ENホロ鯖
              <span className="pulldownMarker" />
            </div>
            {this.state.activeMenu === "en_hololive" && (
              <div className="dropdownMenu">
                {kEnHololiveButtons.map((button) => (
                  <div className="menuItem">
                    <div
                      className="menuItemContent menuItemBorder"
                      onClick={moveTo(
                        button.world,
                        button.location,
                        button.dimension
                      )}
                    >
                      {button.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hspacer" />
        </div>
      </>
    );
  }
}
