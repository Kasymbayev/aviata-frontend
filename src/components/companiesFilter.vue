<template>
    <div class="companies-block">
        <div class="block-title">
            <span>Авиакомпаний</span>
        </div>
        <div class="airlineLists">
            <ul>
                <li>
                    <label for="full" class="check-wrap">
                        <input class="styled-checkbox"
                               id="full"
                               v-model="checkedItems"
                               value="full"
                               @change="updateCompaniesFilter"
                               type="checkbox">
                        <span class="checkbox checked"></span>
                        <span class="checkbox unchecked"></span>
                        <span class="checkbox checked-hover"></span>
                        <span class="checkbox unchecked-hover"></span>
                        Все</label>
                </li>
                <li v-for="(airline, key) in airlines" :key="key">
                    <label :for="key" class="check-wrap">
                        <input class="styled-checkbox"
                               v-model="checkedItems"
                               :id="key"
                               :value="key"
                               @change="updateCompaniesFilter"
                               type="checkbox">
                        <span class="checkbox checked"></span>
                        <span class="checkbox unchecked"></span>
                        <span class="checkbox checked-hover"></span>
                        <span class="checkbox unchecked-hover"></span>
                        {{airline}}</label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "companiesFilter",
        props: ['airlines','filter'],
        data() {
            return {
                checkedItems: this.filter
            }
        },
        methods: {
            updateCompaniesFilter() {
                if (this.checkedItems[this.checkedItems.length - 1] === 'full' || !this.checkedItems.length) {
                    this.checkedItems = ['full']
                } else {
                    let index = this.checkedItems.indexOf('full');
                    if (index !== -1) this.checkedItems.splice(index, 1);
                }
                // console.log(this.checkedItems);
                this.$emit('filter-update', this.checkedItems);
            }
        },
        watch: {
            filter: function (newVal) {
                this.checkedItems = newVal
            }
        },
    }
</script>

<style scoped lang="scss">
    .companies-block {
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        border-radius: 4px;
    }

    .airlineLists {
        width: 96%;
        height: 308px;
        overflow-y: auto;
    }
</style>