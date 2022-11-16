import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  ANDROID,
  Button,
  SimpleCell,
  Avatar,
  Card,
  IconButton,
  Div,
  Snackbar,
} from "@vkontakte/vkui";

import bridge from "@vkontakte/vk-bridge";

import { Icon24DismissDark, Icon28CopyOutline } from "@vkontakte/icons";

import { set } from "../../../reducers/mainReducer";

import style from "./infoHelperModal.module.scss";

function InfoHelperModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);
  const [snackbar, setSnackbar] = useState(null);
  const dispatch = useDispatch();

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
          before={
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
      {mainStorage.helpers.map((item, index) => (
        <>
          <div style={{ position: "relative" }}>
            <div className={style.headerCard}>Помощник:</div>
            <Card mode="outline" className={style.cardSimpleCell}>
              <SimpleCell
                multiline
                disabled
                subtitle={timeConverterDaily(item.timestamp)}
                before={<Avatar size={48} src={item.photo_url} />}
              >
                {item.first_name} {item.last_name}
              </SimpleCell>
            </Card>
          </div>
          <div style={{ position: "relative" }}>
            <div className={style.headerCard}>Связь с помощником:</div>
            <Card mode="outline" className={style.cardTextContact}>
              <div className={style.containerTextContact}>
                <div>https://vk.com/id{item.vk_id}</div>
                <IconButton
                  className={style.iconButtonContact}
                  onClick={() => {
                    bridge.send("VKWebAppCopyText", {
                      text: `https://vk.com/id${item.vk_id}`,
                    });
                    router.toPopout(
                      setSnackbar(
                        <Snackbar
                          onClose={() => setSnackbar(null)}
                          before={
                            <Avatar
                              size={35}
                              style={{
                                background: "var(--field_valid_border)",
                              }}
                            >
                              <Icon28CopyOutline
                                fill="#fff"
                                width={20}
                                height={20}
                              />
                            </Avatar>
                          }
                        >
                          Ссылка скопирована
                        </Snackbar>
                      )
                    );
                  }}
                >
                  <Icon28CopyOutline />
                </IconButton>
              </div>
            </Card>
          </div>
          <div style={{ position: "relative" }}>
            <div className={style.headerCard}>Комментарий помощника:</div>
            <Card mode="outline" className={style.cardTextComment}>
              {item.text === "" ? (
                <div style={{ color: "var(--text_secondary)" }}>
                  Помощник не оставил комментарий
                </div>
              ) : (
                <div>{item.text}</div>
              )}
            </Card>
          </div>
          <div style={{ position: "relative", paddingBottom: 30 }}>
            <div className={style.headerCard}>Приватность:</div>
            <Card mode="outline" className={style.cardTextComment}>
              <div>
                {item.isPrivate
                  ? "Помощник просил не показывать комментарий всем"
                  : "Помощник разрешил показывать комментарий всем"}
              </div>
            </Card>
            <Div>
              <Button
                stretched
                size="l"
                style={{ margin: "12px 6px" }}
                onClick={() => {
                  dispatch(set({ key: "helperInfo", value: item }));
                  router.toModal("comeTrue");
                }}
              >
                Помог
              </Button>
            </Div>
          </div>
        </>
      ))}
      {snackbar}
    </ModalPage>
  );
}

export default withRouter(InfoHelperModal);
