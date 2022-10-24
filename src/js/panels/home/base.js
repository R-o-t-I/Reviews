import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Placeholder,
} from "@vkontakte/vkui";

import style from "./base.module.scss";

import {
  Icon16Fire,
  Icon16Like,
  Icon28CalendarOutline,
  Icon28FireOutline,
  Icon28LogoVkColor,
  Icon28MoreHorizontal,
  Icon28Profile,
  Icon28ReportOutline,
  Icon28ShareOutline,
  Icon28StoryOutline,
} from "@vkontakte/icons";

import { set } from "../../reducers/mainReducer";

import axios from "axios";

// var info = [];

function HomePanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);
  const [selected, setSelected] = React.useState("new");
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);

  useEffect(() => {
    if (mainStorage.home.length === 0) {
      getList("new");
    } else {
      setInfo(mainStorage.home);
      setInfo2(mainStorage.home);
    }
  });

  function getList(type) {
    axios.get("getList?type=" + type).then((res) => {
      setInfo(res.data);
      setInfo2(res.data);
      dispatch(set({ key: "home", value: res.data }));
    });
  }

  function timeConverterDaily(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000),
      months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ],
      month = months[a.getMonth()],
      year = a.getFullYear(),
      date = a.getDate(),
      time = date + " " + month + " 2022";
    return time;
  }

  function report(item) {
    axios.post("report", { id: item.id });
    router.toModal("report");
  }

  function openProfile(id) {
    const link = document.createElement("a");
    link.href = "https://vk.com/id" + id;
    link.target = "_black";
    link.click();
  }

  async function openMore(e, item) {
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
        {item.vk_id !== 0 && (
          <ActionSheetItem
            before={<Icon28Profile />}
            onClick={() => openProfile(item.vk_id)}
          >
            Открыть профиль ВКонтакте
          </ActionSheetItem>
        )}
        <ActionSheetItem
          mode="destructive"
          before={<Icon28ReportOutline />}
          onClick={mainStorage.isAdmin === 1 && (() => report(item))}
          href="https://vk.me/skyreglis"
          target="_blank"
          autoclose
        >
          <div className={style.actionDestructive}>Пожаловаться</div>
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function shareWallPost(item, index) {
    bridge.send("VKWebAppShowWallPostBox", { message: `${item.text}` });
  }

  function shareStory() {
    bridge.send("VKWebAppShowStoryBox", {
      background_type: "image",
      url: "https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg",
    });
  }

  function reverseList(type) {
    let new_info = [...info];
    if (type === "likes") {
      setInfo(new_info.sort((a, b) => b.likes - a.likes));
      setInfo2(new_info.sort((a, b) => b.likes - a.likes));
      dispatch(
        set({ key: "home", value: new_info.sort((a, b) => b.likes - a.likes) })
      );
    } else {
      setInfo(new_info.sort((a, b) => b.id - a.id));
      setInfo2(new_info.sort((a, b) => b.id - a.id));
      dispatch(
        set({ key: "home", value: new_info.sort((a, b) => b.id - a.id) })
      );
    }
  }

  async function setLike(item, type) {
    const { data } = await axios.post("like?type=" + type, {
      id: item.id,
    });

    setInfo(data);
    dispatch(set({ key: "home", value: data }));
  }

  return (
    <>
      <PanelHeader separator={false}>Главная</PanelHeader>
      {mainStorage.isAdmin === 1 && (
        <div className={style.tabs}>
          <Tabs mode="accent">
            <HorizontalScroll arrowSize="m">
              <TabsItem
                selected={mainStorage.home_tab === "new"}
                onClick={() => {
                  dispatch(set({ key: "home_tab", value: "new" }));
                  reverseList("new");
                }}
                before={<Icon28CalendarOutline width={20} height={20} />}
              >
                Новые
              </TabsItem>
              <TabsItem
                selected={mainStorage.home_tab === "likes"}
                onClick={() => {
                  dispatch(set({ key: "home_tab", value: "likes" }));
                  reverseList("likes");
                }}
                before={<Icon28FireOutline width={20} height={20} />}
              >
                Популярные
              </TabsItem>
            </HorizontalScroll>
          </Tabs>
        </div>
      )}
      <div className={style.allBlockReviews}>
        {info.length === 0 && (
          <div className={style.blockReviews}>
            <Placeholder>Загружаем мечты...</Placeholder>
          </div>
        )}
        {info.map((item, index) => (
          <div className={style.blockReviews}>
            <SimpleCell
              description={timeConverterDaily(item.timestamp)}
              before={
                <Avatar
                  badge={<Icon28LogoVkColor width={20} height={20} />}
                  size={48}
                  src={item.photo_url}
                />
              }
              disabled
              className={style.simpleCellReview}
              after={
                <IconButton onClick={(e) => openMore(e, item)}>
                  <Icon28MoreHorizontal />
                </IconButton>
              }
            >
              {item.first_name} {item.last_name}
            </SimpleCell>
            <div className={style.textReview}>{item.text}</div>
            <Spacing size={32}>
              <Separator wide />
            </Spacing>

            <div className={style.blockButtonReview}>
              <Tappable
                className={style.buttonReview}
                onClick={() => setLike(item, index)}
              >
                {item.isLike ? (
                  <Icon28FireOutline fill="#FF0000" />
                ) : (
                  <Icon28FireOutline />
                )}
                <div className={style.countButton}>{item.likes}</div>
              </Tappable>
              {mainStorage.isAdmin === 1 && (
                <Tappable
                  onClick={() => shareStory()}
                  className={style.buttonReview}
                >
                  <Icon28StoryOutline />
                </Tappable>
              )}
              <Tappable
                onClick={() => shareWallPost(item)}
                className={style.buttonReview}
              >
                <Icon28ShareOutline />
              </Tappable>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default withRouter(HomePanel);
