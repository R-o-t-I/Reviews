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
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import style from "./helpedModal.module.scss";

function HelpedModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);

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
      <FormItem top="Как с Вами можно связаться?">
        <Textarea placeholder="Введите ссылку на ВКонтакте или почту" />
      </FormItem>
      <FormItem top="Ваш комментарий">
        <Textarea placeholder="Введите комментарий" />
        <Checkbox>Попросить не оставлять комментарий</Checkbox>
        <Button size="m" stretched>
          Отправить
        </Button>
      </FormItem>
    </ModalPage>
  );
}

export default withRouter(HelpedModal);
