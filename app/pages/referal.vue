<script setup>
const referalLink = ref(
  "https://www.figma.com/board/6XTStpjNWLdxUyxQ1AOyWL/Wallet-UserFlow?node-id=1005-193&p=f"
);
const referalCode = ref("MATRESHKA");
const copyLinkAlert = ref(false);
const copyCodeAlert = ref(false);
const referals = ref(0);
const copyCode = () => {
  if (import.meta.client) {
    if (navigator.clipboard.writeText(referalCode.value)) {
      copyCodeAlert.value = true;
      setTimeout(() => {
        copyCodeAlert.value = false;
      }, 2000);
    }
  }
};
const copyLink = () => {
  if (import.meta.client) {
    if (navigator.clipboard.writeText(referalLink.value)) {
      copyLinkAlert.value = true;
      setTimeout(() => {
        copyLinkAlert.value = false;
      }, 2000);
    }
  }
};
const shareLink = () => {
  window.open(`https://t.me/share/text?text=${referalLink.value}`, "_blank");
};
</script>
<template>
  <div class="referal__index_block fill-height">
    <div>
      <BackButton />
    </div>
    <div class="d-flex flex-column mx-4">
      <div class="text-center mt-16 text-white">
        <h2 v-html="$t('referal.earnUpTo')"></h2>
        <div
          class="mt-4"
          v-html="$t('referal.inviteAndGet', [$t('appName')])"
        ></div>
      </div>
      <div class="mt-4 main-bg-block">
        <div class="main-block">
          <div style="position: relative; width: 100%">
            <v-alert
              dense
              type="success"
              v-model="copyCodeAlert"
              class="link-copy-alert"
              closable
              density="compact"
              position="absolute"
              >{{ $t("copied") }}</v-alert
            >
            <div class="small-desc">{{ $t("referal.code") }}</div>
            <div>{{ referalCode }}</div>
          </div>
          <div>
            <v-btn
              variant="plain"
              icon="mdi-content-copy"
              density="compact"
              @click="copyCode"
            ></v-btn>
          </div>
        </div>
        <div class="main-block mt-2">
          <div style="position: relative; width: 100%">
            <v-alert
              dense
              type="success"
              v-model="copyLinkAlert"
              class="link-copy-alert"
              closable
              density="compact"
              position="absolute"
              >{{ $t("copied") }}</v-alert
            >
            <div class="small-desc">{{ $t("referal.link") }}</div>
            <div class="text-truncate" style="max-width: 65vw">
              {{ referalLink }}
            </div>
          </div>
          <div>
            <v-btn
              variant="plain"
              icon="mdi-content-copy"
              density="compact"
              @click="copyLink"
            ></v-btn>
          </div>
        </div>
        <div class="mt-2">
          <TMAMainButton
            color="primary"
            :title="$t('referal.shareLink')"
            @onClick="shareLink"
            size="large"
            append-icon="mdi-share"
          />
        </div>
      </div>
    </div>
    <div class="referal__index_block-data mt-4">
      <div class="d-flex">
        <div class="avatar-block">
          <v-icon size="large" color="success">mdi-account</v-icon>
        </div>
        <div class="ml-4">
          <div class="small-desc">{{ $t("referal.level") }}</div>
          <div>{{ $t("referal.newbie") }}</div>
        </div>
      </div>
      <div class="main-block mt-4">
        <div>
          <div class="small-desc">{{ $t("referal.monthLimit") }}</div>
          <div>{{ $t("referal.unLimit") }}</div>
        </div>
      </div>
      <div
        class="referal__index_block-invite mt-4"
        v-html="$t('referal.inviteMore', [$t('appName')])"
      ></div>
      <div class="mt-4">{{ $t("referal.referals") }}: {{ referals }}</div>
      <div class="main-block mt-4">
        <div v-if="referals === 0" class="mx-auto text-disabled">
          {{ $t("referal.noReferals") }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.referal__index_block {
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  //background-image: linear-gradient(to top, #005bea 0%, #013382 100%);
  //background-image: linear-gradient(to bottom, #29323c 0%, #485563 100%);

  //color: rgba(255, 255, 255, 1);

  &-data {
    height: 100%;
    background-color: rgb(var(--v-theme-background));
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 16px;
  }

  &-invite {
    border-radius: 8px;
    padding: 24px;
    background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgba(255, 255, 255, 1);
  }
}

.link-copy-alert {
  z-index: 1111;
  top: -30px;
  right: 0;
  min-width: 200px;
  & > .v-alert__prepend {
    align-self: center !important;
  }
}
</style>
