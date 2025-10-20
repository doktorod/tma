import { useQrScanner } from "vue-tg";
const qrScanner = useQrScanner();
export const useQrScan = async () => {
  const data = await qrScanner.show({ text: "Scan code" });
  if (data) {
    qrScanner.close();
    return data;
  }
};
