import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  ANDROID,
  SimpleCell,
  Avatar,
  Card,
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import style from "./helperModal.module.scss";

function HelperModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);

  function timeConverterDaily(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp),
      months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ],
      month = months[a.getMonth()],
      year = a.getFullYear(),
      date = a.getDate(),
      time = date + " " + month + " 2022";
    return time;
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
          Мечта сбылась
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      <div style={{ position: "relative" }}>
        <div className={style.headerCard}>Помог:</div>
        <Card mode="outline" className={style.cardSimpleCell}>
          <SimpleCell
            multiline
            disabled
            subtitle={timeConverterDaily(mainStorage.helper.timestamp)}
            before={<Avatar size={48} src={mainStorage.helper.photo_url} />}
          >
            {mainStorage.helper.first_name} {mainStorage.helper.last_name}
          </SimpleCell>
        </Card>
      </div>
      <div style={{ position: "relative" }}>
        <div className={style.headerCard}>Комментарий помощника:</div>
        <Card mode="outline" className={style.cardTextComment}>
          <div>
            {mainStorage.helper.text === "" ? (
              "Помощник не оставил комментарий"
            ) : (
              <>{mainStorage.helper.text}</>
            )}
          </div>
        </Card>
      </div>
      <div style={{ position: "relative", paddingBottom: 30 }}>
        <div className={style.headerCard}>Комментарий мечтателя:</div>
        <Card mode="outline" className={style.cardTextComment}>
          <div>
            {mainStorage.helper.text_dreamer === "" ? (
              "Мечтатель не оставил комментарий"
            ) : (
              <>{mainStorage.helper.text_dreamer}</>
            )}
          </div>
        </Card>
      </div>
    </ModalPage>
  );
}

export default withRouter(HelperModal);
