import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  Button,
  ModalCard,
  ANDROID,
  FormItem,
  Textarea,
  Snackbar,
  Avatar,
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import axios from "axios";

function ReportModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);

  function report() {
    axios.post("report");
    router.toPopout();
    router.toBack();
  }

  return (
    <ModalCard
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
          Жалоба на мечту
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      actions={
        <Button size="l" mode="primary" onClick={() => report()}>
          Отправить жалобу
        </Button>
      }
    >
      <Textarea placeholder="Ваша жалоба" />
    </ModalCard>
  );
}

export default withRouter(ReportModal);
