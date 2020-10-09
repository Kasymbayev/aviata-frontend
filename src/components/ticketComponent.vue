<template>
    <transition name="fade">
        <div class="ticket-block">
            <div class="main_content">
                <div class="main__content_wrapper">
                    <div class="company_logo">
                        <img :src="logo" alt="">
                        <b>{{companyName}}</b>
                    </div>
                    <div class="flight_details">
                        <div class="departure">
                            <div class="dept_date">
                                {{flightData.dep_date | moment('D MMM, ddd')}}
                            </div>
                            <div class="dept_time">
                                {{flightData.dep_date | moment('HH:mm')}}
                            </div>
                        </div>
                        <div class="flight_path">
                            <div class="path_top">
                                <div class="city">{{flightData.segments[0].origin_code}}</div>
                                <div class="durations">{{getPathTime(flightData.traveltime)}}</div>
                                <div class="city">{{destCode}}</div>
                            </div>
                            <div class="path_mid">
                                <img src="../assets/images/0--0--0.png" alt="">
                            </div>
                            <div class="path_bot">
                                <span :style="[!flightData.stops ? {color: directColor} : '']">{{transferData}}</span>
                            </div>
                        </div>
                        <div class="arrival">
                            <div class="arrival_date">
                                {{flightData.arr_date | moment('D MMM, ddd')}}
                            </div>
                            <div class="arrival_time">
                                {{flightData.arr_date | moment('HH:mm')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="additional-block">
                    <a href="#">Детали перелета</a>
                    <a href="#">Условия тарифа</a>
                    <span class="result-item-content-row-non" v-if="!flight.refundable">
                  <img src="../assets/images/icon-non-refundeble.png">
                  <span class="refundable">невозвратный</span>
                </span>
                    <span v-else>
                    <img src="../assets/images/check.svg">
                    <span class="refundable">возвратный</span>
                </span>
                </div>
            </div>
            <div class="price_content">
                <div class="price_content-price">
                    {{ flightData.price.amount }} ₸
                </div>
                <div class="price_content-button">
                    <button>Выбрать</button>
                </div>
                <div class="price_content-passenger">
                    <span>Цена за всех пассажиров</span>
                </div>
                <div class="price_content-baggage">
                    {{flight.baggage_text}}
                    <button>+ Добавить багаж</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ticketComponent",
        props: ['flight'],
        data(){
            return {
                directColor: '#55BB06',
            }
        },
        methods: {
            getPathTime(time) {
                let hours = Math.floor(time / 3600);
                let minutes = (time % 3600) / 60;
                let result = hours ? hours + ' ч ' : '';
                if (minutes) {
                    result += minutes + ' м';
                }
                return result;
            }
        },
        computed: {
            flightData() {
                return this.flight.itineraries[0][0];
            },
            companyName() {
                return this.flightData.carrier_name
            },
            logo() {
                return 'https://aviata.kz/static/airline-logos/80x80/' + this.flightData.carrier + '.png';
            },
            destCode() {
                return this.flightData.stops ? this.flightData.segments[1].dest_code : this.flightData.segments[0].dest_code;
            },
            transferData() {
                if (!this.flightData.stops) {
                    return 'прямой рейс';
                }

                let city = this.flightData.segments[0].dest;
                let layover = this.flightData.layovers[0];

                return 'через ' + city + ', ' + this.getPathTime(layover);
            }
        },
    }
</script>

<style scoped lang="scss">
    .ticket-block {
        display: flex;
        padding-bottom: 25px;
    }

    .main_content {
        min-height: 168px;
        width: 70%;
        padding: 40px 40px 8px;
        background: #fff;
        border-radius: 4px 0 0 4px;

        .main__content_wrapper {
            display: flex;
            justify-content: space-evenly;

            .company_logo {
                font-family: 'Century Gothic', sans-serif;
                display: flex;
                align-items: center;
                padding-right: 30px;
                font-size: 14px;
                 img {
                     max-width: 20px;
                     margin-right: 15px;
                 }
            }

            .flight_details {
                display: flex;
                align-items: center;
                justify-content: center;
                .dept_date, .arrival_date {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 16px;
                }
                .dept_time, .arrival_time {
                    font-style: normal;
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 33px;
                }
                .flight_path {
                    padding: 0 30px;
                    .path_top {
                        display: flex;
                        justify-content: space-between;
                        .durations {
                            font-size: 12px;
                        }
                        .city {
                            font-size: 10px;
                            color: #B9B9B9;
                        }
                    }
                    .path_mid img{
                        max-width: 168px;
                    }
                    .path_bot {
                        font-size: 12px;
                        color: #FF9900;
                    }
                }
            }
        }

        .additional-block {
            margin-top: 2rem;
            text-align: left;

            span.refundable {
                font-size: 13px;
            }
            img {
                max-width: 16px;
                margin-right: 8px;
            }
            a {
                margin-right: 25px;
                text-decoration: none;
                font-size: 12px;
                color: #7284E4;
                border-bottom: 1px dashed #7284E4;
            }
        }
    }

    .price_content {
        width: 30%;
        border-radius: 0 4px 4px 0;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 12px 20px;
        background: #F5F5F5;

        &-price {
            font-size: 24px;
            line-height: 28px;
            text-align: center;
            color: #202123;
        }

        &-button button{
            width: 100%;
            height: 40px;
            border: none;
            background: #55BB06;
            border-radius: 4px;
            color: #ffff;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            margin-top: 13px;
            outline: none;

            &:hover {
                background: #58cb06;
            }
        }

        &-passenger {
            margin-top: 8px;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #707276;
        }

        &-baggage {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 13px;
            font-size: 14px;
            button {
                background: #EAF0FA;
                border-radius: 2px;
                font-style: normal;
                font-weight: 600;
                font-size: 12px;
                line-height: 16px;
                color: #5763B3;
                padding: 3px 5px;
                border: none;
                outline: none;

                &:hover {
                    background: #e4eaf4;
                }
            }
        }
    }
</style>