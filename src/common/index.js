import Tabs from './tabs/Tabs.vue'
import TabItem from './tabs/TabItem.vue'
import Header from './header/Header'
import Content from './content/Content'
import Scroll from './scroll/Scroll'

// import Vue from 'vue'


export default {
    install(Vue){
        Vue.component(Tabs.name,Tabs);
        Vue.component(TabItem.name,TabItem);
        Vue.component(Header.name,Header);
        Vue.component(Content.name,Content);
        Vue.component(Scroll.name,Scroll);
    }
}