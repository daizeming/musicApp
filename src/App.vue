<template>
    <div id="app">
        <m-header></m-header>
        <header-tab></header-tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import MHeader from "@/components/MHeader/MHeader";
import HeaderTab from "@/components/HeaderTab/HeaderTab";

export default {
	name: "App",
		components: {
            MHeader,
            HeaderTab
	}
};

</script>

<style>

</style>
