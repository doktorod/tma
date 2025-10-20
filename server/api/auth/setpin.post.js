export default defineEventHandler(async (event) => {
  let bodyData = await readBody(event);
  console.log(bodyData);
  return {
    status: 200,
  };
});
