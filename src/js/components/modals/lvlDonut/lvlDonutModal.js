import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  ANDROID,
  List,
  SimpleCell,
  ButtonGroup,
  Button,
  VKCOM,
} from "@vkontakte/vkui";

import bridge from "@vkontakte/vk-bridge";

import axios from "axios";

import {
  Icon24DismissDark,
  Icon24RectangleOutline,
  Icon28ArrowUpRectangleOutline,
  Icon28CoffeeSteamOutline,
  Icon28FavoriteCircleFillYellow,
  Icon28PosterIcon,
  Icon28TextOutline,
} from "@vkontakte/icons";

import style from "./lvlDonutModal.module.scss";

const { set } = require("../../../reducers/mainReducer");

function LvlDonutModal({ nav, router }) {
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const dispatch = useDispatch();

  function checkSub() {
    const timer = setInterval(async () => {
      const { data } = await axios.get("isSub");
      if (data.isSub) {
        clearInterval(timer);
        dispatch(set({ isSub: true }));
      }
    }, 1000);
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
          Оформить подписку
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      <div className={style.subHeaderText}>
        Поддержите нас подпиской VK Donut и получите дополнительный функционал
      </div>
      {!mainStorage.isSub ? (
        <div>
          <div className={style.backgroundContainer}>
            <div className={style.titleLvl}>
              <div className={style.titleCountLvl}>1 уровень</div>
              <div className={style.titlePriceLvl}>от 50 руб.</div>
            </div>
            <List className={style.listCellLVL}>
              <SimpleCell
                multiline
                before={<Icon28FavoriteCircleFillYellow />}
                disabled
              >
                Иконка в виде звёздочки в комментариях нашего сообщества
              </SimpleCell>
              <SimpleCell
                multiline
                before={<Icon28ArrowUpRectangleOutline />}
                disabled
                subtitle="Каждый месяц подписки будет выдаваться по 5 бесплатных поднятий мечты в топ"
              >
                5 бесплатных поднятий топ
              </SimpleCell>
              <SimpleCell multiline before={<Icon28PosterIcon />} disabled>
                Фоны для блоков мечт
              </SimpleCell>
              <SimpleCell
                multiline
                before={<Icon24RectangleOutline width={28} height={28} />}
                disabled
              >
                Рамки для блоков мечт
              </SimpleCell>
              <SimpleCell multiline before={<Icon28TextOutline />} disabled>
                Шрифты для текста мечт
              </SimpleCell>
              <SimpleCell
                multiline
                before={<Icon28CoffeeSteamOutline />}
                disabled
              >
                Поддержка разработчиков
              </SimpleCell>
            </List>
          </div>
          <div className={style.backgroundContainer}>
            <div className={style.titleLvl}>
              <div className={style.titleCountLvl}>2 уровень</div>
              <div className={style.titlePriceLvl}>от 100 руб.</div>
            </div>
            <List className={style.listCellLVL}>
              <SimpleCell
                multiline
                before={<Icon28FavoriteCircleFillYellow />}
                disabled
              >
                Иконка в виде звёздочки в комментариях нашего сообщества
              </SimpleCell>
              <SimpleCell
                multiline
                before={<Icon28ArrowUpRectangleOutline />}
                disabled
                subtitle="Каждый месяц подписки будет выдаваться по 5 бесплатных поднятий мечты в топ"
              >
                10 бесплатных поднятий топ
              </SimpleCell>
              <SimpleCell multiline before={<Icon28PosterIcon />} disabled>
                Фоны для блоков мечт
              </SimpleCell>
              <SimpleCell
                multiline
                before={<Icon24RectangleOutline width={28} height={28} />}
                disabled
              >
                Рамки для блоков мечт
              </SimpleCell>
              <SimpleCell multiline before={<Icon28TextOutline />} disabled>
                Шрифты для текста мечт
              </SimpleCell>
              <SimpleCell
                multiline
                before={<Icon28CoffeeSteamOutline />}
                disabled
              >
                Поддержка разработчиков
              </SimpleCell>
            </List>
          </div>
          <div className={style.button}>
            <ButtonGroup
              mode={platform === VKCOM ? "horizontal" : "vertical"}
              stretched
            >
              <Button
                appearance="positive"
                size="l"
                mode="primary"
                onClick={() => checkSub()}
                href="https://vk.com/donut/skyreglis"
                target="_blank"
                stretched
              >
                Поддержать нас
              </Button>
              <Button
                href="https://vk.com/@donut-faq-dlya-donov"
                target="_blank"
                size="l"
                mode="secondary"
                stretched
              >
                Подробнее о VK Donut
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : (
        <div className={style.backgroundContainer}>
          <div className={style.titleLvl}>
            <div className={style.titleCountLvl} style={{ display: "center" }}>
              Вы уже оформили подписку {mainStorage.donutLevel} уровня, спасибо!
              Теперь вам доступны все функции
            </div>
          </div>
        </div>
      )}
    </ModalPage>
  );
}

export default withRouter(LvlDonutModal);
