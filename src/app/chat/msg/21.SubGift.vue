<template>
	<span class="seventv-sub-message-container seventv-highlight">
		<div class="sub-part">
			<div class="gift-icon">
				<TwGift />
			</div>
			<div class="sub-message-text">
				<span class="sub-name bold">
					{{ msgData.user.displayName }}
				</span>
				Gifted a
				<span class="bold"> Tier {{ msgData.methods?.plan.charAt(0) }} </span>
				Sub to
				<span class="bold"> {{ msgData.recipientDisplayName }} </span>
				<template v-if="msgData.sourceData"> in {{ msgData.sourceData.displayName }}'s channel! </template>
			</div>
		</div>
	</span>
</template>

<script setup lang="ts">
import TwGift from "@/assets/svg/twitch/TwGift.vue";

defineProps<{
	msgData: Twitch.SubMessage;
}>();
</script>

<style scoped lang="scss">
.seventv-sub-message-container {
	display: block;
	padding: 0.5rem 2rem;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	overflow-wrap: anywhere;
	background-color: hsla(0deg, 0%, 50%, 10%);
}

.seventv-highlight {
	border-left: 0.4rem solid var(--seventv-channel-accent);
	padding-left: 1.6rem !important;
}

.sub-part {
	display: flex;

	.gift-icon {
		display: flex;
		flex-shrink: 0;
		padding-right: 1.6rem;
		margin: auto 0;
	}

	.sub-message-text {
		margin-left: 0.25rem;

		.bold {
			font-weight: 700;
		}

		.sub-name {
			display: block;
			color: var(--color-text-link);
		}
	}
}
</style>
