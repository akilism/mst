<template>
	<div class="state-info" v-if="activeState">
		<h2>{{activeState.NAME10}}</h2>
		<div class="info-lists">
			<ul class="info-list">
				<li>Mass Shootings: {{activeState.shootings}}</li>
				<li>{{activeState.killed}} Dead</li>
				<li>{{activeState.injured}} Injured</li>
			</ul>
			<ul class="info-list">
				<li>{{activeState.ruralPct}}% in Rural Counties</li>
				<li>{{activeState.urbanPct}}% in Urban Counties</li>
				<li class="donations" @click.prevent="donationDetail(activeState)">{{activeState.gunLobby}} out of 52 in Donations from Gun Interests</li>
				<li>{{activeState.gunControl}} out of 52 in Gun Control Legislation</li>
			</ul>
		</div>
		<ul class="shooting-incidents">
			<li class="incident" v-for="shooting in stateShootings" @click.prevent="clickHandle(shooting)">
				<h3 class="incident-location">{{ shooting.city }}, {{ shooting.state }}</h3>
				<div class="incident-date">{{ shooting.date | DateFilter }}</div>
				<ul>
					<li>{{ shooting.killed }} Dead</li>
					<li>{{ shooting.injured }} Injured</li>
				</ul>
			</li>
		</ul>
	</div>
  <info-view></info-view>
</template>


<script>
	import DateFilter from './filters/DateFilter';
  import InfoView from './InfoView.vue';
	import { setShooting, setInfo } from "./state/actions";

	export default {
    components: { InfoView },
		computed: {
			stateShootings: function () {
				if(!this.activeState) { return []; }

				return this.shootings.filter((shooting) => {
					return (shooting.state === this.activeState.NAME10);
				});
			}
		},
		filters: { DateFilter },
		methods: {
			clickHandle: function(shooting) {
				this.setShooting(shooting);
				this.$dispatch("onShootingClick", shooting, 7);
			},
			donationDetail: function(activeState) {
        const donations = activeState.donations;
				console.log(donations.federal);
				console.log(donations.state);
        this.setInfo({ donations, title: `Campaign Donations to ${activeState.NAME10} from Gun Interests`, type: "BAR", key: "donations" });
			}
		},
		props: {
			"shootings": {
				required: true,
				type: Array
			}
		},
		vuex: {
			actions: { setShooting, setInfo },
			getters: {
				activeState: ({ activeState }) => {
					return activeState;
				}
			}
		}
	}
</script>


<style>
	.state-info {
		padding: 10px 0 20px 20px;
		background-color: #E0E0E0;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35);
	}

  .state-info h2 {
    font-size: 42px;
    margin: 10px 0;
  }

	.state-info ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	.state-info ul.shooting-incidents {
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		margin: 0 0 0 -20px;
	}

	.shooting-incidents .incident {
		margin: 5px;
    background-color: #bebebe;
    padding: 20px;
    width: 30%;
    cursor: pointer;
    transition: background-color 200ms;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35);
	}

	.shooting-incidents .incident:nth-child(odd) {
		background-color: #cececd;
	}

	.shooting-incidents .incident:hover {
		background-color: #6f6f6e;
	}

	.incident-location {
		margin: 0 0 2px 0;
	}

	.incident-date {
		font-size: 13px;
		margin: 0 0 10px 0;
	}

	.info-lists {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		margin: 0 0 30px 0;
	}

	.info-list {
		width: 40%;
	}

	.info-list .donations {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
