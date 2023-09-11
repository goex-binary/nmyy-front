import Socket from "./socket";
import { socketBaseUrl } from "@/config/baseUrl";

const commandSocketName = "COMMAND";
const alertSocketName = "ALERT";

const commandSocket = new Socket(`${socketBaseUrl}/command`, commandSocketName);
const alertSocket = new Socket(`${socketBaseUrl}/alert`, alertSocketName);

export default {
  install(Vue) {
    Vue.prototype.$commandSocket = commandSocket;
    Vue.prototype.$alertSocket = alertSocket;
  },
};
