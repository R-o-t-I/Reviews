import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

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
} from "@vkontakte/vkui";
import {
  Icon28ClockOutline,
  Icon28DoneOutline,
  Icon28FireOutline,
  Icon28MoreHorizontal,
  Icon28ShareOutline,
  Icon28StoryOutline,
} from "@vkontakte/icons";
import style from "./base.module.scss";
import bridge from "@vkontakte/vk-bridge";
import { set } from "../../reducers/mainReducer";

let isInfoUser = false;

function ProfilePanel({ router }) {
  const mainStorage = useSelector((state) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isInfoUser) {
      getInfoUser();
    }
  }, []);

  async function getInfoUser() {
    router.toPopout(<ScreenSpinner />);

    let user_info = await bridge.send("VKWebAppGetUserInfo");
    user_info.name = user_info.first_name + " " + user_info.last_name;
    dispatch(set({ key: "infoUser", value: user_info }));

    isInfoUser = true;
    router.toPopout();
  }

  return (
    <>
      <PanelHeader separator={false}>Профиль</PanelHeader>
      <div className={style.blockHeader}>
        <Avatar size={96} src={mainStorage.infoUser.photo_200} />
        <Title className={style.nameUser} level="2" weight="medium">
          {mainStorage.infoUser.name}
        </Title>
        <Text className={style.descriptionUser}>У Вас 1 мечта</Text>
      </div>
      <div className={style.headerList}>Ваши мечты:</div>
      <div className={style.listReviews}>
        <div className={style.blockReview}>
          <SimpleCell
            disabled
            before={<Avatar src={mainStorage.infoUser.photo_200} size={48} />}
            description="05.10.2022 в 12:23"
            className={style.simpleCellReviews}
            after={
              <IconButton>
                <Icon28MoreHorizontal />
              </IconButton>
            }
          >
            Не анонимно
          </SimpleCell>
          <div>Моя мечта бла бла бла</div>
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
            <div className={style.moderations}>
              <Icon28ClockOutline />
            </div>
          </div>
        </div>
        <div className={style.blockReview}>
          <SimpleCell
            disabled
            before={
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/4123/4123763.png"
                size={48}
              />
            }
            description="05.10.2022 в 12:23"
            className={style.simpleCellReviews}
            after={
              <IconButton>
                <Icon28MoreHorizontal />
              </IconButton>
            }
          >
            Анонимно
          </SimpleCell>
          <div>Моя мечта бла бла бла</div>
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
            <div className={style.moderations}>
              <Icon28ClockOutline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(ProfilePanel);
