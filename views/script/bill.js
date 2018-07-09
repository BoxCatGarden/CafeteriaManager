/**
 * Created by BoxCatGarden on 2018/7/4.
 */
let app = new Vue({
    el: '#app',
    data: {
        info: '',
        year: '',
        month: '',
        type: '2',
        disabled: false,

        user: {},
        bills: [],

        checkdis: false,
        modaldis: true,
        modalhid: true,
        modalSuc: false,
        modalinfo: '',
        by: '',
        bm: '',
        pwd: '',

        //page
        page: {
            cp:'',
            ps:''
        },
        total:0
    },
    created() {
        getUser(x => this.user = x);
    },
    methods: {
        updateBills() {
            this.disabled = true;
            geneBill(this.month, this.year, this.type, 0, 0, x => {
                if (x) {
                    this.total = x[0].num;
                    geneBill(this.month, this.year, this.type,
                        (this.page.cp - 1) * this.page.ps, this.page.ps, x => {
                            if (x) {
                                this.info = '';
                                for (var i of x) {
                                    i.check_time = new Date(i.check_time);
                                }
                                this.bills = x;
                            } else this.info = '查询失败';
                            this.disabled = false;
                            this.checkdis = false;
                        });
                } else this.info = '查询失败';
            });
        },

        year_vali() {
            if (this.$refs.year_input.validity.valid) {
                this.info = '';
            }
        },
        query() {
            if (!this.$refs.year_input.validity.valid) {
                this.info = '年份应该是一个1000到9999的四位整数'
            } else {
                this.updateBills();
            }
        },

        details(bill) {
            sessionStorage.setItem('param_eat_year', ''+bill.year);
            sessionStorage.setItem('param_eat_month', ''+bill.month);
            window.location = '/eat.html';
        },

        check(bill) {
            this.checkdis = true;
            this.modalSuc = false;
            this.by = bill.year;
            this.bm = bill.month;
            this.modalinfo = '';
            this.pwd = '';
            this.modaldis = false;
            this.modalhid = false;
        },
        confirmModal() {
            this.modaldis = true;
            checkBill(this.bm, this.by, this.user.id, this.pwd, x => {
                if (x === 1) {
                    this.pwd = '';
                    this.modalSuc = true;
                    this.modaldis = false;
                } else {
                    this.modalinfo = x === 2 ? '密码错误' : '确认失败';
                    this.modaldis = false;
                }
            });
        },
        closeModal() {
            this.modaldis = true;
            this.modalhid = true;
            this.pwd = '';
            this.checkdis = false;
        },
        sucModal() {
            this.updateBills();
            this.modaldis = true;
            this.modalhid = true;
        },

        toMonth(bill) {
            var date = new Date();
            return bill.year === date.getFullYear() && bill.month === date.getMonth() + 1;
        }
    }
});