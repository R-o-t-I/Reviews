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

import { Icon24DismissDark, Icon28DoneOutline } from "@vkontakte/icons";

import style from "./report.module.scss";

import axios from "axios";

function ReportModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);
  const mainStorage = useSelector((state) => state.main);
  const [text, setText] = useState("");
  const [snackbar, setSnackbar] = useState(null);

  function report() {
    axios.post("report", { id: mainStorage.report_id, text: text });
    router.toPopout();
    router.toBack();
  }

  return (
    <ModalCard
      nav={nav}
      header={<ModalPageHeader>Жалоба на мечту</ModalPageHeader>}
      onClose={() => router.toBack()}
      actions={
        <Button size="l" mode="primary" onClick={() => report()}>
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
        maxLength={500}
      />
      {snackbar}
    </ModalCard>
  );
}

export default withRouter(ReportModal);
