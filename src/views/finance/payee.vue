<template>
	<HeaderPageBack />
	<PayeeList :data-source="[]" />
</template>

<script lang="ts" setup>
import HeaderPageBack from "@/components/Header/Back.vue";
import PayeeList from "@/views/finance/components/payeeList.vue";
</script>
