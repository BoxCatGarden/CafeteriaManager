/**
 * Created by BoxCatGarden on 2018/7/8.
 */
let app = new Vue({
    el: '#app',
    data: {
        user:{},
        eat:[],
        disabled: false,

        info:'',
        valiid: true,
        id:'',
        valiy: true,
        y:'',
        m:'',
        tp:'1',

        page: {
            cp:'',
            ps:''
        },
        total:0
    },
    created() {
        getUser(x => this.user = x);
        if (sessionStorage.getItem('param_eat_year')) {
            this.y = sessionStorage.getItem('param_eat_year');
            sessionStorage.removeItem('param_eat_year');
        }
        if (sessionStorage.getItem('param_eat_month')) {
            this.m = sessionStorage.getItem('param_eat_month');
            sessionStorage.removeItem('param_eat_month');
        }
    },
    methods: {
        update() {
            this.disabled = true;
            eatingEmp(this.id, this.m, this.y, this.tp, 0, 0, x => {
                if (x) {
                    this.total = x[0].num;
                    eatingEmp(this.id, this.m, this.y, this.tp,
                        (this.page.cp - 1) * this.page.ps, this.page.ps, x => {
                            if (x) {
                                this.info = '';
                                this.eat = x;
                            } else this.info = '查询失败';
                            this.disabled = false;
                        });
                } else this.info = '查询失败';
            });
        },
        vali(i, e) {
            if (e.target.validity.valid) {
                switch (i) {
                    case 'id':
                        this.valiid = true;
                        break;
                    case 'y':
                        this.valiy = true;
                        break;
                    default:break;
                }
            }
        },
        query() {
            var ok = true;
            if (!this.$refs.inid.validity.valid) {
                ok = false;
                this.valiid = false;
            }
            if (!this.$refs.iny.validity.valid) {
                ok = false;
                this.valiy = false;
            }
            if (ok) {
                this.update();
            }
        },

        details(id) {
            sessionStorage.setItem('param_eat_log_id', id);
            sessionStorage.setItem('param_eat_log_year', this.y);
            sessionStorage.setItem('param_eat_log_month', this.m);
            window.location = '/eat_log.html';
        }
    }
});