import React, { useState, useEffect } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import { PanelHeader, Placeholder } from "@vkontakte/vkui";

import style from "./connection.module.scss";
import { Icon56GlobeCrossOutline } from "@vkontakte/icons";

import axios from "axios";
import { set } from "../../reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";

function ConnectionPanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);

  return (
    <>
      <PanelHeader separator={false}>Ошибка</PanelHeader>
      <Placeholder
        icon={<Icon56GlobeCrossOutline />}
        header="Проблемка с интернетом"
      >
        Упс, произошел разрыв с сетью. Проверьте подключение к интернету, как
        только возобновится доступ к интернету, страница автоматически
        перезагрузится.
      </Placeholder>
    </>
  );
}

export default withRouter(ConnectionPanel);
