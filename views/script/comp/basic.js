/**
 * Created by BoxCatGarden on 2018/7/5.
 */
Vue.component('nav-x', {
    data() {
        return {
            list: [
                {
                    name: ['账单', '/bill.html'],
                },
                {
                    aut: 2,
                    name: ['就餐'],
                    child: [
                        ['就餐情况', '/eat.html'],
                        ['就餐记录', '/eat_log.html']
                    ]
                },
                {
                    aut: 2,
                    name: ['职工'],
                    child: [
                        ['职工列表', '/emp_list.html'],
                        ['添加职工', '/emp_add.html']
                    ]
                }/*,
                {
                    name: ['设置', '/settings.html'],
                }*/
            ],
            loc: window.location.pathname
        }
    },
    props: ['user'],
    template:
`<div>
<p>欢迎，{{user.name}}</p>
<p>帐号：{{user.id}}</p>
<button type="button" onclick="signOut()">退出登录</button>
<ul>
    <li v-for="g in list" v-if="!user.type || !g.aut || g.aut === user.type">
        <a v-if="g.name[1] && g.name[1] !== loc" :href="g.name[1]" :title="g.name[0]"
            target="_self"><b>{{g.name[0]}}</b></a>
        <b v-else>{{g.name[0]}}</b>
        <ul v-if="g.child">
            <li v-for="i in g.child">
                <a v-if="i[1]!==loc" :href="i[1]" :title="i[0]" target="_self">{{i[0]}}</a>
                <span v-else>{{i[0]}}</span>
            </li>
        </ul>
    </li>
</ul>
</div>`
});

Vue.component('page-bar', {
    data() {
        return {
            info1:'',
            info2:'',
            cp:'1',
            ps:'30'
        }
    },
    props:['disabled','total', 'value', 're'],
    watch: {
        re() {
            this.info1 = this.info2 = '';
            this.ps = this.value.ps;
            if (this.value.cp > this.numPage) this.value.cp = this.numPage || 1;
            this.cp = this.value.cp;
        }
    },
    computed:{
        numPage() {return Math.ceil(this.total/this.value.ps);},
        pd() {return this.value.cp == 1;},
        nd() {return this.value.cp >= this.numPage;}
    },
    created() {
        if (this.value.cp) this.cp = this.value.cp;
        if (this.value.ps) this.ps = this.value.ps;
        this.page(1);
    },
    methods: {
        vali(i, e) {
            var el = e.target;
            if (el.validity.valid) {
                if (i === 'ps') this.info1 = '';
                else this.info2 = '';
            }
        },
        page(n) {
            this.value.cp = n+'';
            this.value.ps = this.ps;
            this.$emit('update');
        },
        set() {
            var ps = this.$refs.psin,
                cp = this.$refs.cpin,
                ok = true;
            if (!ps.validity.valid) {
                ok = false;
                this.info1 = '每页的条数应是1~50之间的整数';
            }
            if (!cp.validity.valid || this.cp > this.numPage) {
                ok = false;
                this.info2 = '页码应该是1~'+this.numPage+'之间的整数';
            }
            if (ok) {
                this.page(this.cp*1);
            }
        }
    },
    template:
`<form novalidate>
    <p v-if="info1||info2" class="info">{{info1}}<span v-if="info1&&info2">，</span>{{info2}}</p>
    <label for="ps">
        每页<input pattern="^[1-9]$|^[1-4][0-9]$|^50$" id="ps" v-model="ps" required ref="psin"
                 :disabled="disabled" @input="vali('ps',$event)" @keyup.enter="set">条
    </label>&nbsp;

    <button type="button" @click="page(value.cp-1)" :disabled="disabled||pd">上一页</button>
        
    <label for="cp">
        <input pattern="[1-9][0-9]*" id="cp" v-model="cp" required ref="cpin"
                 :disabled="disabled" @input="vali('cp',$event)" @keyup.enter="set"> / {{numPage}}
    </label>
             
    <button type="button" @click="page(value.cp*1+1)" :disabled="disabled||nd">下一页</button>
</form>`
});

