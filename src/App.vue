<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3">
          <div class="row">
            <div class="col-lg-12 col-6">
              <options-filter @filter-update="updateOptionsFilter" :filter="filter.options"></options-filter>
            </div>
            <div class="col-lg-12 col-6">
              <companies-filter :airlines="airlineList" :filter="filter.companies" @filter-update="updateCompaniesFilter"></companies-filter>
            </div>
          </div>
          <div class="reset-filters">
            <span @click="resetAllFilters">Сбросить все фильтры</span>
          </div>
        </div>
        <div class="col-12 col-lg-9 content_wrapper">
          <div class="content" v-if="flightsFilter.length">
              <div class="loader_wrapper" v-if="isDataReady">
                <div class="loader">
                  <div class="plane-loader">
                    <div class="cloud cloud1"></div>
                    <div class="cloud cloud4"></div>
                    <div class="cloud cloud3"></div>
                    <div class="plane"></div>
                    <div class="cloud cloud2"></div>
                    <div class="steam steam1">
                      <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                    </div>
                    <div class="steam steam2">
                      <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                    </div>
                    <div class="steam steam3">
                      <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                    </div>
                    <div class="steam steam4">
                      <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                    </div>
                  </div>
                  <h3>В поисках билетов, пожалуйста подождите</h3>
                </div>
              </div>
            <transition name="fade">
              <div class="ticket_wrapper" v-if="!isDataReady">
                <ticket-component v-for="flight in flightsFilter" :flight="flight" :key="flight.id"></ticket-component>
              </div>
            </transition>
          </div>
          <div class="not-found" v-else>
            <div class="loader">
              <div class="plane-loader">
                <div class="cloud cloud1"></div>
                <div class="cloud cloud4"></div>
                <div class="cloud cloud3"></div>
                <div class="plane"></div>
                <div class="cloud cloud2"></div>
                <div class="steam steam1">
                  <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                </div>
                <div class="steam steam2">
                  <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                </div>
                <div class="steam steam3">
                  <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                </div>
                <div class="steam steam4">
                  <div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div><div class="c5"></div><div class="c6"></div><div class="c7"></div><div class="c8"></div><div class="c9"></div><div class="c10"></div>
                </div>
              </div>
              <h3>Билетов нет, попробуйте еще раз чуть позднее</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DATA from './assets/data/results.json';
import companiesFilter from "./components/companiesFilter";
import optionsFilter from "./components/optionsFilter";
import ticketComponent from "./components/ticketComponent";

export default {
  name: 'App',
  airlines: DATA.airlines,
  flights:  DATA.flights,
  components: {
    companiesFilter,
    optionsFilter,
    ticketComponent
  },
  data() {
    return {
      isDataReady: true,
      filter: {
        options: ['full'],
        companies: ['full']
      }
    }
  },
  mounted() {
    setTimeout(() => (this.isDataReady = false), 2000);
  },
  computed: {
    airlineList () {
      return this.$options.airlines;
    },
    flightsFilter () {
      let result = [];
      let flights = this.$options.flights;
      let baggage = '';
      flights.forEach((c) => {
        c.direct = !c.itineraries[0][0].stops;
        baggage = c.services[Object.keys(c.services)[0]];
        c.baggage = baggage.code.charAt(0) !== '0';
        c.baggage_text = c.baggage ? baggage.value : 'Нет багажа';

        if (this.isSetFilterCompanies(c) && this.isSetFilterOptions(c)) {
          result.push(c)
        }
      });

      return result
    },
  },
  methods: {
    resetAllFilters () {
      this.isDataReady = true;
      this.filter.companies = ['full'];
      this.filter.options = ['full'];
      setTimeout(() => {
        this.isDataReady = false;
      }, 2000)
    },
    isSetFilterCompanies (flight) {
      if (this.filter.companies.includes('full')) {
        return true;
      }
      let carrier = flight.itineraries[0][0].carrier;
      return this.filter.companies.includes(carrier);
    },
    isSetFilterOptions (flight) {
      if (this.filter.options.includes('full')) {
        return true;
      }
      for (let i =0; i < this.filter.options.length; i++) {
        if (!flight[this.filter.options[i]]) {
          return false;
        }
      }
      return true
    },
    updateOptionsFilter (e) {
      this.isDataReady = true;
      this.filter.options = e;
      setTimeout(() => {
        this.isDataReady = false;
      }, 2000)
    },
    updateCompaniesFilter (e) {
      this.isDataReady = true;
      this.filter.companies = e;
      setTimeout(() => {
        this.isDataReady = false;
      }, 2000)
    },
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
@import "assets/styles/style";
@import "assets/styles/loader.css";
@import "assets/styles/responsive.css";

html, body {
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;
  box-sizing: content-box;
}

body {
  background: #D7D7D7  !important;
}
</style>
