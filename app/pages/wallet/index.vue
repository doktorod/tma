<script setup>
import TopUpSelectDialog from "~/components/wallet/topup/TopUpMethodSelectDialog.vue";
import CurrencySelectDialog from "~/components/wallet/send/CurrencySelectDialog.vue";
import PayMethodSelectDialog from "~/components/wallet/pay/PayMethodSelectDialog.vue";
import VerifyRequiredDialog from "~/components/kyc/VerifyRequiredDialog.vue";
import SellDialog from "~/components/wallet/sell/SellDialog.vue";

const store = useTgWebAppStore();
const $auth = useAuth();

const showBalance = ref(true);
const totalBalance = ref(1000);
const showTopUpSelect = ref(false);
const sendCurrencyDialog = ref(false);
const payMethosDialogShow = ref(false);
const sellDialogRef = ref(false);

const verifyRequiredDialogShow = ref(false);
const walletCurrencies = ref([
  {
    currency: "RUB",
    net: "",
    balance: 5000,
    balanceRub: 5000,
    price: 1,
  },
  {
    currency: "USDT",
    net: "TRX",
    balance: 100,
    balanceRub: 75,
    price: 75,
  },
]);
definePageMeta({
  layout: "wallet",
});
const showTopUpDialog = () => {
  showTopUpSelect.value = true;
};
const showSendDialog = () => {
  sendCurrencyDialog.value = true;
};
const showSellDialog = () => {
  sellDialogRef.value = true;
};
const showPayDialog = () => {
  payMethosDialogShow.value = true;
};
</script>
<template>
  <div class="wallet__index_block fill-height">
    <div class="pa-4 d-flex align-center">
      <div
        class="d-flex align-center justify-center avatar-block"
        :class="!store.initDataUnsafe?.user?.photo_url ? 'icon' : ''"
      >
        <v-img
          :src="store.initDataUnsafe?.user?.photo_url"
          v-if="store.initDataUnsafe?.user?.photo_url"
          style="border-radius: 50%"
        ></v-img>
        <v-icon size="large" color="success" v-else>mdi-account</v-icon>
      </div>
      <div class="ml-2 tg-username">
        <!-- {{ store.initDataUnsafe?.user?.username }} -->
        {{ $auth.user.username }}
      </div>
    </div>

    <div class="wallet-balance d-flex flex-column align-center justify-center">
      <div class="d-flex">
        <div>{{ $t("totalBalance") }}</div>
        <div class="ml-2 clickable" @click="showBalance = !showBalance">
          <v-icon v-if="showBalance">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </div>
      </div>
      <div class="d-flex align-center total_balance">
        <div v-for="x in totalBalance.toString().length" v-if="!showBalance">
          &nbsp;*
        </div>
        <span v-else>{{ totalBalance }}</span>
        <span class="icon-currency-rub"></span>
      </div>
      <div class="d-flex justify-space-evenly my-8" style="width: 100%">
        <!-- <v-btn variant="flat" class="square-btn-60"
          ><v-icon>mdi-plus</v-icon></v-btn
        > -->
        <div class="text-center">
          <v-btn
            flat
            icon="mdi-plus"
            size="60"
            class="round-btn-60"
            @click="showTopUpDialog"
          ></v-btn>
          <div class="text-body-small-1 mt-2">{{ $t("topUp") }}</div>
        </div>

        <div class="text-center">
          <v-btn
            flat
            icon="mdi-arrow-top-right"
            size="60"
            class="round-btn-60"
            @click="showSendDialog"
          ></v-btn>
          <div class="text-body-small-1 mt-2">{{ $t("send") }}</div>
        </div>

        <div class="text-center">
          <v-btn
            flat
            icon="mdi-bank-outline"
            size="60"
            class="round-btn-60"
            @click="showSellDialog"
          ></v-btn>
          <div class="text-body-small-1 mt-2">{{ $t("sell") }}</div>
        </div>

        <div class="text-center">
          <v-btn
            flat
            icon="mdi-cart-variant"
            size="60"
            class="round-btn-60"
            @click="showPayDialog"
          ></v-btn>
          <div class="text-body-small-1 mt-2">{{ $t("pay") }}</div>
        </div>
      </div>
    </div>
    <div class="wallet__content">
      <div class="wallet__content_announce">
        <div class="d-flex align-center">
          Пользуйся реферальной программой<br />
          и зарабатывай!
        </div>
        <v-icon size="24">mdi-chat</v-icon>
      </div>
      <div
        class="wallet__content_currencies mt-4"
        v-for="(item, index) in walletCurrencies"
        :key="index"
      >
        <div class="d-flex align-center">
          <span
            :class="`icon-currency-${item.currency.toLowerCase()}`"
            style="font-size: 32px"
          >
            <span class="path1"></span><span class="path2"></span
            ><span class="path3"></span><span class="path4"></span
            ><span class="path5"></span><span class="path6"></span>
          </span>
          <div class="ml-2">
            <div>{{ item.currency }}</div>
            <div
              class="d-flex align-center"
              style="opacity: 0.5; font-size: 0.85rem"
            >
              <span>{{ item.price }}</span>
              <span class="icon-currency-rub" style="font-size: 0.9rem"></span>
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex align-center justify-end">
            <span>{{ item.balanceRub }}</span>
            <span class="icon-currency-rub"></span>
          </div>
          <div class="d-flex align-center justify-end">
            <span style="opacity: 0.5; font-size: 0.85rem"
              >{{ item.balance }} {{ item.currency }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <top-up-select-dialog v-model="showTopUpSelect"></top-up-select-dialog>
    <CurrencySelectDialog v-model="sendCurrencyDialog" />
    <PayMethodSelectDialog v-model="payMethosDialogShow" />
    <VerifyRequiredDialog v-model="verifyRequiredDialogShow" />
    <SellDialog v-model="sellDialogRef" />
  </div>
</template>
<style lang="scss">
.wallet__index_block {
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  color: rgba(255, 255, 255, 0.85);
}
.tg-username {
  color: rgba(255, 255, 255, 0.85);
}

.total_balance {
  font-size: 2.4rem;
  font-weight: 600;
  font-family: "Montserrat";
}
.wallet__content {
  height: 100%;
  background-color: rgb(var(--v-theme-background));
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 16px;

  &_announce {
    border-radius: 24px;
    //background-image: linear-gradient(to right, #00c6fb 0%, #005bea 100%);
    height: 100px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  }

  &_currencies {
    background-color: rgb(var(--v-theme-surface));
    padding: 8px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    color: rgb(var(--v-theme-on-surface));
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Montserrat";
  }
}
</style>
