import React, { useState, useEffect } from "react";
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
  HorizontalScroll,
  HorizontalCell,
  Switch,
  SimpleCell,
} from "@vkontakte/vkui";

import style from "./base.module.scss";
import {
  Icon28ChevronDownOutline,
  Icon28DonateCircleFillYellow,
  Icon28DonateOutline,
  Icon28InfoOutline,
} from "@vkontakte/icons";

import axios from "axios";
import { set } from "../../reducers/mainReducer";
import { useDispatch, useSelector } from "react-redux";
import bridge from "@vkontakte/vk-bridge";

function AddPanel({ router }) {
  const dispatch = useDispatch();
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [add, setAdd] = useState(false);
  const [switchValue, setSwitchValue] = useState(
    mainStorage.infoUser.notifications
  );

  useEffect(() => {
    setText(mainStorage.add);
    if (!add) {
      bridge.send("VKWebAppCheckNativeAds", { ad_format: "interstitial" });
      setAdd(true);
    }
    console.log(mainStorage.infoUser);
  }, []);

  function changeSwitch() {
    setSwitchValue(!switchValue);
    bridge
      .send("VKWebAppAllowMessagesFromGroup", { group_id: 193207379, key: "1" })
      .then((res) => console.log(res.result));
  }

  function create() {
    if (text.length > 0) {
      router.toPopout(<ScreenSpinner />);
      axios.get("notifications/" + switchValue);
      bridge.send("VKWebAppShowNativeAds", { ad_format: "interstitial" });
      axios
        .post("create", {
          text: text,
          isAnon: checked,
        })
        .then((res) => {
          if (res.data.status) {
            //---------------------------\\
            let profile_copy = [...mainStorage.profile];

            profile_copy.unshift(res.data.object);
            dispatch(set({ key: "profile", value: profile_copy }));

            //---------------------------\\
            setText("");
            dispatch(set({ key: "add", value: "" }));
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
          } else {
            router.toPopout(
              <Snackbar onClose={() => router.toPopout()}>
                {res.data.info}
              </Snackbar>
            );
          }
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
            Произошла ошибка, введите текст мечты
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
          Расскажите нам о ней, чтобы узнать, о чём мечтают другие люди
          (анонимность по Вашему желанию).
        </div>
        <FormItem
          top={
            <div style={{ display: "flex" }}>
              <div>Мечта</div>
              <div style={{ marginLeft: "auto" }}>{text.length}/1000</div>
            </div>
          }
        >
          <Textarea
            placeholder="Я мечтаю стать известным"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              dispatch(set({ key: "add", value: e.target.value }));
            }}
            maxLength="1000"
          />
        </FormItem>
        {mainStorage.isAdmin === 1 && (
          <>
            <div className={style.decorButtonContainer}>
              <div className={style.decorButton}>
                <div className={style.titleDecorButton}>Шрифт</div>
                <div className={style.iconDecorButton}>
                  <Icon28ChevronDownOutline width={16} height={16} />
                </div>
              </div>
              <div className={style.decorButton}>
                <div className={style.titleDecorButton}>Рамка</div>
                <div className={style.iconDecorButton}>
                  <Icon28ChevronDownOutline width={16} height={16} />
                </div>
              </div>
              <div className={style.decorButton}>
                <div className={style.titleDecorButton}>Фон</div>
                <div className={style.iconDecorButton}>
                  <Icon28ChevronDownOutline width={16} height={16} />
                </div>
              </div>
            </div>
            <HorizontalScroll
              showArrows
              getScrollToLeft={(i) => i - 120}
              getScrollToRight={(i) => i + 120}
            >
              <div style={{ display: "flex", marginTop: 12 }}>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    style={{
                      backgroundColor: "var(--background_content)",
                      border: "3px solid var(--accent)",
                    }}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://w7.pngwing.com/pngs/129/100/png-transparent-violet-blue-sky-purple-blue-background-sky-skyline.png"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2655.jpg?size=626&ext=jpg"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://oir.mobi/uploads/posts/2021-03/1616538453_5-p-odnotonnii-fon-dlya-teksta-7.jpg"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://img1.goodfon.ru/wallpaper/nbig/0/69/tekstura-svetlyy-fon-zheltyy.jpg"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?size=626&ext=jpg&ga=GA1.2.2011711811.1640476800"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://www.publicdomainpictures.net/pictures/40000/velka/background-1366644919rfW.jpg"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://oir.mobi/uploads/posts/2021-03/1616600208_17-p-tekhnicheskii-fon-18.jpg"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
                <HorizontalCell disabled size="m">
                  <Avatar
                    size={88}
                    mode="app"
                    src="https://oir.mobi/uploads/posts/2021-03/1616524585_55-p-nezhno-rozovii-fon-56.jpg"
                    badge={<Icon28DonateCircleFillYellow />}
                  />
                </HorizontalCell>
              </div>
            </HorizontalScroll>
          </>
        )}
        <div className={style.checkboxStyle}>
          <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
            Оставить анонимно
          </Checkbox>
        </div>
        {/*
        <SimpleCell Component="label" after={<Switch defaultChecked={switchValue} onClick={() => changeSwitch()}/>}>
          Получать уведомления в личные сообщения
        </SimpleCell>*/}
        <FormItem>
          <Button size="l" stretched onClick={() => create()}>
            Отправить
          </Button>
        </FormItem>
        <div className={style.footer}>
          Каждая мечта сбывается, главное, не переставать верить в неё,{" "}
          <Link href="https://vk.com/skyreglis" target="_blank">
            команда SkyReglis Studio
          </Link>{" "}
          ❤️ Вас
        </div>
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(AddPanel);
