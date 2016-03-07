<template>
	<div class="state-info" v-if="activeState.NAME10">
		<h2>{{activeState.NAME10}}</h2>
		<div class="info-lists">
			<ul class="info-list">
				<li>Mass Shootings: {{activeState.shootings}}</li>
				<li>Killed: {{activeState.killed}}</li>
				<li>Injured: {{activeState.injured}}</li>
			</ul>
			<ul class="info-list">
				<li>{{activeState.ruralPct}}% in Rural Counties</li>
				<li>{{activeState.urbanPct}}% in Urban Counties</li>
				<li>{{activeState.gunLobby}} out of 52 in Gun Lobby Donations</li>
				<li>{{activeState.gunControl}} out of 52 in Gun Control Legislation</li>
			</ul>
		</div>
		<ul class="shooting-incidents">
			<li class="incident" v-for="shooting in stateShootings" @click.prevent="clickHandle(shooting)">
				<h3 class="incident-location">{{ shooting.city }}, {{ shooting.state }}</h3>
				<div class="incident-date">{{ shooting.date | DateFilter }}</div>
				<ul>
					<li>Killed: {{ shooting.killed }}</li>
					<li>Injured: {{ shooting.injured }} </li>
				</ul>
			</li>
		</ul>
	</div>

</template>


<script>
	import DateFilter from './filters/DateFilter';
	import { setShooting } from "./state/actions";

	export default {
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
				this.$dispatch("onShootingClick", shooting);
			}
		},
		props: {
			"shootings": {
				required: true,
				type: Array
			}
		},
		vuex: {
			actions: { setShooting },
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
		margin: 0 0 0 -10px;
	}

	.shooting-incidents .incident {
		margin: 5px;
    background-color: #bebebe;
    padding: 20px;
    width: 25%;
    cursor: pointer;
    transition: background-color 200ms;
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
</style>
