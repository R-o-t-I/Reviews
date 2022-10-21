import React from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import { useSelector } from "react-redux";

import {
  Avatar,
  Button,
  ButtonGroup,
  List,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  SimpleCell,
  Spacing,
  Textarea,
  VKCOM,
} from "@vkontakte/vkui";

import style from "./admin.module.scss";

function AdminPanel({ router }) {
  const platform = useSelector((state) => state.main.platform);

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderBack
            label={platform === VKCOM && <div>Назад</div>}
            onClick={() => router.toBack()}
          />
        }
        separator={false}
      >
        Админ панель
      </PanelHeader>
      <div className={style.container}>
        <SimpleCell disabled className={style.simpleCellReviews} after="2">
          Мечт на модерации:
        </SimpleCell>
        <Spacing>
          <Separator wide />
        </Spacing>
        <List style={{ marginTop: 12 }}>
          <SimpleCell
            disabled
            before={
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/4123/4123763.png"
                size={48}
              />
            }
            description="05.10.2022 в 12:23"
            className={style.simpleCellReviews}
          >
            Анонимно
          </SimpleCell>
          <Textarea style={{ marginTop: 12 }} value="Моя мечта бла бла бла" />
          Мечту можно редактировать
          <ButtonGroup stretched style={{ marginTop: 16 }}>
            <Button size="m" stretched appearance="positive">
              Принять
            </Button>
            <Button size="m" stretched appearance="negative">
              Отклонить
            </Button>
          </ButtonGroup>
        </List>
      </div>
    </>
  );
}

export default withRouter(AdminPanel);
