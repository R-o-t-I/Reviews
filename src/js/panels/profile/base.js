import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";

import {
  PanelHeader,
  Avatar,
  Title,
  Text,
  ScreenSpinner,
  SimpleCell,
  List,
  IconButton,
  Spacing,
  Separator,
  Tappable,
  ActionSheet,
  ActionSheetItem,
  Alert,
  Placeholder,
  Button,
  Div,
  VKCOM,
  Snackbar,
  CellButton,
  Footer,
  Link,
  IOS,
} from "@vkontakte/vkui";

import { Dropdown } from "@vkontakte/vkui/dist/unstable";

import {
  Icon28ArrowUpRectangleOutline,
  Icon28BugOutline,
  Icon28CancelOutline,
  Icon28ChatsOutline,
  Icon28ClockOutline,
  Icon28DeleteOutline,
  Icon28DonateOutline,
  Icon28DoneOutline,
  Icon28FireOutline,
  Icon28MagicWandOutline,
  Icon28MoreHorizontal,
  Icon28PincodeLockOutline,
  Icon28ShareOutline,
  Icon28StarsOutline,
  Icon28StatisticsOutline,
  Icon28StoryOutline,
  Icon28Users3Outline,
  Icon28UsersOutline,
  Icon56Stars3Outline,
} from "@vkontakte/icons";

import style from "./base.module.scss";
import { set } from "../../reducers/mainReducer";

let isInfoUser = false;

