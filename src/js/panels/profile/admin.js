import React, { useEffect, useState } from "react";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import { useSelector } from "react-redux";

import axios from "axios";

import {
  Avatar,
  Button,
  ButtonGroup,
  HorizontalScroll,
  Link,
  List,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Separator,
  SimpleCell,
  Snackbar,
  Spacing,
  Tabs,
  TabsItem,
  Textarea,
  VKCOM,
} from "@vkontakte/vkui";

import style from "./admin.module.scss";
import {
  Icon28ArticleOutline,
  Icon28DoneOutline,
  Icon28ReportOutline,
  Icon56ThumbsUpOutline,
} from "@vkontakte/icons";

function AdminPanel({ router }) {
  const platform = useSelector((state) => state.main.platform);
  const [selected, setSelected] = React.useState("dreams");
  const [snackbar, setSnackbar] = useState(null);
  const [info, setInfo] = React.useState([]);
  const [report, setReport] = React.useState([]);

  useEffect(() => {
    if (platform === VKCOM) {
      document.title = "Админка";
    }
    getModerationList();
    getReportsList();
  }, []);

  async function getModerationList() {
    const { data } = await axios.get("getModerationList");
    setInfo(data);
  }

  async function acceptDream(item) {
    await axios.post("acceptDream", {
      id: item.id,
      text: item.text,
    });
    getModerationList();
    router.toPopout(
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={
            <Avatar
              size={35}
              style={{ background: "var(--field_valid_border)" }}
            >
              <Icon28DoneOutline fill="#fff" width={20} height={20} />
            </Avatar>
          }
        >
          Мечта с id: {item.id} одобрена
        </Snackbar>
      )
    );
  }

  async function denyDream(id) {
    await axios.post("denyDream", {
      id: id,
    });
    getModerationList();
    router.toPopout(
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={
            <Avatar size={35} style={{ background: "var(--destructive)" }}>
              <Icon28DoneOutline fill="#fff" width={20} height={20} />
            </Avatar>
          }
        >
          Мечта с id: {id} отклонена
        </Snackbar>
      )
    );
  }

  async function getReportsList() {
    const { data } = await axios.get("getReportsList");
    setReport(data);
  }

  function deleteDream(id) {
    axios.post("denyDream", {
      id: id,
    });
    getModerationList();
    router.toPopout(
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={
            <Avatar
              size={35}
              style={{ background: "var(--field_valid_border)" }}
            >
              <Icon28DoneOutline fill="#fff" width={20} height={20} />
            </Avatar>
          }
        >
          Жалоба с id: {id} принята. Мечта удалена
        </Snackbar>
      )
    );
  }

  function denyReport(id) {
    axios.post("denyReport", {
      id: id,
    });
    getModerationList();
    router.toPopout(
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={
            <Avatar
              size={35}
              style={{ background: "var(--field_valid_border)" }}
            >
              <Icon28DoneOutline fill="#fff" width={20} height={20} />
            </Avatar>
          }
        >
          Жалоба с id: {id} отклонена
        </Snackbar>
      )
    );
  }

  function ban(item) {
    axios.post("banUser", {
      id: item.user_id,
    });
    getModerationList();
    router.toPopout(
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={
            <Avatar
              size={35}
              style={{ background: "var(--field_valid_border)" }}
            >
              <Icon28DoneOutline fill="#fff" width={20} height={20} />
            </Avatar>
          }
        >
          Мечта удалена. Пользователь с id: {item.user_id} заблокирован
        </Snackbar>
      )
    );
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
      <div className={style.tabs}>
        <Tabs mode="accent">
          <HorizontalScroll arrowSize="m">
            <TabsItem
              selected={selected === "dreams"}
              onClick={() => setSelected("dreams")}
              before={<Icon28ArticleOutline width={20} height={20} />}
            >
              Мечты
            </TabsItem>
            <TabsItem
              selected={selected === "reports"}
              onClick={() => setSelected("reports")}
              before={<Icon28ReportOutline width={20} height={20} />}
            >
              Жалобы
            </TabsItem>
          </HorizontalScroll>
        </Tabs>
      </div>
      <div className={style.container}>
        {selected === "dreams" && (
          <>
            {info.length === 0 ? (
              <Placeholder
                icon={<Icon56ThumbsUpOutline />}
                header="Новых мечт нет"
              >
                Отличная работа, мы все рассмотрели.
              </Placeholder>
            ) : (
              <>
                <SimpleCell
                  disabled
                  className={style.simpleCellReviews}
                  after={info.length}
                >
                  Мечт на модерации:
                </SimpleCell>
                <Spacing>
                  <Separator wide />
                </Spacing>

                {info.map((item, index) => (
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
                    <Textarea
                      style={{ marginTop: 12 }}
                      defaultValue={item.text}
                      onChange={(e) => {
                        item.text = e.target.value;
                      }}
                    />
                    <ButtonGroup stretched style={{ marginTop: 16 }}>
                      <Button
                        size="m"
                        stretched
                        appearance="positive"
                        onClick={() => acceptDream(item)}
                      >
                        Принять
                      </Button>
                      <Button
                        size="m"
                        stretched
                        appearance="negative"
                        onClick={() => denyDream(item.id)}
                      >
                        Отклонить
                      </Button>
                    </ButtonGroup>
                  </List>
                ))}
              </>
            )}
          </>
        )}
        {selected === "reports" && (
          <>
            {report.length === 0 ? (
              <Placeholder
                icon={<Icon56ThumbsUpOutline />}
                header="Новых жалоб нет"
              >
                Отличная работа, мы все рассмотрели.
              </Placeholder>
            ) : (
              <>
                <SimpleCell
                  disabled
                  className={style.simpleCellReviews}
                  after={report.length}
                >
                  Жалоб на модерации:
                </SimpleCell>
                <Spacing>
                  <Separator wide />
                </Spacing>
                {report.map((item, index) => (
                  <List style={{ marginTop: 12 }}>
                    <SimpleCell
                      disabled
                      before={
                        <Avatar
                          badge={<Avatar src="" size={20} />}
                          src=""
                          size={48}
                        />
                      }
                      description="05.10.2022 в 12:23"
                      className={style.simpleCellReviews}
                      multiline
                    >
                      <Link>{item.vk_id}</Link> жалуется на мечту{" "}
                      <Link>
                        {item.first_name} {item.last_name}
                      </Link>
                    </SimpleCell>
                    <div>Текст жалобы:</div>
                    <div>{item.text}</div>
                    <div>Текст мечты:</div>
                    <div>{item.text_dream}</div>
                    <ButtonGroup stretched style={{ marginTop: 16 }}>
                      <Button
                        size="m"
                        stretched
                        appearance="positive"
                        onClick={() => deleteDream(item.dream_id)}
                      >
                        Удалить мечту
                      </Button>
                      <Button
                        size="m"
                        stretched
                        appearance="accent"
                        mode="secondary"
                        onClick={() => denyReport(item.id)}
                      >
                        Отклонить жалобу
                      </Button>
                      <Button
                        size="m"
                        stretched
                        appearance="negative"
                        onClick={() => ban(item)}
                      >
                        Заблокировать
                      </Button>
                    </ButtonGroup>
                  </List>
                ))}
              </>
            )}
          </>
        )}
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(AdminPanel);
