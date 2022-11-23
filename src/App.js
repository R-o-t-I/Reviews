import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "@reyzitwo/react-router-vkminiapps";

import {
  ConfigProvider,
  AppRoot,
  SplitLayout,
  PanelHeader,
  SplitCol,
  Epic,
  View,
  Panel,
  ModalRoot,
  ScreenSpinner,
  usePlatform,
  VKCOM,
  withAdaptivity,
} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";

import { set } from "./js/reducers/mainReducer";

import DesktopNavigation from "./js/components/navigation/desktop";
import MobailNavigation from "./js/components/navigation/mobail";

import ReportModal from "./js/components/modals/report/ReportModal";
import ComeTrueModal from "./js/components/modals/comeTrue/ComeTrueModal";
import HelpedModal from "./js/components/modals/helped/HelpedModal";
import HelperModal from "./js/components/modals/helper/HelperModal";
import InfoHelperModal from "./js/components/modals/infoHelper/InfoHelperModal";
import TopUpModal from "./js/components/modals/top/topUpModal";
import useConnectionStatus from "check-connection";

const HomePanel = lazy(() => import("./js/panels/home/base"));
const AddPanel = lazy(() => import("./js/panels/add/base"));
const ProfilePanel = lazy(() => import("./js/panels/profile/base"));
const AdminPanel = lazy(() => import("./js/panels/profile/admin"));
const ConnectionPanel = lazy(() => import("./js/panels/error/connection"));

const App = withAdaptivity(
  ({ viewWidth, router }) => {
    const mainStorage = useSelector((state) => state.main);
    const dispatch = useDispatch();

    dispatch(set({ key: "isDesktop", value: viewWidth >= 3 }));
    dispatch(
      set({
        key: "platform",
        value: mainStorage.isDesktop ? VKCOM : usePlatform(),
      })
    );
    dispatch(set({ key: "hasHeader", value: mainStorage.isDesktop !== true }));

    useEffect(() => {
      let theme = "bright_light",
        theme_bar = "",
        color = "#f4f8fc";
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === "VKWebAppUpdateConfig") {
          switch (data.scheme) {
            case "bright_light":
              theme = "light";
              theme_bar = "dark";
              color = "#f4f8fc";
              break;
            case "space_gray":
              theme = "dark";
              theme_bar = "light";
              color = "#141414";
              break;
            case "vkcom_dark":
              theme = "dark";
              break;
            case "vkcom_light":
              theme = "light";
              break;
          }
          dispatch(set({ key: "theme", value: theme }));
          bridge.send("VKWebAppSetViewSettings", {
            status_bar_style: theme_bar,
            action_bar_color: color,
          });
        }
      });

      checkConnection();
    }, []);

    function checkConnection() {
      const { checkNetworkStatus } = require("check-network-status");
      var isPanelConnection = false,
        prevPanel = router.activePanel;

      setInterval(() => {
        checkNetworkStatus().then((result) => {
          if (!result) {
            isPanelConnection = true;
            router.toPanel("connection");
          } else {
            if (isPanelConnection) {
              window.location.reload();
              isPanelConnection = false;
            }
          }
        });
      }, 1500);
    }

    const modals = (
      <ModalRoot activeModal={router.modal} onClose={() => router.toBack()}>
        <ReportModal nav="report" />
        <ComeTrueModal nav="comeTrue" />
        <HelpedModal nav="helped" />
        <HelperModal nav="helper" />
        <InfoHelperModal nav="infoHelper" />
        <TopUpModal nav="topUpModal" />
      </ModalRoot>
    );

    return (
      <ConfigProvider
        platform={mainStorage.platform}
        appearance={mainStorage.theme}
        isWebView
      >
        <AppRoot>
          <SplitLayout
            header={mainStorage.hasHeader && <PanelHeader separator={false} />}
            style={{ justifyContent: "center" }}
          >
            <SplitCol
              animate={!mainStorage.isDesktop}
              width={mainStorage.isDesktop ? "748px" : "100%"}
              maxWidth={mainStorage.isDesktop ? "748px" : "100%"}
            >
              <Epic
                activeStory={router.activeView}
                tabbar={!mainStorage.isDesktop && <MobailNavigation />}
              >
                <View
                  id="home"
                  activePanel={
                    router.activePanel === "route_modal"
                      ? "base"
                      : router.activePanel
                  }
                  popout={router.popout}
                  modal={modals}
                >
                  <Panel id="base">
                    <Suspense fallback={<ScreenSpinner />}>
                      <HomePanel />
                    </Suspense>
                  </Panel>
                  <Panel id="connection">
                    <Suspense fallback={<ScreenSpinner />}>
                      <ConnectionPanel />
                    </Suspense>
                  </Panel>
                </View>

                <View
                  id="add"
                  activePanel={
                    router.activePanel === "route_modal"
                      ? "base"
                      : router.activePanel
                  }
                  popout={router.popout}
                  modal={modals}
                >
                  <Panel id="base">
                    <Suspense fallback={<ScreenSpinner />}>
                      <AddPanel />
                    </Suspense>
                  </Panel>
                  <Panel id="connection">
                    <Suspense fallback={<ScreenSpinner />}>
                      <ConnectionPanel />
                    </Suspense>
                  </Panel>
                </View>

                <View
                  id="profile"
                  activePanel={
                    router.activePanel === "route_modal"
                      ? "base"
                      : router.activePanel
                  }
                  popout={router.popout}
                  modal={modals}
                >
                  <Panel id="base">
                    <Suspense fallback={<ScreenSpinner />}>
                      <ProfilePanel />
                    </Suspense>
                  </Panel>
                  <Panel id="admin">
                    <Suspense fallback={<ScreenSpinner />}>
                      <AdminPanel />
                    </Suspense>
                  </Panel>
                  <Panel id="connection">
                    <Suspense fallback={<ScreenSpinner />}>
                      <ConnectionPanel />
                    </Suspense>
                  </Panel>
                </View>
              </Epic>
            </SplitCol>

            {mainStorage.isDesktop && <DesktopNavigation />}
          </SplitLayout>
        </AppRoot>
      </ConfigProvider>
    );
  },
  { viewWidth: true }
);

export default withRouter(App);
