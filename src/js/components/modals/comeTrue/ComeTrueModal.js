import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
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

import style from "./comeTrueModal.module.scss";

function ComeTrueModal({ nav, router }) {
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
          Мечта сбылась
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      <FormLayout>
        <FormItem
          top="Кто помог Вам?"
          bottom="Если Вам никто не помогал в исполнении мечты, оставьте поле пустым"
        >
          <Input placeholder="Введите ID или короткий адрес" />
        </FormItem>
      </FormLayout>
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
      <FormLayout>
        <FormItem top="Как это было?">
          <Textarea placeholder="Опишите, в чем заключалась помощь" />
          <Checkbox>Показывать комментарий всем</Checkbox>
        </FormItem>
      </FormLayout>
      <Div>
        <Button stretched size="m">
          Готово
        </Button>
      </Div>
    </ModalPage>
  );
}

export default withRouter(ComeTrueModal);
