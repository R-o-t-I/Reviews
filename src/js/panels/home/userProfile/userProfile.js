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
  CellButton,
  Footer,
  Link,
  IOS,
  PanelHeaderButton,
} from "@vkontakte/vkui";

import { Dropdown } from "@vkontakte/vkui/dist/unstable";

import {
  Icon28ArrowUpRectangleOutline,
  Icon28BugOutline,
  Icon28CancelOutline,
  Icon28ChatsOutline,
  Icon28ClockOutline,
  Icon28DeleteOutline,
  Icon28DonateOutline,
  Icon28DoneOutline,
  Icon28FireOutline,
  Icon28HomeOutline,
  Icon28MagicWandOutline,
  Icon28MoreHorizontal,
  Icon28PincodeLockOutline,
  Icon28ShareOutline,
  Icon28StarsOutline,
  Icon28StatisticsOutline,
  Icon28StoryOutline,
  Icon28Users3Outline,
  Icon28UsersOutline,
  Icon56Stars3Outline,
} from "@vkontakte/icons";

import style from "./userProfile.module.scss";
import { set } from "../../../reducers/mainReducer";

function UserProfilePanel({ router }) {
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const dispatch = useDispatch();
  const [info, setInfo] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [snackbar, setSnackbar] = useState(null);

  React.useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const {data} = await axios.get('getUserList/' + mainStorage.userCard.vk_id);
    setInfo(data);
  }

  async function openMore(e, id, item, index) {
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
        <ActionSheetItem before={<Icon28DeleteOutline />} autoclose>
          <div className={style.actionDestructive}>Пожаловаться</div>
        </ActionSheetItem>
      </ActionSheet>
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
      <PanelHeader
        before={
          <PanelHeaderButton
            onClick={() => router.toPanel("base")}
            label={
              platform === VKCOM && (
                <div style={{ marginLeft: 8 }}>На главную</div>
              )
            }
          >
            <Icon28HomeOutline />
          </PanelHeaderButton>
        }
        separator={false}
      >
        Профиль
      </PanelHeader>
      <div className={style.blockHeader}>
        <Avatar size={96} src={mainStorage.userCard.photo_url} />
        <Title className={style.nameUser} level="2" weight="medium">
          {mainStorage.userCard.first_name} {mainStorage.userCard.last_name}
        </Title>
        <Text className={style.descriptionUser}>
          У {mainStorage.userCard.first_name} {info.length}
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
      <div
        className={
          platform === VKCOM ? `${style.infoBlock}` : `${style.infoBlockMobile}`
        }
      >
        <SimpleCell
          multiline
          subtitle="Узнавайте новости наших проектов"
          before={<Icon28Users3Outline />}
          className={
            platform === VKCOM ? `${style.infoItem}` : `${style.infoItemMobile}`
          }
          href={
            mainStorage.client === "vk"
              ? "https://vk.com/skyreglis"
              : "https://ok.ru/skyreglis"
          }
          target="_blank"
        >
          Наше сообщество
        </SimpleCell>
        <SimpleCell
          before={<Icon28ChatsOutline />}
          multiline
          subtitle="Общайтесь с другими мечтателями"
          className={
            platform === VKCOM ? `${style.infoItem}` : `${style.infoItemMobile}`
          }
          href={
            mainStorage.client === "vk"
              ? "https://vk.me/join/m7/Q310/T5p4bI4hrSydrGkU_FrkMogkjyo="
              : "https://ok.ru/messages/join/C4HMuv1Oxxmk9_7gsqp67DHv4LHpPgAOPqOAz05SpWc"
          }
          target="_blank"
        >
          Наша беседа
        </SimpleCell>
        <SimpleCell
          before={<Icon28BugOutline />}
          multiline
          subtitle="Поделитесь идеей или ошибкой"
          className={
            platform === VKCOM ? `${style.infoItem}` : `${style.infoItemMobile}`
          }
          href={
            mainStorage.client === "vk"
              ? "https://vk.me/skyreglis"
              : "https://ok.ru/group/58564673077471/messages"
          }
          target="_blank"
        >
          Написать разработчикам
        </SimpleCell>
        {mainStorage.client === "vk" && (
          <>
            {platform === IOS ? (
              ""
            ) : (
              <>
                <SimpleCell
                  before={<Icon28DonateOutline />}
                  multiline
                  subtitle="Поддержите нас, оформив подписку VK Donut"
                  className={
                    platform === VKCOM
                      ? `${style.infoItem}`
                      : `${style.infoItemMobile}`
                  }
                  onClick={() => {
                    bridge
                      .send("VKWebAppShowOrderBox", {
                        type: "item",
                        item: "itemTEST",
                      })
                      .then((data) => console.log(data.status))
                      .catch((error) => console.log(error));
                  }}
                >
                  Поддержать нас
                </SimpleCell>
              </>
            )}
          </>
        )}
      </div>
      <div className={style.headerList}>Мечты</div>
      {!info.length && (
        <div className={style.blockReview}>
          <Placeholder
            icon={<Icon56Stars3Outline />}
            header={`У ${mainStorage.userCard.first_name} нет мечт`}
            action={
              <Button size="m" onClick={() => router.toPanel("base")}>
                Ко всем мечтам
              </Button>
            }
          >
            {mainStorage.userCard.first_name} еще не оставлял свою мечту.
          </Placeholder>
        </div>
      )}
      <div className={style.listReviews}>
        {info.map((item, index) => (
          <div className={style.blockReview}>
            <SimpleCell
              multiline
              before={<Avatar src={item.photo_url} size={48} />}
              description={timeConverterDaily(item.timestamp)}
              className={style.simpleCellReviews}
              /*after={
                <IconButton onClick={(e) => openMore(e, item.id, item, index)}>
                  <Icon28MoreHorizontal />
                </IconButton>
              }*/
              disabled
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
            </div>
          </div>
        ))}
        <Footer className={style.footer}>
          <div>Версия kd91o</div>
          <div>
            Сделано с ❤️️ от{" "}
            <Link href="https://vk.com/skyreglis" target="_blank">
              SkyReglis Studio
            </Link>
          </div>
        </Footer>
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(UserProfilePanel);
