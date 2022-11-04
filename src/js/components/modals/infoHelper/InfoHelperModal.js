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
  SimpleCell,
  Avatar,
  Card,
  IconButton,
} from "@vkontakte/vkui";

import { Icon24DismissDark, Icon28CopyOutline } from "@vkontakte/icons";

import style from "./infoHelperModal.module.scss";

function InfoHelperModal({ nav, router }) {
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
          Хотят помочь
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      <div style={{ position: "relative" }}>
        <div className={style.headerCard}>Помощник:</div>
        <Card mode="outline" className={style.cardSimpleCell}>
          <SimpleCell
            multiline
            disabled
            subtitle="Откликнулся 4 ноября 2022"
            before={<Avatar size={48} />}
          >
            Name Name
          </SimpleCell>
        </Card>
      </div>
      <div style={{ position: "relative" }}>
        <div className={style.headerCard}>Связь с помощником:</div>
        <Card mode="outline" className={style.cardTextContact}>
          <div className={style.containerTextContact}>
            <div>vk.com/id123</div>
            <IconButton className={style.iconButtonContact}>
              <Icon28CopyOutline />
            </IconButton>
          </div>
        </Card>
      </div>
      <div style={{ position: "relative" }}>
        <div className={style.headerCard}>Комментарий помощника:</div>
        <Card mode="outline" className={style.cardTextComment}>
          <div>text</div>
        </Card>
      </div>
      <div style={{ position: "relative", paddingBottom: 30 }}>
        <div className={style.headerCard}>Приватность:</div>
        <Card mode="outline" className={style.cardTextComment}>
          <div>Помощник просил не показывать комментарий всем</div>
        </Card>
      </div>
    </ModalPage>
  );
}

export default withRouter(InfoHelperModal);