function ProfilePanel({ router }) {
  const mainStorage = useSelector((state) => state.main);
  const platform = useSelector((state) => state.main.platform);
  const dispatch = useDispatch();
  const [info, setInfo] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!isInfoUser && !status) {
      getInfoUser();
      getInfo();
      setStatus(true);
    } else {
      setInfo(mainStorage.profile);
    }
  });

  async function getInfo() {
    router.toPopout(<ScreenSpinner />);
    const { data } = await axios.get("profile");
    if (data.id >= 0) {
      setInfo(data.dreams);
      setIsAdmin(data.admin);
      dispatch(set({ key: "profile", value: data.dreams }));
      dispatch(set({ key: "isAdmin", value: data.admin }));
      dispatch(set({ key: "client", value: data.client }));
      dispatch(set({ key: "isSub", value: data.isSub }));
      dispatch(set({ key: "donutLevel", value: data.donutLevel }));
      dispatch(set({ key: "user_id", value: data.id }));
      router.toPopout();
    } else {
      router.toPopout();
      router.toPopout(
        <Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>
      );
    }
  }

  async function getInfoUser() {
    router.toPopout(<ScreenSpinner />);

    let user_info = await bridge.send("VKWebAppGetUserInfo");
    user_info.name = user_info.first_name + " " + user_info.last_name;
    dispatch(set({ key: "infoUser", value: user_info }));

    isInfoUser = true;
    router.toPopout();
  }

  async function deleteDream(id) {
    const { data } = await axios.post("delete", { id: id });

    if (data.status) {
      let copy_home = [];
      let copy_profile = [];
      mainStorage.home.forEach((inf, index) => {
        copy_home[index] = { ...inf };
      });
      mainStorage.profile.forEach((inf, index) => {
        copy_profile[index] = { ...inf };
      });

      mainStorage.home.find((item) => {
        if (Number(item.id) === Number(id)) {
          copy_home.splice(copy_home.indexOf(item), 1);
          dispatch(set({ key: "home", value: copy_home }));
        }
        console.log(copy_home);
      });

      mainStorage.profile.find((item) => {
        if (Number(item.id) === Number(id)) {
          copy_profile.splice(info.indexOf(item), 1);
          setInfo(copy_profile);
          dispatch(set({ key: "profile", value: info }));
        }
      });

      dispatch(set({ key: "profile", value: copy_profile }));
      setTimeout(
        () =>
          router.toPopout(
            <Snackbar
              onClose={() => router.toBack()}
              before={
                <Avatar
                  size={35}
                  style={{
                    background: "var(--field_valid_border)",
                  }}
                >
                  <Icon28DoneOutline fill="#fff" width={20} height={20} />
                </Avatar>
              }
            >
              ?????????? ??????????????
            </Snackbar>
          ),
        1000
      );
    } else {
      router.toPopout(
        <Snackbar onClose={() => router.toPopout()}>{data.info}</Snackbar>
      );
    }
  }

  async function openMore(e, id, item, index) {
    router.toPopout(
      <ActionSheet
        onClose={() => router.toBack()}
        iosCloseItem={
          <ActionSheetItem autoclose mode="cancel">
            ????????????????
          </ActionSheetItem>
        }
        toggleRef={e.currentTarget}
      >
        {/*!item.isPerform &&
          <ActionSheetItem
            autoclose
            onClick={() => {
              dispatch(set({key: "helperInfo", value: {}}));
              dispatch(set({ key: "helpersID", value: index}));
              router.toModal("comeTrue");
            }}
            before={<Icon28StarsOutline/>}
          >
            ?????????? ??????????????
          </ActionSheetItem>
        */}
        {mainStorage.client === 'vk' && (
          <ActionSheetItem
            onClick={() => {
              if (!mainStorage.isSub) {
                router.toModal("lvlDonutModal");
              } else {
                dispatch(set({key: "upInfo", value: item}));
                router.toModal("topUpModal");
              }
            }}
            before={<Icon28ArrowUpRectangleOutline />}
            autoclose
          >
            ?????????????? ?? ??????
          </ActionSheetItem>
        )}
        <ActionSheetItem
          onClick={() => openAlertDeletion(id)}
          mode="destructive"
          before={<Icon28DeleteOutline />}
          autoclose
        >
          <div className={style.actionDestructive}>?????????????? ??????????</div>
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function openAlertDeletion(id) {
    router.toPopout(
      <Alert
        actions={[
          {
            title: "??????",
            autoclose: true,
            mode: "cancel",
          },
          {
            title: "????",
            autoclose: true,
            mode: "destructive",
            action: () => deleteDream(id),
          },
        ]}
        onClose={() => router.toBack()}
        header="?????????????? ??????????"
        text="???? ?????????????????????????? ???????????? ?????????????? ???????????"
      />
    );
  }

  function timeConverterDaily(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp),
      months = [
        "????????????",
        "??????????????",
        "??????????",
        "????????????",
        "??????",
        "????????",
        "????????",
        "??????????????",
        "????????????????",
        "??????????????",
        "????????????",
        "??????????????",
      ],
      month = months[a.getMonth()],
      year = a.getFullYear(),
      date = a.getDate(),
      time = date + " " + month + " 2022";
    return time;
  }

  function shareWallPost(item, index) {
    bridge.send("VKWebAppShowWallPostBox", {
      message: `???????????????????????? ${item.first_name} ${item.last_name} ?????????????? ??????????: "${item.text}"\n\n???????????? ???????????????? ?? ????????????????????: vk.com/app51456689`,
    });
  }

  return (
    <>
      <PanelHeader separator={false}>??????????????</PanelHeader>
      <div className={style.blockHeader}>
        {mainStorage.isAdmin === 1 && (
          <div className={style.blockButtonHeaderLeft}>
            <IconButton onClick={() => router.toPanel("admin")}>
              <Icon28PincodeLockOutline />
            </IconButton>
            <IconButton onClick={() => router.toModal("lvlDonutModal")}>
              <Icon28StatisticsOutline />
            </IconButton>
          </div>
        )}
        <Avatar size={96} src={mainStorage.infoUser.photo_200} />
        <Title className={style.nameUser} level="2" weight="medium">
          {mainStorage.infoUser.name}
        </Title>
        <Text className={style.descriptionUser}>
          ?? ?????? {info.length}
          {
            [" ??????????", " ??????????", " ????????"][
              info.length % 100 > 4 && info.length % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][
                    info.length % 10 < 5 ? info.length % 10 : 5
                  ]
            ]
          }
        </Text>
      </div>
      <div
        className={
          platform === VKCOM ? `${style.infoBlock}` : `${style.infoBlockMobile}`
        }
      >
        <SimpleCell
          multiline
          subtitle="?????????????????? ?????????????? ?????????? ????????????????"
          before={<Icon28Users3Outline />}
          className={
            platform === VKCOM ? `${style.infoItem}` : `${style.infoItemMobile}`
          }
          href={
            mainStorage.client === "vk"
              ? "https://vk.com/skyreglis"
              : "https://ok.ru/skyreglis"
          }
          target="_blank"
        >
          ???????? ????????????????????
        </SimpleCell>
        <SimpleCell
          before={<Icon28ChatsOutline />}
          multiline
          subtitle="?????????????????? ?? ?????????????? ??????????????????????"
          className={
            platform === VKCOM ? `${style.infoItem}` : `${style.infoItemMobile}`
          }
          href={
            mainStorage.client === "vk"
              ? "https://vk.me/join/m7/Q310/T5p4bI4hrSydrGkU_FrkMogkjyo="
              : "https://ok.ru/messages/join/C4HMuv1Oxxmk9_7gsqp67DHv4LHpPgAOPqOAz05SpWc"
          }
          target="_blank"
        >
          ???????? ????????????
        </SimpleCell>
        <SimpleCell
          before={<Icon28BugOutline />}
          multiline
          subtitle="???????????????????? ?????????? ?????? ??????????????"
          className={
            platform === VKCOM ? `${style.infoItem}` : `${style.infoItemMobile}`
          }
          href={
            mainStorage.client === "vk"
              ? "https://vk.me/skyreglis"
              : "https://ok.ru/group/58564673077471/messages"
          }
          target="_blank"
        >
          ???????????????? ??????????????????????????
        </SimpleCell>
        {mainStorage.client === "vk" && (
          <>
            {platform === IOS ? (
              ""
            ) : (
              <>
                <SimpleCell
                  before={<Icon28DonateOutline />}
                  multiline
                  subtitle="???????????????????? ??????, ?????????????? ???????????????? VK Donut"
                  className={
                    platform === VKCOM
                      ? `${style.infoItem}`
                      : `${style.infoItemMobile}`
                  }
                  onClick={() => router.toModal("lvlDonutModal")}
                >
                  ???????????????????? ??????
                </SimpleCell>
              </>
            )}
          </>
        )}
      </div>
      <div className={style.headerList}>???????? ??????????:</div>
      {!info.length && (
        <div className={style.blockReview}>
          <Placeholder
            icon={<Icon56Stars3Outline />}
            header="?? ?????? ?????? ????????"
            action={
              <Button size="m" onClick={() => router.toView("add")}>
                ???????????????? ??????????
              </Button>
            }
          >
            ???? ?????? ???? ?????????????????? ???????? ??????????. ???? ??????????????????????, ???????????????? ?????? ??????????
            ????????????, ?????????? ????????????????.
          </Placeholder>
        </div>
      )}
      <div className={style.listReviews}>
        {info.map((item, index) => (
          <div className={style.blockReview}>
            <SimpleCell
              multiline
              before={<Avatar src={item.photo_url} size={48} />}
              description={timeConverterDaily(item.timestamp)}
              className={style.simpleCellReviews}
              after={
                <IconButton onClick={(e) => openMore(e, item.id, item, index)}>
                  <Icon28MoreHorizontal />
                </IconButton>
              }
              disabled
            >
              {item.first_name} {item.last_name}
            </SimpleCell>
            <div>{item.text}</div>
            <Spacing size={32}>
              <Separator wide />
            </Spacing>
            <div className={style.blockButtonReview}>
              <Tappable className={style.buttonReview} disabled>
                <Icon28FireOutline />
                <div className={style.countButton}>{item.likes}</div>
              </Tappable>
              {mainStorage.isAdmin === 1 && (
                <Tappable className={style.buttonReview} disabled>
                  <Icon28StoryOutline />
                </Tappable>
              )}
              <Tappable
                onClick={() => shareWallPost(item)}
                className={style.buttonReview}
              >
                <Icon28ShareOutline />
              </Tappable>
              <div className={style.buttonReviewRight}>
                {item.performs !== undefined && item.performs.length !== 0 ? (
                  <Tappable
                    className={style.buttonHelped}
                    onClick={() => {
                      dispatch(set({ key: "helpers", value: item.performs }));
                      dispatch(set({ key: "helpersID", value: index }));
                      router.toModal("infoHelper");
                    }}
                  >
                    <Icon28MagicWandOutline />
                    {platform === VKCOM && (
                      <div className={style.textButtonHelped}>
                        ?????????? ????????????!
                      </div>
                    )}
                  </Tappable>
                ) : (
                  <>
                    {item.isPerform && (
                      <Tappable className={style.buttonHelped} disabled>
                        <Icon28StarsOutline />
                        {platform === VKCOM && (
                          <div className={style.textButtonHelped}>
                            ?????????? ??????????????
                          </div>
                        )}
                      </Tappable>
                    )}
                  </>
                )}
                {item.status === -1 && (
                  <Dropdown
                    action="hover"
                    placement="bottom-end"
                    content={
                      <Div>
                        <Text>?????????? ??????????????????</Text>
                      </Div>
                    }
                  >
                    <div className={style.moderationsNegative}>
                      <Icon28CancelOutline />
                    </div>
                  </Dropdown>
                )}
                {item.status === 1 && (
                  <Dropdown
                    action="hover"
                    placement="bottom-end"
                    content={
                      <Div>
                        <Text>?????????? ??????????????</Text>
                      </Div>
                    }
                  >
                    <div className={style.moderationsPositive}>
                      <Icon28DoneOutline />
                    </div>
                  </Dropdown>
                )}
                {item.status === 0 && (
                  <Dropdown
                    action="hover"
                    placement="bottom-end"
                    content={
                      <Div>
                        <Text>?????????? ???? ????????????????????????</Text>
                      </Div>
                    }
                  >
                    <div className={style.moderations}>
                      <Icon28ClockOutline />
                    </div>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        ))}
        <Footer className={style.footer}>
          <div>???????????? kd91o</div>
          <div>
            ?????????????? ?? ????????? ????{" "}
            <Link href="https://vk.com/skyreglis" target="_blank">
              SkyReglis Studio
            </Link>
          </div>
        </Footer>
      </div>
      {snackbar}
    </>
  );
}

export default withRouter(ProfilePanel);
