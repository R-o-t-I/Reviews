import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  ANDROID,
  FormItem,
  Textarea,
  Checkbox,
  Button,
  Snackbar,
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import axios from "axios";

import style from "./helpedModal.module.scss";
import { set } from "../../../reducers/mainReducer";

function HelpedModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");

  async function send() {
    const { data } = await axios.post("perform", {
      id: mainStorage.home[mainStorage.help].id,
      isPrivate: checked,
      text: text,
    });

    if (data.status) {
      let newArray = [];
      mainStorage.home.forEach((inf, index) => {
        newArray[index] = { ...inf };
      });
      newArray[mainStorage.help].isSetPerform = true;
      dispatch(set({ key: "home", value: newArray }));
    }

    router.toPopout();
    router.toBack();

    setTimeout(
      () =>
        router.toPopout(
          <Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>
        ),
      100
    );
  }

  return (
    <ModalPage
      className={style.modal}
      nav={nav}
      header={
        <ModalPageHeader
          after={
            <Fragment>
              {(platform === IOS || platform === ANDROID) && (
                <PanelHeaderButton onClick={() => router.toBack()}>
                  <Icon24DismissDark />
                </PanelHeaderButton>
              )}
            </Fragment>
          }
        >
          Помочь
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      {!mainStorage.home[mainStorage.help].isSetPerform && (
        <>
          {/*<FormItem top="Как с Вами можно связаться?">
        <Textarea placeholder="Введите ссылку на ВКонтакте или почту" />
      </FormItem>*/}
          <FormItem top="Ваш комментарий">
            <Textarea
              placeholder="Введите комментарий"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className={style.checkboxStyle}>
              <Checkbox onClick={() => setChecked(!checked)} checked={checked}>
                Скрыть комментарий от других мечтателей
              </Checkbox>
            </div>
            <Button
              size="l"
              style={{ margin: "12px 6px" }}
              stretched
              onClick={() => send()}
            >
              Отправить
            </Button>
          </FormItem>
        </>
      )}
    </ModalPage>
  );
}

export default withRouter(HelpedModal);
