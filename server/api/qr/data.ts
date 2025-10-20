export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  console.log(body);
  //const recieve = body.scanResult;
  const recieve =
    "https://qr.nspk.ru/AD100063TR1PHNHV99NQHKK7T6IPHJJ5?type=02&amp;bank=100000000008&amp;sum=2242200&amp;cur=RUB&amp;crc=B0DB";
  const checkQrCode = {
    status: 200,
    response: {
      qr: {
        qr_url:
          "https://qr.nspk.ru/AD100063TR1PHNHV99NQHKK7T6IPHJJ5?type=02&amp;bank=100000000008&amp;sum=2242200&amp;cur=RUB&amp;crc=B0DB",
        qr_id: "AD100063TR1PHNHV99NQHKK7T6IPHJJ5",
      },
      status: "NEW",
      message: null,
      amount: 22422,
      company: "БЕГЕТ",
    },
  };
  return {
    status: 200,
    response: {
      qr_id: checkQrCode.response.qr.qr_id,
      amount: checkQrCode.response.amount,
      currency: "RUB",
      company: checkQrCode.response.company,
    },
  };
});
