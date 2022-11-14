import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  ANDROID,
  Calendar,
  LocaleProviderContext,
  ButtonGroup,
  Button,
} from "@vkontakte/vkui";

import { Icon24DismissDark } from "@vkontakte/icons";

import style from "./topUpModal.module.scss";

function TopUpModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);
  const [value, setValue] = useState(new Date());
  const [enableTime, setEnableTime] = useState(true);
  const [disablePast, setDisablePast] = useState(true);
  const [disableFuture, setDisableFuture] = useState(false);
  const [disablePickers, setDisablePickers] = useState(false);
  const [showNeighboringMonth, setShowNeighboringMonth] = useState(true);
  const [locale, setLocale] = useState("ru");
  const [size, setSize] = useState("m");
  const [listenDayChangesForUpdate, setListenDayChangesForUpdate] =
    useState(true);

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
          Поднять в топ
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      <div className={style.desc}>
        Хотите поднять мечту на час на первую позицию в списке, чтобы ее увидели
        сразу при входе? Это будет стоить 5 голосов. Выбирайте удобное доступное
        место и поднимайте мечту!
      </div>
      <div className={style.calendarContainer}>
        <LocaleProviderContext.Provider value={locale}>
          <Calendar
            value={value}
            onChange={setValue}
            enableTime={enableTime}
            disablePast={disablePast}
            disableFuture={disableFuture}
            disablePickers={disablePickers}
            showNeighboringMonth={showNeighboringMonth}
            size={size}
            listenDayChangesForUpdate={listenDayChangesForUpdate}
          />
        </LocaleProviderContext.Provider>
      </div>
      <div className={style.buttonGroup}>
        <ButtonGroup mode="horizontal" stretched>
          <Button size="l" appearance="accent" stretched>
            Поднять за 5 голосов
          </Button>
        </ButtonGroup>
      </div>
    </ModalPage>
  );
}

export default withRouter(TopUpModal);
