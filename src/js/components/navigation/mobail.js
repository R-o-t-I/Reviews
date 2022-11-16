import React from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
  Icon28AddSquareOutline,
  Icon28ArticleOutline,
  Icon28Profile,
} from "@vkontakte/icons";

function MobailNavigation({ router }) {
  function openView(view) {
    let nowView = router.activeView;
    router.toView(view);

    if (view === nowView) {
      router.toHash(`${view}/base`);
    }
  }

  return (
    <Tabbar className="tabbarStyle">
      <TabbarItem
        selected={router.activeView === "home"}
        onClick={() => openView("home")}
        text="Мечты"
      >
        <Icon28ArticleOutline />
      </TabbarItem>

      <TabbarItem
        data-id="add"
        selected={router.activeView === "add"}
        onClick={() => openView("add")}
        text="Добавить"
      >
        <Icon28AddSquareOutline />
      </TabbarItem>

      <TabbarItem
        data-id="profile"
        selected={router.activeView === "profile"}
        onClick={() => openView("profile")}
        text="Профиль"
      >
        <Icon28Profile />
      </TabbarItem>
    </Tabbar>
  );
}

export default withRouter(MobailNavigation);
