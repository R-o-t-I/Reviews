import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
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
  Snackbar
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import axios from "axios";

import style from "./helpedModal.module.scss";

function HelpedModal({ nav, router }) {
  const platform = useSelector((state) => state.main.plarform);
  const mainStorage = useSelector((state) => state.main);
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");

  async function send() {
    const {data} = await axios.post("perform", {
      id: mainStorage.help.id,
      isPrivate: checked,
      text: text
    });
    router.toPopout();
    router.toBack();
    setTimeout(() => router.toPopout(<Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>), 100);
  }

  return (
    <ModalPage
      className={style.modal}
      nav={nav}
      header={
        <ModalPageHeader
          right={
            <Fragment>
              {platform === ANDROID && (
                <PanelHeaderButton onClick={() => router.toBack()}>
                  <Icon24DismissDark />
                </PanelHeaderButton>
              )}
              {platform === IOS && (
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
      {!mainStorage.help.isSetPerform ? (
        <>
      {/*<FormItem top="Как с Вами можно связаться?">
        <Textarea placeholder="Введите ссылку на ВКонтакте или почту" />
      </FormItem>*/}
      <FormItem top="Ваш комментарий">
        <Textarea placeholder="Введите комментарий" value={text} onChange={(e) => setText(e.target.value)}/>
        <Checkbox onClick={() => setChecked(!checked)} checked={checked}>Попросить не оставлять комментарий</Checkbox>
        <Button size="m" stretched onClick={() => send()}>
          Отправить
        </Button>
      </FormItem>
      </>
        ) :
        (
          <FormItem top="Ваш комментарий">
            <Button size="m" stretched onClick={() => send()}>
              Удалить запрос помощи (Тут нужно написать нормальный текст)
            </Button>
          </FormItem>
        )
      }
    </ModalPage>
  );
}

export default withRouter(HelpedModal);
