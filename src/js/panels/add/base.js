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
  Snackbar,
  Avatar,
} from "@vkontakte/vkui";

import style from "./base.module.scss";
import { Icon28InfoOutline } from "@vkontakte/icons";

import axios from "axios";
import {set} from "../../reducers/mainReducer";
import {useDispatch, useSelector} from "react-redux";

function AddPanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  function create() {
    if (text.length > 0) {
      router.toPopout(<ScreenSpinner />);
      axios.post("create", {
        text: text,
        isAnon: checked,
      })
        .then((res) => {
          //---------------------------\\
          let profile_copy = [mainStorage.profile];
          let object = {
            "id": res.data.id,
            "vk_id": mainStorage.infoUser.id,
            "text": text,
            "first_name": mainStorage.infoUser.first_name,
            "last_name": mainStorage.infoUser.last_name,
            "photo_url": mainStorage.infoUser.photo_200,
            "timestamp": new Date().getFullYear(),
            "status": 0,
            "isAnon": 0,
            "isLike": false,
            "likes": 0
          }

          profile_copy.push(object);

          dispatch(set({ key: "profile", value: profile_copy }));

          //---------------------------\\
          setText("");
          setChecked(false);
          router.toPopout(
            setSnackbar(
              <Snackbar
                onClose={() => setSnackbar(null)}
                before={
                  <Avatar
                    size={35}
                    style={{ background: "var(--field_valid_border)" }}
                  >
                    <Icon28InfoOutline fill="#fff" width={20} height={20} />
                  </Avatar>
                }
                action="Хорошо"
              >
                Мечта отправлена на модерацию
              </Snackbar>
            )
          );
        });
    } else {
      router.toPopout(
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={
              <Avatar size={35} style={{ background: "var(--destructive)" }}>
                <Icon28InfoOutline fill="#fff" width={20} height={20} />
              </Avatar>
            }
            action="Хорошо"
          >
            Ошибка, введите текст
          </Snackbar>
        )
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
          <Textarea
            placeholder="Я мечтаю стать известным"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormItem>
        <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
          Оставить анонимно
        </Checkbox>
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
      {snackbar}
    </>
  );
}

export default withRouter(AddPanel);
