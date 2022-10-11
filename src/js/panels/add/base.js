import React, { useState } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
  Button,
  Checkbox,
  FormItem,
  Link,
  PanelHeader,
  Textarea,
  ScreenSpinner,
    Alert,
} from "@vkontakte/vkui";

import style from "./base.module.scss";
import {} from "@vkontakte/icons";

import axios from "axios";

function AddPanel({ router }) {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  function create() {
    if (text.length > 0) {
      router.toPopout(<ScreenSpinner />);
      axios.post('create', {
        text: text,
        isAnon: checked
      }).then((res) => {
        setText("");
        setChecked(false);
        router.toPopout();
      });
    } else {
        router.toPopout(
            <Alert
            actions={[
                {
                title: "Ок",
                autoclose: true,
                mode: "cancel",
                },
            ]}
            onClose={() => router.toPopout()}
            >
            <h2>Ошибка</h2>
            <p>Введите текст</p>
            </Alert>
        );
    }
  }

  return (
    <>
      <PanelHeader separator={false}>Добавить мечту</PanelHeader>
      <div className={style.blockAdd}>
        <div className={style.title}>А какая у Вас мечта?</div>
        <div className={style.descriptions}>
          Расскажите нам о ней, чтобы узнать о чём мечтают другие люди
          (анонимность по Вашему желанию)
        </div>
        <FormItem top="Мечта">
          <Textarea placeholder="Я мечтаю стать известным" value={text} onChange={(e) => setText(e.target.value)}/>
        </FormItem>
        <Checkbox checked={checked} onClick={() => setChecked(!checked)}>Оставить анонимно</Checkbox>
        <FormItem>
          <Button size="l" stretched onClick={() => create()}>
            Отправить
          </Button>
        </FormItem>
        <div className={style.footer}>
          Каждая мечта сбывается, главное не переставать верить в неё,{" "}
          <Link href="https://vk.com/skyreglis" target="_blank">
            команда SkyReglis Studio
          </Link>{" "}
          ❤️ вас
        </div>
      </div>
    </>
  );
}

export default withRouter(AddPanel);
