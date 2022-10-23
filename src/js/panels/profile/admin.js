import React, {useEffect} from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import { useSelector } from "react-redux";

import axios from 'axios';

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
  const [info, setInfo] = React.useState([]);


  useEffect(() => {
    if (platform === VKCOM) {
      document.title = "Админка";
    }
    getModerationList();
  }, []);

  async function getModerationList() {
    const {data} = await axios.get('getModerationList');
    setInfo(data);
  }

  async function acceptDream(item) {
    await axios.post('acceptDream', {
      id: item.id,
      text: item.text
    });
    getModerationList();
  }

  async function denyDream(id) {
    await axios.post('denyDream', {
      id: id
    });
    getModerationList();
  }

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
        <SimpleCell disabled className={style.simpleCellReviews} after={info.length}>
          Мечт на модерации:
        </SimpleCell>
        <Spacing>
          <Separator wide />
        </Spacing>
        {info.map((item, index) =>
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
            {item.first_name} {item.last_name}
          </SimpleCell>
          <Textarea style={{ marginTop: 12 }} defaultValue={item.text} onChange={(e) => {
            item.text = e.target.value;
          }}/>
          <ButtonGroup stretched style={{ marginTop: 16 }}>
            <Button size="m" stretched appearance="positive" onClick={() => acceptDream(item)}>
              Принять
            </Button>
            <Button size="m" stretched appearance="negative" onClick={() => denyDream(item.id)}>
              Отклонить
            </Button>
          </ButtonGroup>
        </List>
          )}
      </div>
    </>
  );
}

export default withRouter(AdminPanel);
