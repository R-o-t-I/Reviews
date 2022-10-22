import React, { useEffect } from "react";
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
} from "@vkontakte/vkui";

import {
  Icon28ClockOutline,
  Icon28DeleteOutline,
  Icon28DoneOutline,
  Icon28FireOutline,
  Icon28MoreHorizontal,
  Icon28PincodeLockOutline,
  Icon28ShareOutline,
  Icon28StoryOutline,
  Icon56Stars3Outline,
} from "@vkontakte/icons";

import style from "./base.module.scss";
import { set } from "../../reducers/mainReducer";

let isInfoUser = false;

function ProfilePanel({ router }) {
  const mainStorage = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [info, setInfo] = React.useState([]);

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
    setInfo(data.dreams);
    dispatch(set({ key: "profile", value: data.dreams }));
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
    let copy_home = [...mainStorage.home];

    setInfo(data);
    mainStorage.home.find(item => {
      if (item.id === id) {
        copy_home.splice(copy_home.indexOf(item), 1);
        dispatch(set({key: "home", value: copy_home}));
      }
    });

    dispatch(set({ key: "profile", value: data }));
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
        <ActionSheetItem
          onClick={() => openAlertDeletion(id)}
          mode="destructive"
          before={<Icon28DeleteOutline />}
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

  return (
    <>
      <PanelHeader separator={false}>Профиль</PanelHeader>
      <div className={style.blockHeader}>
        <div className={style.blockButtonHeaderLeft}>
          <IconButton onClick={() => router.toPanel("admin")}>
            <Icon28PincodeLockOutline />
          </IconButton>
        </div>
        <Avatar size={96} src={mainStorage.infoUser.photo_200} />
        <Title className={style.nameUser} level="2" weight="medium">
          {mainStorage.infoUser.name}
        </Title>
        <Text className={style.descriptionUser}>У Вас {info.length} мечта</Text>
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
            сейчас, можно анонимно
          </Placeholder>
        </div>
      )}
      <div className={style.listReviews}>
        {info.map((item, index) => (
          <div className={style.blockReview}>
            <SimpleCell
              disabled
              before={<Avatar src={mainStorage.infoUser.photo_200} size={48} />}
              description={item.timestamp}
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
              <Tappable className={style.buttonReview} disabled>
                <Icon28StoryOutline />
              </Tappable>
              <Tappable className={style.buttonReview} disabled>
                <Icon28ShareOutline />
              </Tappable>
              {item.status === -1 && (
                <div className={style.moderationsNegative}>
                  <Icon28ClockOutline />
                </div>
              )}
              {item.status === 1 && (
                <div className={style.moderationsPositive}>
                  <Icon28ClockOutline />
                </div>
              )}
              {item.status === 0 && (
                <div className={style.moderations}>
                  <Icon28ClockOutline />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default withRouter(ProfilePanel);
