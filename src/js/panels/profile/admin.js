import React, { useEffect } from "react";
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
  Spacing,
  Tabs,
  TabsItem,
  Textarea,
  VKCOM,
} from "@vkontakte/vkui";

import style from "./admin.module.scss";
import {
  Icon28ArticleOutline,
  Icon28ReportOutline,
  Icon56ThumbsUpOutline,
} from "@vkontakte/icons";

function AdminPanel({ router }) {
  const platform = useSelector((state) => state.main.platform);
  const [selected, setSelected] = React.useState("dreams");
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
  }

  async function denyDream(id) {
    await axios.post("denyDream", {
      id: id,
    });
    getModerationList();
  }

  async function getReportsList() {
    const { data } = await axios.get("getReportsList");
    setReport(data);
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
                Отличная работа, мы все рассмотрели
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
                Отличная работа, мы все рассмотрели
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
                      <Link>first_name1 last_name1</Link> жалуется на мечту{" "}
                      <Link>first_name2 last_name2</Link>
                    </SimpleCell>
                    <div>Текст жалобы:</div>
                    <div>text report</div>
                    <div>Текст мечты:</div>
                    <div>text dreams</div>
                    <ButtonGroup stretched style={{ marginTop: 16 }}>
                      <Button size="m" stretched appearance="positive">
                        Удалить мечту
                      </Button>
                      <Button
                        size="m"
                        stretched
                        appearance="accent"
                        mode="secondary"
                      >
                        Отклонить жалобу
                      </Button>
                      <Button size="m" stretched appearance="negative">
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
    </>
  );
}

export default withRouter(AdminPanel);
