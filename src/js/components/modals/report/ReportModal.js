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
  Alert,
} from "@vkontakte/vkui";

import {
  Icon24DismissDark,
  Icon28DoneOutline,
  Icon28ErrorOutline,
} from "@vkontakte/icons";

import style from "./report.module.scss";

import axios from "axios";

function ReportModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);
  const [text, setText] = useState("");
  const [snackbar, setSnackbar] = useState(null);

  async function report() {
    const { data } = await axios.post("report", {
      id: mainStorage.report_id,
      text: text,
    });
    router.toPopout();
    router.toBack();
    setTimeout(
      () =>
        router.toPopout(
          <Snackbar
            onClose={() => router.toBack()}
            before={
              <Avatar
                size={35}
                style={{
                  background:
                    data.info === "Вы уже отправляли жалобу!"
                      ? "var(--destructive)"
                      : "var(--field_valid_border)",
                }}
              >
                {data.info === "Вы уже отправляли жалобу!" ? (
                  <Icon28ErrorOutline fill="#fff" width={20} height={20} />
                ) : (
                  <Icon28DoneOutline fill="#fff" width={20} height={20} />
                )}
              </Avatar>
            }
          >
            {data.info}
          </Snackbar>
        ),
      1000
    );
  }

  return (
    <ModalCard
      nav={nav}
      header={<ModalPageHeader>Жалоба</ModalPageHeader>}
      onClose={() => router.toBack()}
      actions={
        <Button
          size="l"
          style={{ margin: "12px 6px" }}
          mode="primary"
          onClick={() => report()}
        >
          Отправить жалобу
        </Button>
      }
    >
      <div className={style.textTop}>
        <div>Опишите жалобу</div>
        <div style={{ marginLeft: "auto" }}>{text.length}/500</div>
      </div>
      <Textarea
        placeholder="Ваша жалоба"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength="500"
      />
      {snackbar}
    </ModalCard>
  );
}

export default withRouter(ReportModal);
