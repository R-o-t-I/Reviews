import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  IOS,
  FormLayout,
  FormItem,
  Input,
  Avatar,
  Caption,
  HorizontalScroll,
  Subhead,
  Card,
  Title,
  RichCell,
  Separator,
  Textarea,
  ANDROID,
  Div,
  Button,
  Checkbox,
} from "@vkontakte/vkui";

import {
  Icon24ChevronLeft,
  Icon24MoreHorizontal,
  Icon24DismissDark,
} from "@vkontakte/icons";

import style from "./comeTrueModal.module.scss";

const randomTeam = [
  {
    id: "skgopnik",
    name: "Артём Петрунин",
    status: "</>",
    img: "https://sun1-91.userapi.com/s/v1/ig2/7B5zlAVlxq8fzmyyY4PvFzhOzqufJlewKEoGCKFW1Snvllcx3vmfoERGUgBog_Ed4aE5k-pGxe0gAhn4JhXhb5gP.jpg?size=100x0&quality=96&crop=0,267,1296,1296&ava=1",
  },
  {
    id: "alexander_tihonovich",
    name: "Александр Тихонович",
    status: "Продам гараж",
    img: "https://sun1-90.userapi.com/s/v1/if2/BU2FtExpWyNrPig4yJPmzIaW5Wtd88yW2mb1coyxf1iALDjeYk2R5NbCIFPEkF0I8tRAHZtpK46aRAuF5E4Z8ok1.jpg?size=100x0&quality=96&crop=994,684,747,747&ava=1",
  },
  {
    id: "aniv",
    name: "Антон Иванков",
    status: "Дизайню даже людей 😏",
    img: "https://sun1-90.userapi.com/s/v1/if1/Ef_yRkoR42rVnJs5VbrSzOM-ARTrQSR7Tze7GDPvYja0IjV5_HGfR-vHJhecCndUxPxZgb7R.jpg?size=100x0&quality=96&crop=0,0,2160,2160&ava=1",
  },
  {
    id: "anpoo",
    name: "Аня Безуглова",
    status: "Ламповый художник ✨",
    img: "https://sun1-85.userapi.com/s/v1/ig2/76WlLgkHgCQuDkSNx8hLlUa3oME01eDLSMPoP8965EfMtPMxJh5XjaTjHmv82cXlc0RxIc0ogQMe-o-VnHniwlQt.jpg?size=100x0&quality=96&crop=22,74,519,519&ava=1",
  },
];

function ComeTrueModal({ nav, router }) {
  const platform = useSelector((state) => state.main.platform);

  return (
    <ModalPage
      className={style.modal}
      nav={nav}
      header={
        <ModalPageHeader
          right={
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
          Мечта сбылась
        </ModalPageHeader>
      }
      onClose={() => router.toBack()}
      settlingHeight={100}
    >
      <Card className={style.copy} mode="outline">
        <div className={style.header}>
          <Icon24ChevronLeft />
          <Title level="2" weight="heavy">
            {randomTeam.id}
          </Title>
          <Icon24MoreHorizontal />
        </div>
        <div className={style.mini}>
          <div className={style.arrow} />
          <Caption className={style.copyItem} level="1" weight="regular">
            Скопировать
          </Caption>
          <Caption className={style.shareItem} level="1" weight="regular">
            Поделиться
          </Caption>
        </div>
        <Separator />
        <RichCell
          disabled
          multiline
          before={<Avatar size={64} src={randomTeam.img} />}
          text={randomTeam.status}
          caption="offline"
        >
          {randomTeam.name}
        </RichCell>
      </Card>
      <FormLayout>
        <FormItem top="Кто помог Вам?">
          <Input placeholder="Введите ID или короткий адрес" />
        </FormItem>
      </FormLayout>
      <div className={style.recent}>
        <Subhead weight="regular">Недавние помощники</Subhead>
        <HorizontalScroll>
          <div className={style.list}>
            <div className={style.item}>
              <Avatar size={24} src={""} />
              <Caption level="1" weight="regular">
                firstName lastName
              </Caption>
            </div>
          </div>
        </HorizontalScroll>
      </div>
      <FormLayout>
        <FormItem top="Как это было?">
          <Textarea placeholder="Опишите, в чем заключалась помощь" />
          <Checkbox>Показывать комментарий всем</Checkbox>
        </FormItem>
      </FormLayout>
      <Div>
        <Button stretched size="m">
          Готово
        </Button>
      </Div>
    </ModalPage>
  );
}

export default withRouter(ComeTrueModal);
