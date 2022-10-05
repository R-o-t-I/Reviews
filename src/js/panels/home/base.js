import React, { useState } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import bridge from "@vkontakte/vk-bridge";

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
  ActionSheet,
  ActionSheetItem,
} from "@vkontakte/vkui";

import style from "./base.module.scss";

import {
  Icon28CalendarOutline,
  Icon28FireOutline,
  Icon28LogoVkColor,
  Icon28MoreHorizontal,
  Icon28Profile,
  Icon28ReportOutline,
  Icon28ShareOutline,
  Icon28StoryOutline,
} from "@vkontakte/icons";

function HomePanel({ router }) {
  const [selected, setSelected] = React.useState("new");

  async function openMore(e) {
    router.toPopout(
      <ActionSheet
        onClose={() => router.toBack()}
        iosCloseItem={
          <ActionSheetItem autoclose mode="cancel">
            Отменить
          </ActionSheetItem>
        }
        toggleRef={e.currentTarget}
      >
        <ActionSheetItem before={<Icon28Profile />}>
          Открыть профиль ВКонтакте
        </ActionSheetItem>
        <ActionSheetItem mode="destructive" before={<Icon28ReportOutline />}>
          <div className={style.actionDestructive}>Пожаловаться</div>
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function shareWallPost() {
    bridge.send("VKWebAppShowWallPostBox", { message: "Hello!" });
  }

  function shareStory() {
    bridge.send("VKWebAppShowStoryBox", {
      background_type: "image",
      url: "https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg",
    });
  }

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
      {selected === "new" && (
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
              after={
                <IconButton onClick={(e) => openMore(e)}>
                  <Icon28MoreHorizontal />
                </IconButton>
              }
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
              <Tappable
                onClick={() => shareStory()}
                className={style.buttonReview}
              >
                <Icon28StoryOutline />
              </Tappable>
              <Tappable
                onClick={() => shareWallPost()}
                className={style.buttonReview}
              >
                <Icon28ShareOutline />
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
              after={
                <IconButton onClick={(e) => openMore(e)}>
                  <Icon28MoreHorizontal />
                </IconButton>
              }
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
              <Tappable
                onClick={() => shareStory()}
                className={style.buttonReview}
              >
                <Icon28StoryOutline />
              </Tappable>
              <Tappable
                onClick={() => shareWallPost()}
                className={style.buttonReview}
              >
                <Icon28ShareOutline />
              </Tappable>
            </div>
          </div>
        </div>
      )}

      {selected === "top" && <div></div>}
    </>
  );
}

export default withRouter(HomePanel);
