import React, {useEffect, useState} from "react";
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
  Placeholder
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

import axios from 'axios';

// var info = [];

function HomePanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);
  const [selected, setSelected] = React.useState("new");
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);


  useEffect(() => {
    if(mainStorage.home.length === 0) {
      axios.get('getList').then((res) => {
        setInfo(res.data);
        setInfo2(res.data);
        dispatch(set({key: "home", value: res.data}));
      });
    } else {
      setInfo(mainStorage.home);
      setInfo2(mainStorage.home);
    }
  });

  function report(item) {
    axios.post('report', {id: item.id});
    router.toPopout();
  }

  function openProfile(id) {
    const link = document.createElement('a');
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
          <ActionSheetItem before={<Icon28Profile />} onClick={() => openProfile(item.vk_id)}>
            Открыть профиль ВКонтакте
          </ActionSheetItem>
        )}
        <ActionSheetItem mode="destructive" before={<Icon28ReportOutline />} onClick={() => report(item)}>
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

  async function setLike(item, index) {
    const {data} = await axios.post('like', {
      id: item.id
    });

    setInfo2(data);
  }

  function checkIsLike(item) {
    let isLike = false,
      likes = 0;
    isLike = info2.find((i) => {
      if (i.id === item.id) {
        likes = i.likes;
        return i.isLike
      }
    });
    return {isLike, likes};
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
          {info.length === 0 && (
            <Placeholder>Заглушка загрузки или ничего нет</Placeholder>
          )}
          {info.map((item, index) =>
            <div className={style.blockReviews}>
              <SimpleCell
                description="04.09.2022 в 23:36"
                before={
                  <Avatar
                    badge={<Icon28LogoVkColor width={20} height={20}/>}
                    size={48}
                    src={item.photo_url}
                  />
                }
                disabled
                className={style.simpleCellReview}
                after={
                  <IconButton onClick={(e) => openMore(e, item)}>
                    <Icon28MoreHorizontal/>
                  </IconButton>
                }
              >
                {item.first_name} {item.last_name}
              </SimpleCell>
              <div className={style.textReview}>
                {item.text}
              </div>
              <Spacing size={32}>
                <Separator wide/>
              </Spacing>

              <div className={style.blockButtonReview}>
                <Tappable className={style.buttonReview} onClick={() => setLike(item, index)}>
                  {checkIsLike(item).isLike ? <Icon28FireOutline fill='#FF0000'/> : <Icon28FireOutline/>}
                  <div className={style.countButton}>{checkIsLike(item).likes}</div>
                </Tappable>
                <Tappable
                  onClick={() => shareStory()}
                  className={style.buttonReview}
                >
                  <Icon28StoryOutline/>
                </Tappable>
                <Tappable
                  onClick={() => shareWallPost()}
                  className={style.buttonReview}
                >
                  <Icon28ShareOutline/>
                </Tappable>
              </div>
            </div>
          )}
        </div>
      )}

      {selected === "top" && <div></div>}
    </>
  );
}

export default withRouter(HomePanel);
