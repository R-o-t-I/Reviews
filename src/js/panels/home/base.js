import React, { useEffect, useState, useCallback } from "react";
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
  Snackbar,
  Link,
  Spinner,
  Div,
  PromoBanner,
} from "@vkontakte/vkui";

import style from "./base.module.scss";

import {
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
  Icon16Fire,
} from "@vkontakte/icons";

import IconWrapper20 from "../../../img/iconWrapper/IconWrapper20";

import Icon16OKLogoColor from "../../../img/icons/icon16/Icon16OKLogoColor";

import { set } from "../../reducers/mainReducer";

import axios from "axios";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const client = urlParams.get("vk_client");

function HomePanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const [selected, setSelected] = React.useState("new");
  const [snackbar, setSnackbar] = useState(null);
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);
  const [status, setStatus] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [isAdd, setisAdd] = useState(false);
  const [ads, setAds] = useState({});
  const [isPromo, setIsPromo] = useState(true);

  useEffect(() => {
    console.log("PLATFORM");
    console.log(platform);
    getAds();
  }, []);

  function getAds() {
    bridge.send('VKWebAppShowBannerAd', {
      banner_location: 'bottom'
    })
      .then((data) => {
        if (data.result) {
          console.log(data);
          console.log('Баннерная реклама отобразилась');
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  window.onscroll = function () {
    let scrolled = window.pageYOffset;
    if (Number(scrolled) - Number(scroll) > 5000) {
      setSpinner(true);
      setScroll(scrolled);
      getList(selected);
    }
  };

  useEffect(() => {
    if (!status && mainStorage.home.length === 0) {
      getList("new");
      setStatus(true);
    } else {
      setInfo(mainStorage.home);
      setInfo2(mainStorage.home2);
      setStatus(true);
    }
  });

  function getList(type) {
    let url = "getList?type=" + type + "&offset=0";
    if (info.length !== 0)
      url = "getList?type=" + type + "&offset=" + info.length;
    axios
      .get(url)
      .then((res) => {
        if (res.data.length >= 0) {
          let copy = [...info];
          res.data.sort((a, b) => b.id - a.id);
          res.data.forEach((item) => {
            copy.push(item);
          });
          setInfo(copy);
          setInfo2(copy);
          dispatch(set({ key: "home", value: copy }));
          dispatch(set({ key: "home2", value: copy }));
          dispatch(set({ key: "home_sort", value: copy }));
        } else {
          router.toPopout(
            <Snackbar onClose={() => router.toPopout()}>
              {res.data.info}
            </Snackbar>
          );
        }
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        router.toPopout(
          <Snackbar
            before={
              <Link href="https://vk.com/skyreglis" target="_blank">
                Написать
              </Link>
            }
            onClose={() => router.toPopout()}
          >
            Что-то сломалось. Напишите нам об этом
          </Snackbar>
        );
        setSpinner(false);
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
      time = date + " " + month + " " + year;
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

  function openProfileOK(id) {
    const link = document.createElement("a");
    link.href = "https://ok.ru/profile/" + id;
    link.target = "_black";
    link.click();
  }

  async function openMore(e, item, index) {
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
            onClick={
              item.client === "vk"
                ? () => openProfile(item.vk_id)
                : () => openProfileOK(item.vk_id)
            }
            multiline
          >
            {item.client === "vk"
              ? "Открыть профиль ВКонтакте"
              : "Открыть профиль в Одноклассниках"}
          </ActionSheetItem>
        )}
        {/*
        <ActionSheetItem
          before={<Icon28MagicWandOutline />}
          onClick={() => {
            console.log(item.isSetPerform);
            if (!item.isSetPerform) {
              dispatch(set({ key: "help", value: item }));
              router.toModal("helped");
            } else {
              let newArray = []
              info.forEach( (inf, index) => {
                newArray[index] = {...inf}
              });
              newArray[index].isSetPerform = false;
              setInfo(newArray)
            }
          }}
          autoclose
          multiline
        >
          {!item.isSetPerform ? "Помочь с мечтой" : "Отменить помощь"}
        </ActionSheetItem>
        */}
        <ActionSheetItem
          mode="destructive"
          before={<Icon28ReportOutline />}
          onClick={() => report(item)}
          autoclose
          multiline
        >
          <div className={style.actionDestructive}>Пожаловаться</div>
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function shareWallPost(item, index) {
    bridge.send("VKWebAppShowWallPostBox", {
      message: `Пользователь ${item.first_name} ${
        item.last_name
      } оставил мечту: "${item.text}"\n\nБольше мечтаний в приложении: ${
        client !== "ok" ? "https://vk.com/dreams" : "https://ok.ru/app/dreams"
      }`,
    });
  }

  function shareStory() {
    bridge.send("VKWebAppShowStoryBox", {
      background_type: "image",
      url: "https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg",
    });
  }

  function reverseList(type, array) {
    let new_info;

    if (type === "comeTrue") new_info = [...info];
    else if (type === "likes") new_info = [...mainStorage.home_sort];
    else new_info = [...mainStorage.home2];

    if (type === "likes") {
      setInfo(new_info);
      //setInfo2(new_info.sort((a, b) => b.likes - a.likes));
      dispatch(
        set({ key: "home", value: new_info.sort((a, b) => b.likes - a.likes) })
      );
      console.log(info[0].first_name);
    } else if (type === "new") {
      setInfo(new_info.sort((a, b) => b.id - a.id));
      //setInfo2(new_info.sort((a, b) => b.id - a.id));
      dispatch(
        set({ key: "home", value: new_info.sort((a, b) => b.id - a.id) })
      );
    } else {
      let info_sort = [];
      for (let item of new_info) {
        if (item.isPerform) {
          info_sort.push(item);
        }
      }
      setInfo(info_sort);
      dispatch(set({ key: "home", value: info_sort }));
    }
  }

  async function setLike(item, type, index, info) {
    const { data } = await axios.post("like?type=" + type, {
      id: item.id,
    });

    let array = [];
    mainStorage.home2.forEach((inf, index) => {
      array[index] = { ...inf };
    });

    if (type === "likes") {
      array = array.sort((a, b) => b.likes - a.likes);
    }

    if (data.info === "Вы поставили лайк!") {
      array[index].likes = data.count;
      array[index].isLike = true;
    } else {
      array[index].likes = data.count;
      array[index].isLike = false;
    }

    if (selected === "comeTrue") {
      let info_sort = [];
      for (let item of array) {
        if (item.isPerform) {
          info_sort.push(item);
        }
      }

      for (let obj of info_sort) {
        if (Number(obj.id) === Number(item.id)) {
          obj.likes = array[index].likes;
          obj.isLike = array[index].isLike;
        }
      }

      setInfo(info_sort);
      setInfo2(info_sort);
      dispatch(set({ key: "home", value: info_sort }));
      dispatch(set({ key: "home2", value: array }));
    } else {
      setInfo(array);
      setInfo2(array);
      dispatch(set({ key: "home", value: array }));
      dispatch(set({ key: "home2", value: array }));
      // dispatch(set({key: "home_sort", value: array.sort((a, b) => b.likes - a.likes)}));
      // if (type === "likes") reverseList("likes", mainStorage.home2);
    }

    router.toPopout(
      <Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>
    );
  }

  return (
    <>
      <PanelHeader separator={false}>Мечты</PanelHeader>
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
            <TabsItem
              selected={mainStorage.home_tab === "comeTrue"}
              onClick={() => {
                dispatch(set({ key: "home_tab", value: "comeTrue" }));
                reverseList("comeTrue");
                setSelected("comeTrue");
              }}
              before={<Icon28StarsOutline width={20} height={20} />}
            >
              Сбывшиеся
            </TabsItem>
          </HorizontalScroll>
        </Tabs>
      </div>
      <div className={style.allBlockReviews}>
        {info.length === 0 && info2.length === 0 && (
          <div className={style.blockReviews}>
            <Placeholder>Мечты загружаются...</Placeholder>
          </div>
        )}

        {info.length === 0 && mainStorage.home2.length !== 0 && (
          <div className={style.blockReviews}>
            <Placeholder>Ничего не найдено</Placeholder>
          </div>
        )}

        {info.map((item, index) => (
          <>
            {isPromo && (
              <div className={style.promoBannerBackground}>
                {index === 3 && client !== "ok" && platform !== "vkcom" && (
                  <PromoBanner
                    bannerData={ads}
                    onClose={() => setIsPromo(false)}
                  />
                )}
              </div>
            )}
            <div className={style.blockReviews}>
              <SimpleCell
                multiline
                description={timeConverterDaily(item.timestamp)}
                before={
                  <Avatar
                    badge={
                      item.vk_id !== 0 &&
                      (item.client === "vk" ? (
                        <Icon28LogoVkColor width={20} height={20} />
                      ) : (
                        <IconWrapper20>
                          <Icon16OKLogoColor />
                        </IconWrapper20>
                      ))
                    }
                    size={48}
                    src={item.photo_url}
                  />
                }
                className={style.simpleCellReview}
                after={
                  <IconButton onClick={(e) => openMore(e, item, index)}>
                    <Icon28MoreHorizontal />
                  </IconButton>
                }
                disabled
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
                  onClick={() => setLike(item, selected, index, info)}
                >
                  {item.isLike ? (
                    <Icon16Fire width={28} height={28} fill="#FF0000" />
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
                {item.isPerform ? (
                  <Tappable
                    onClick={async () => {
                      const { data } = await axios.post("getHelper", {
                        id: item.id,
                      });
                      dispatch(set({ key: "helper", value: data[0] }));
                      router.toModal("helper");
                    }}
                    className={style.buttonReviewRight}
                  >
                    <Icon28StarsOutline />
                    {platform === VKCOM && (
                      <div className={style.textButtonHelped}>
                        Мечта сбылась
                      </div>
                    )}
                  </Tappable>
                ) : (
                  <Tappable
                    onClick={async () => {
                      console.log(item);
                      if (!item.isSetPerform) {
                        dispatch(set({ key: "help", value: index }));
                        router.toModal("helped");
                      } else {
                        let newArray = [];
                        info.forEach((inf, index) => {
                          newArray[index] = { ...inf };
                        });
                        newArray[index].isSetPerform = false;
                        dispatch(set({ key: "home", value: newArray }));
                        setInfo(newArray);
                        const { data } = await axios.post("perform", {
                          id: item.id,
                        });
                        router.toPopout(
                          <Snackbar onClose={() => router.toPopout()}>
                            {data.info}
                          </Snackbar>
                        );
                      }
                    }}
                    className={style.buttonReviewRight}
                  >
                    <Icon28MagicWandOutline />
                    {platform === VKCOM && (
                      <div className={style.textButtonHelped}>
                        {!item.isSetPerform ? (
                          "Помочь с мечтой"
                        ) : (
                          <>{!item.isPerform && "Отменить помощь"}</>
                        )}
                      </div>
                    )}
                  </Tappable>
                )}
              </div>
            </div>
          </>
        ))}
        <Div>{spinner && <Spinner size="small" />}</Div>
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(HomePanel);
