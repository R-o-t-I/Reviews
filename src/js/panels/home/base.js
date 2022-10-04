import React, { useState } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
  PanelHeader,
  Avatar,
  SimpleCell,
  Spacing,
  Separator,
  IconButton,
  Tappable,
  Tabs,
  HorizontalScroll,
  TabsItem,
} from "@vkontakte/vkui";

import style from "./base.module.scss";
import {
  Icon28CalendarOutline,
  Icon28FireOutline,
  Icon28LogoVkColor,
  Icon28MoreHorizontal,
  Icon28ReportOutline,
  Icon28ShareOutline,
  Icon28StoryOutline,
} from "@vkontakte/icons";

function HomePanel({ router }) {
  const [selected, setSelected] = React.useState("new");

  return (
    <>
      <PanelHeader separator={false}>Главная</PanelHeader>
      <div className={style.tabs}>
        <Tabs mode="accent">
          <HorizontalScroll arrowSize="m">
            <TabsItem
              selected={selected === "new"}
              onClick={() => setSelected("new")}
              before={<Icon28CalendarOutline width={20} height={20} />}
            >
              Новые
            </TabsItem>
            <TabsItem
              selected={selected === "top"}
              onClick={() => setSelected("top")}
              before={<Icon28FireOutline width={20} height={20} />}
            >
              Популярные
            </TabsItem>
          </HorizontalScroll>
        </Tabs>
      </div>
      <div className={style.allBlockReviews}>
        <div className={style.blockReviews}>
          <SimpleCell
            description="04.09.2022 в 23:36"
            before={
              <Avatar
                badge={<Icon28LogoVkColor width={20} height={20} />}
                size={48}
              />
            }
            disabled
            className={style.simpleCellReview}
          >
            Name
          </SimpleCell>
          <div className={style.textReview}>
            Я мечтаю бла бла бла бла бла блаЯ мечтаю бла бла бла бла бла блаЯ
            мечтаю бла бла бла бла бла бла
          </div>
          <Spacing size={32}>
            <Separator wide />
          </Spacing>

          <div className={style.blockButtonReview}>
            <Tappable className={style.buttonReview}>
              <Icon28FireOutline />
              <div className={style.countButton}>123</div>
            </Tappable>
            <Tappable className={style.buttonReview}>
              <Icon28StoryOutline />
            </Tappable>
            <Tappable className={style.buttonReview}>
              <Icon28ShareOutline />
            </Tappable>
            <Tappable className={style.buttonReview}>
              <Icon28ReportOutline />
            </Tappable>
          </div>
        </div>
        <div className={style.blockReviews}>
          <SimpleCell
            description="04.09.2022 в 23:36"
            before={
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/4123/4123763.png"
                size={48}
              />
            }
            disabled
            className={style.simpleCellReview}
          >
            Анонимный пользователь
          </SimpleCell>
          <div className={style.textReview}>
            Я мечтаю бла бла бла бла бла блаЯ мечтаю бла бла бла бла
          </div>
          <Spacing size={32}>
            <Separator wide />
          </Spacing>
          <div className={style.blockButtonReview}>
            <Tappable className={style.buttonReview}>
              <Icon28FireOutline />
              <div className={style.countButton}>123</div>
            </Tappable>
            <Tappable className={style.buttonReview}>
              <Icon28StoryOutline />
            </Tappable>
            <Tappable className={style.buttonReview}>
              <Icon28ShareOutline />
            </Tappable>
            <Tappable className={style.buttonReview}>
              <Icon28ReportOutline />
            </Tappable>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(HomePanel);
