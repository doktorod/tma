export default defineEventHandler(async (event) => {
  return [
    {
      currency: "USDT",
      net: "TRX",
      balance: 100,
      balanceRub: 75,
      price: 75,
    },
    {
      currency: "TRX",
      net: "TRX",
      balance: 50,
      balanceRub: 25,
      price: 25,
    },
  ];
});
