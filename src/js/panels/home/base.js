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
  VKCOM,
  Snackbar
} from "@vkontakte/vkui";

import style from "./base.module.scss";

import {
  Icon16Fire,
  Icon16Like,
  Icon28CalendarOutline,
  Icon28FireOutline,
  Icon28LogoVkColor,
  Icon28MagicWandOutline,
  Icon28MoreHorizontal,
  Icon28Profile,
  Icon28ReportOutline,
  Icon28ShareOutline,
  Icon28StarsOutline,
  Icon28StoryOutline,
} from "@vkontakte/icons";

import { set } from "../../reducers/mainReducer";

import axios from "axios";

function HomePanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const [selected, setSelected] = React.useState("new");
  const [snackbar, setSnackbar] = useState(null);
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
      if(res.data.status) {
        setInfo(res.data);
        setInfo2(res.data);
        dispatch(set({key: "home", value: res.data}));
      } else {
        router.toPopout(<Snackbar onClose={() => router.toPopout()}>{res.data.info}</Snackbar>);
      }
    });
  }

  function timeConverterDaily(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp),
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
    //axios.post("report", { id: item.id });
    dispatch(set({ key: "report_id", value: item.id }));
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
            before={<Icon28MagicWandOutline />}
            onClick={() => {
              router.toModal("helped");
              dispatch(set({ key: 'help', value: item }));
            }}
            autoclose
          >
            Помочь с мечтой
          </ActionSheetItem>
        <ActionSheetItem
          mode="destructive"
          before={<Icon28ReportOutline />}
          onClick={() => report(item)}
          autoclose
        >
          <div className={style.actionDestructive}>Пожаловаться</div>
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function shareWallPost(item, index) {
    bridge.send("VKWebAppShowWallPostBox", {
      message: `Пользователь ${item.first_name} ${item.last_name} оставил мечту: "${item.text}"\n\nБольше мечтаний в приложении: vk.com/app51456689`,
    });
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

    if(data.status) {

      setInfo(data);
      console.log(selected);
      reverseList(selected);
      dispatch(set({key: "home", value: data}));
    } else {
      router.toPopout(<Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>);
    }
  }

  return (
    <>
      <PanelHeader separator={false}>Главная</PanelHeader>
      <div className={style.tabs}>
        <Tabs mode="accent">
          <HorizontalScroll arrowSize="m">
            <TabsItem
              selected={mainStorage.home_tab === "new"}
              onClick={() => {
                dispatch(set({ key: "home_tab", value: "new" }));
                reverseList("new");
                setSelected("new");
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
                setSelected("likes");
              }}
              before={<Icon28FireOutline width={20} height={20} />}
            >
              Популярные
            </TabsItem>
            {mainStorage.isAdmin === 1 && (
              <TabsItem
                selected={mainStorage.home_tab === "comeTrue"}
                onClick={() => {
                  dispatch(set({ key: "home_tab", value: "comeTrue" }));
                  reverseList("comeTrue");
                }}
                before={<Icon28StarsOutline width={20} height={20} />}
              >
                Сбывшиеся
              </TabsItem>
            )}
          </HorizontalScroll>
        </Tabs>
      </div>
      <div className={style.allBlockReviews}>
        {info.length === 0 && (
          <div className={style.blockReviews}>
            <Placeholder>Загружаем мечты...</Placeholder>
          </div>
        )}
        {info.map((item, index) => (
          <div className={style.blockReviews}>
            <SimpleCell
              multiline
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
                onClick={() => setLike(item, selected)}
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
              {item.isPerform && (
                <Tappable
                  onClick={ async () => {
                    const {data} = await axios.post("getHelper", {
                      id: item.id
                    });
                    if(data.status) {

                      dispatch(set({key: 'helper', value: data[0]}));
                      router.toModal("helper");
                    } else {
                      router.toPopout(<Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>)
                    }
                  }}
                  className={style.buttonReviewRight}
                >
                  <Icon28StarsOutline />
                  {platform === VKCOM && (
                    <div className={style.textButtonHelped}>Мечта сбылась</div>
                  )}
                </Tappable>
              )}
            </div>
          </div>
        ))}
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(HomePanel);
