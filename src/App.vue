<template>
    <div id="app">
        <m-header></m-header>
        <header-tab></header-tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
import MHeader from "@/components/MHeader/MHeader";
import HeaderTab from "@/components/HeaderTab/HeaderTab";
import Player from "@/components/Player/Player";

export default {
	name: "App",
		components: {
            MHeader,
            HeaderTab,
            Player
	}
};

</script>

<style>

</style>
