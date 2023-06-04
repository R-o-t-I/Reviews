import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
  SplitCol,
  Panel,
  PanelHeader,
  Group,
  Cell,
  List,
} from "@vkontakte/vkui";
import ThemeControllers from "./themeControllers";
import {
  Icon28ArticleOutline,
  Icon28AddSquareOutline,
  Icon28Profile,
} from "@vkontakte/icons";
import style from "./navigation.module.scss";

function DesktopNavigation({ router }) {
  const hasHeader = useSelector((state) => state.main.hasHeader);
  const mainStorage = useSelector((state) => state.main);

  return (
    <SplitCol fixed width="240px" maxWidth="240px" className={style.splitCol}>
      <Panel id="menuDesktop">
        {hasHeader && <PanelHeader />}
        <div>
          <div style={{ marginTop: 40 }} />
          <List className={style.menuDesktop}>
            <Cell
              onClick={() => router.toView("home")}
              disabled={router.activeView === "home"}
              before={<Icon28ArticleOutline />}
              className={
                router.activeView === "home" ? style.activeViewCell : ""
              }
            >
              Мечты
            </Cell>

            <Cell
              onClick={() => router.toView("add")}
              disabled={router.activeView === "add"}
              before={<Icon28AddSquareOutline />}
              className={
                router.activeView === "add" ? style.activeViewCell : ""
              }
            >
              Добавить
            </Cell>

            <Cell
              onClick={() => router.toView("profile")}
              disabled={router.activeView === "profile"}
              before={<Icon28Profile />}
              className={
                router.activeView === "profile" ? style.activeViewCell : ""
              }
            >
              Профиль
            </Cell>
          </List>
        </div>

        {mainStorage.isAdmin === 1 && <ThemeControllers />}
      </Panel>
    </SplitCol>
  );
}

export default withRouter(DesktopNavigation);
