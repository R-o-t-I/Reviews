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
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import style from "./helperModal.module.scss";

function HelperModal({ nav, router }) {
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
      <Card mode="outline" className={style.cardSimpleCell}>
        <SimpleCell disabled subtitle="" before={<Avatar size={48} />}>
          Name Name
        </SimpleCell>
      </Card>
      <div className={style.cardTextComment}>text</div>
    </ModalPage>
  );
}

export default withRouter(HelperModal);
