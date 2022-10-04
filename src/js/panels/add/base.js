import React, { useState } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
  Button,
  Checkbox,
  FormItem,
  Link,
  PanelHeader,
  Textarea,
} from "@vkontakte/vkui";

import style from "./base.module.scss";
import {} from "@vkontakte/icons";

function AddPanel({ router }) {
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
          <Textarea placeholder="Я мечтаю стать известным" />
        </FormItem>
        <Checkbox>Оставить анонимно</Checkbox>
        <FormItem>
          <Button size="l" stretched>
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
