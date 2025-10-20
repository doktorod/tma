export default defineEventHandler(async (event) => {
  //console.log("USER DATA", event.context.userdata);
  return [
    {
      name: "TRC-20",
      currency: "TRX",
      commission: 5,
    },
    {
      name: "ERC-20",
      currency: "ETH",
      commission: 6.5,
    },
  ];
});
