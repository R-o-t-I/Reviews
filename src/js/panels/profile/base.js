import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";

import {
  PanelHeader,
  Avatar,
  Title,
  Text,
  ScreenSpinner,
  SimpleCell,
  List,
  IconButton,
  Spacing,
  Separator,
  Tappable,
  ActionSheet,
  ActionSheetItem,
  Alert,
  Placeholder,
  Button,
  Div,
  VKCOM,
  Snackbar,
} from "@vkontakte/vkui";

import { Dropdown } from "@vkontakte/vkui/dist/unstable";

import {
  Icon28CancelOutline,
  Icon28ClockOutline,
  Icon28DeleteOutline,
  Icon28DoneOutline,
  Icon28FireOutline,
  Icon28MagicWandOutline,
  Icon28MoreHorizontal,
  Icon28PincodeLockOutline,
  Icon28ShareOutline,
  Icon28StarsOutline,
  Icon28StoryOutline,
  Icon56Stars3Outline,
} from "@vkontakte/icons";

import style from "./base.module.scss";
import { set } from "../../reducers/mainReducer";

let isInfoUser = false;

function ProfilePanel({ router }) {
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const dispatch = useDispatch();
  const [info, setInfo] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    if (!isInfoUser) {
      getInfoUser();
      getInfo();
    } else {
      setInfo(mainStorage.profile);
    }
  }, []);

  async function getInfo() {
    router.toPopout(<ScreenSpinner />);
    const { data } = await axios.get("profile");
    if(data.status) {
      setInfo(data.dreams);
      setIsAdmin(data.admin);
      dispatch(set({key: "profile", value: data.dreams}));
      dispatch(set({key: "isAdmin", value: data.admin}));
    } else {
      router.toPopout(<Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>);
    }
  }

  async function getInfoUser() {
    router.toPopout(<ScreenSpinner />);

    let user_info = await bridge.send("VKWebAppGetUserInfo");
    user_info.name = user_info.first_name + " " + user_info.last_name;
    dispatch(set({ key: "infoUser", value: user_info }));

    isInfoUser = true;
    router.toPopout();
  }

  async function deleteDream(id) {
    const { data } = await axios.post("delete", { id: id });

    if(data.status) {
      let copy_home = [...mainStorage.home];

      setInfo(data);
      mainStorage.home.find((item) => {
        if (item.id === id) {
          copy_home.splice(copy_home.indexOf(item), 1);
          dispatch(set({key: "home", value: copy_home}));
        }
      });

      dispatch(set({key: "profile", value: data}));
      setTimeout(
        () =>
          router.toPopout(
            <Snackbar
              onClose={() => router.toBack()}
              before={
                <Avatar
                  size={35}
                  style={{
                    background: "var(--field_valid_border)",
                  }}
                >
                  <Icon28DoneOutline fill="#fff" width={20} height={20}/>
                </Avatar>
              }
            >
              Мечта удалена
            </Snackbar>
          ),
        1000
      );
    } else {
      router.toPopout(<Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>);
    }
  }

  async function openMore(e, id) {
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
        {mainStorage.isAdmin === 1 && (
          <ActionSheetItem
            autoclose
            onClick={() => router.toModal("comeTrue")}
            before={<Icon28StarsOutline />}
          >
            Мечта сбылась
          </ActionSheetItem>
        )}
        <ActionSheetItem
          onClick={() => openAlertDeletion(id)}
          mode="destructive"
          before={<Icon28DeleteOutline />}
          autoclose
        >
          <div className={style.actionDestructive}>Удалить мечту</div>
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function openAlertDeletion(id) {
    router.toPopout(
      <Alert
        actions={[
          {
            title: "Нет",
            autoclose: true,
            mode: "cancel",
          },
          {
            title: "Да",
            autoclose: true,
            mode: "destructive",
            action: () => deleteDream(id),
          },
        ]}
        onClose={() => router.toBack()}
        header="Удалить мечту"
        text="Вы действительно хотите удалить мечту?"
      />
    );
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

  function shareWallPost(item, index) {
    bridge.send("VKWebAppShowWallPostBox", {
      message: `Пользователь ${item.first_name} ${item.last_name} оставил мечту: "${item.text}"\n\nБольше мечтаний в приложении: vk.com/app51456689`,
    });
  }

  return (
    <>
      <PanelHeader separator={false}>Профиль</PanelHeader>
      <div className={style.blockHeader}>
        {mainStorage.isAdmin === 1 && (
          <div className={style.blockButtonHeaderLeft}>
            <IconButton onClick={() => router.toPanel("admin")}>
              <Icon28PincodeLockOutline />
            </IconButton>
          </div>
        )}
        <Avatar size={96} src={mainStorage.infoUser.photo_200} />
        <Title className={style.nameUser} level="2" weight="medium">
          {mainStorage.infoUser.name}
        </Title>
        <Text className={style.descriptionUser}>
          У Вас {info.length}
          {
            [" мечта", " мечты", " мечт"][
              info.length % 100 > 4 && info.length % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][
                    info.length % 10 < 5 ? info.length % 10 : 5
                  ]
            ]
          }
        </Text>
      </div>
      <div className={style.headerList}>Ваши мечты:</div>
      {!info.length && (
        <div className={style.blockReview}>
          <Placeholder
            icon={<Icon56Stars3Outline />}
            header="У Вас нет мечт"
            action={
              <Button size="m" onClick={() => router.toView("add")}>
                Оставить мечту
              </Button>
            }
          >
            Вы еще не оставляли свою мечту. Не стесняйтесь, сделайте это прямо
            сейчас, можно анонимно.
          </Placeholder>
        </div>
      )}
      <div className={style.listReviews}>
        {info.map((item, index) => (
          <div className={style.blockReview}>
            <SimpleCell
              multiline
              disabled
              before={<Avatar src={item.photo_url} size={48} />}
              description={timeConverterDaily(item.timestamp)}
              className={style.simpleCellReviews}
              after={
                <IconButton onClick={(e) => openMore(e, item.id)}>
                  <Icon28MoreHorizontal />
                </IconButton>
              }
            >
              {item.first_name} {item.last_name}
            </SimpleCell>
            <div>{item.text}</div>
            <Spacing size={32}>
              <Separator wide />
            </Spacing>
            <div className={style.blockButtonReview}>
              <Tappable className={style.buttonReview} disabled>
                <Icon28FireOutline />
                <div className={style.countButton}>{item.likes}</div>
              </Tappable>
              {mainStorage.isAdmin === 1 && (
                <Tappable className={style.buttonReview} disabled>
                  <Icon28StoryOutline />
                </Tappable>
              )}
              <Tappable
                onClick={() => shareWallPost(item)}
                className={style.buttonReview}
              >
                <Icon28ShareOutline />
              </Tappable>
              <div className={style.buttonReviewRight}>
                {mainStorage.isAdmin === 1 && (
                  <Tappable
                    className={style.buttonHelped}
                    onClick={() => router.toModal("infoHelper")}
                  >
                    <Icon28MagicWandOutline />
                    {platform === VKCOM && (
                      <div className={style.textButtonHelped}>
                        Хотят помочь!
                      </div>
                    )}
                  </Tappable>
                )}
                {item.status === -1 && (
                  <Dropdown
                    action="hover"
                    placement="bottom-end"
                    content={
                      <Div>
                        <Text>Мечта отклонена</Text>
                      </Div>
                    }
                  >
                    <div className={style.moderationsNegative}>
                      <Icon28CancelOutline />
                    </div>
                  </Dropdown>
                )}
                {item.status === 1 && (
                  <Dropdown
                    action="hover"
                    placement="bottom-end"
                    content={
                      <Div>
                        <Text>Мечта принята</Text>
                      </Div>
                    }
                  >
                    <div className={style.moderationsPositive}>
                      <Icon28DoneOutline />
                    </div>
                  </Dropdown>
                )}
                {item.status === 0 && (
                  <Dropdown
                    action="hover"
                    placement="bottom-end"
                    content={
                      <Div>
                        <Text>Мечта на рассмотрении</Text>
                      </Div>
                    }
                  >
                    <div className={style.moderations}>
                      <Icon28ClockOutline />
                    </div>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(ProfilePanel);
