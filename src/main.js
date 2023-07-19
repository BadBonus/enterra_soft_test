import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import RefreshToken from "@/services/RefreshToken";

createApp(App).use(router).use(Notifications).mount("#app");
RefreshToken();
