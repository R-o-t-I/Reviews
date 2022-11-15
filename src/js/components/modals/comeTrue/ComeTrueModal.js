import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  FormLayout,
  FormItem,
  Input,
  Avatar,
  Caption,
  HorizontalScroll,
  Subhead,
  Card,
  Title,
  RichCell,
  Separator,
  Textarea,
  ANDROID,
  Div,
  Button,
  Checkbox,
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import axios from "axios";

import { set } from "../../../reducers/mainReducer";

import style from "./comeTrueModal.module.scss";

function ComeTrueModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  async function setPerform() {
    const { data } = await axios.post("setPerform", {
      id: mainStorage.profile[mainStorage.helpersID].id,
      dream_id: mainStorage.helperInfo.dream_id,
      user_id: Number(info.vk_id),
      text: text,
      isPrivate: isPrivate,
    });

    let newArray = [];
    mainStorage.profile.forEach((inf, index) => {
      newArray[index] = { ...inf };
    });

    newArray[mainStorage.helpersID].performs = [];
    newArray[mainStorage.helpersID].isPerform = true;

    dispatch(set({ key: "profile", value: newArray }));
    dispatch(set({ key: "helperInfo", value: {} }));
    router.toPopout();
    router.toBack();
  }

  useEffect(() => {
    if (mainStorage.helperInfo.id !== undefined) {
      setInfo(mainStorage.helperInfo);
    }
  }, []);

  return (
    <ModalPage
      className={style.modal}
      nav={nav}
      header={
        <ModalPageHeader
          right={
            <Fragment>
              {platform === ANDROID && (
                <PanelHeaderButton
                  onClick={() => {
                    dispatch(set({ key: "helperInfo", value: {} }));
                    router.toBack();
                  }}
                >
                  <Icon24DismissDark />
                </PanelHeaderButton>
              )}
              {platform === IOS && (
                <PanelHeaderButton
                  onClick={() => {
                    dispatch(set({ key: "helperInfo", value: {} }));
                    router.toBack();
                  }}
                >
                  <Icon24DismissDark />
                </PanelHeaderButton>
              )}
            </Fragment>
          }
        >
          Мечта сбылась
        </ModalPageHeader>
      }
      onClose={() => {
        dispatch(set({ key: "helperInfo", value: {} }));
        router.toBack();
      }}
      settlingHeight={100}
    >
      <FormLayout>
        <FormItem
          top="Кто помог Вам?"
          bottom="Если Вам никто не помогал в исполнении мечты, оставьте поле пустым"
        >
          <Input
            placeholder="Введите ID или короткий адрес"
            value={info.vk_id}
            onChange={(e) => {
              let copy_info = { ...info };
              copy_info.vk_id = e.target.value;
              setInfo(copy_info);
            }}
          />
        </FormItem>
      </FormLayout>
      {/*
      <div className={style.recent}>
        <Subhead weight="regular">Недавние помощники</Subhead>
        <HorizontalScroll>
          <div className={style.list}>
            <div className={style.item}>
              <Avatar size={24} src={""} />
              <Caption level="1" weight="regular">
                firstName lastName
              </Caption>
            </div>
          </div>
        </HorizontalScroll>
      </div>
      */}
      <FormLayout>
        <FormItem top="Как это было?">
          <Textarea
            placeholder="Опишите, в чем заключалась помощь"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Checkbox>Показывать комментарий всем</Checkbox>
        </FormItem>
      </FormLayout>
      <Div>
        <Button
          stretched
          size="l"
          style={{ margin: "12px 6px" }}
          onClick={() => setPerform()}
        >
          Готово
        </Button>
      </Div>
    </ModalPage>
  );
}

export default withRouter(ComeTrueModal);
