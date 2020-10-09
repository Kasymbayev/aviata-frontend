<template>
    <div class="options-block">
        <div class="block-title">
            <span>Опции тарифа</span>
            <div class="reset-btn"
                 @click="resetOptions"
            ></div>
        </div>
        <ul>
            <li>
                <label for="direct" class="check-wrap">
                    <input class="styled-checkbox"
                           id="direct"
                           value="direct"
                           type="checkbox"
                           @change="updateOptionsFilter"
                           v-model="checkedItems">
                    <span class="checkbox checked"></span>
                    <span class="checkbox unchecked"></span>
                    <span class="checkbox checked-hover"></span>
                    <span class="checkbox unchecked-hover"></span>
                    Только прямые</label>
            </li>
            <li>
                <label for="baggage" class="check-wrap">
                    <input class="styled-checkbox"
                           id="baggage"
                           value="baggage"
                           type="checkbox"
                           @change="updateOptionsFilter"
                           v-model="checkedItems">
                    <span class="checkbox checked"></span>
                    <span class="checkbox unchecked"></span>
                    <span class="checkbox checked-hover"></span>
                    <span class="checkbox unchecked-hover"></span>
                    Только с багажом</label>
            </li>
            <li>
                <label for="returnable" class="check-wrap">
                    <input class="styled-checkbox"
                           id="returnable"
                           type="checkbox"
                           value="refundable"
                           @change="updateOptionsFilter"
                           v-model="checkedItems">
                    <span class="checkbox checked"></span>
                    <span class="checkbox unchecked"></span>
                    <span class="checkbox checked-hover"></span>
                    <span class="checkbox unchecked-hover"></span>
                    Только возвратные
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "optionsFilter",
        props: ['filter'],
        data() {
            return {
                checkedItems: [],
            }
        },
        methods: {
            updateOptionsFilter() {
                if (this.checkedItems.length) {
                    let index = this.checkedItems.indexOf('full');
                    if (index !== -1) this.checkedItems.splice(index, 1);
                } else {
                    this.checkedItems = ['full'];
                }
                // console.log(this.checkedOptions);
                this.$emit('filter-update', this.checkedItems);
            },
            resetOptions() {
                this.$emit('filter-update', []);
            }
        },
        watch: {
            filter: function(newVal) {
                this.checkedItems = newVal;
            }
        },
    }
</script>

<style scoped lang="scss">
    .options-block {
        margin-bottom: 12px;
        height: 156px;
        border-radius: 4px;
        background: #F5F5F5;
    }
</style>