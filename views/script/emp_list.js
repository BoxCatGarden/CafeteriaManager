/**
 * Created by BoxCatGarden on 2018/7/8.
 */

let formatDate = (s) => {
    var date = new Date(s),
        month = date.getMonth() + 1,
        day = date.getDate();
    return date.getFullYear() + (month < 10 ? '-0' : '-') + month + (day < 10 ? '-0' : '-') + day;
};

let app = new Vue({
    el: '#app',
    data: {
        user:{},
        disabled: false,
        ls: 0,

        //list
        emps:[],

        info:'',
        valiid: true,
        id:'',
        valin: true,
        n:'',

        page: {
            cp:'',
            ps:''
        },
        total:0,

        //detail
        emp: {},

        //edit
        einfo:'',
        evalin: true,
        en:'',
        s:'',
        b:'',
        evaliph: true,
        ph:''
    },
    created() {
        getUser(x => this.user = x);
    },
    methods: {
        update() {
            this.disabled = true;
            queryEmp(this.id, this.n, 0, 0, x => {
                if (x) {
                    this.total = x[0].num;
                    queryEmp(this.id, this.n,
                        (this.page.cp - 1) * this.page.ps, this.page.ps, x => {
                            if (x) {
                                this.info = '';
                                this.emps = x;
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
                    case 'n':
                        this.valin = true;
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
            if (!this.$refs.inn.validity.valid) {
                ok = false;
                this.valin = false;
            }
            if (ok) {
                this.update();
            }
        },

        details(e) {
            e.birthday = formatDate(e.birthday);
            this.emp = e;
            this.ls = 1;
        },
        age(e) {
            var date = new Date(),
                birth = new Date(e.birthday),
                age = date.getFullYear() - birth.getFullYear();
            return date.getMonth() < birth.getMonth() ? age - 1 : age;
        },
        quitD() {
            this.update();
            this.ls = 0;
        },
        del() {
            if (confirm(`确认删除职工（${this.emp.emp_id},${this.emp.name}）吗？`)) {
                this.disabled = true;
                deleteEmp(this.emp.emp_id, x => {
                    if (x) {
                        alert('删除成功');
                        this.quitD();
                    } else {
                        alert('删除失败');
                        this.disabled = false;
                    }
                });
            }
        },
        edit() {
            this.reset();
            this.ls = 2;
        },

        eupdate() {
            this.disabled = true;
            modifyEmp(this.emp.emp_id, this.en, this.s, this.b, this.ph, x => {
                if (x) {
                    this.inreset();
                    this.quitM();
                    alert('修改成功');
                } else this.einfo = '修改失败';
                this.disabled = false;
            });
        },
        evali(i, e) {
            if (e.target.validity.valid) {
                switch (i) {
                    case 'n':
                        this.evalin = true;
                        break;
                    case 'ph':
                        this.evaliph = true;
                        break;
                    default:
                        break;
                }
            }
            if (this.einfo) this.einfo = '';
        },
        modify() {
            if (!confirm(`确认修改职工（${this.emp.emp_id},${this.emp.name}）的信息吗？`)) return;
            var ok = true;
            if (!this.$refs.inen.validity.valid) {
                ok = false;
                this.evalin = false;
            }
            if (!this.$refs.inph.validity.valid) {
                ok = false;
                this.evaliph = false;
            }
            if (ok) {
                this.eupdate();
            }
        },
        reset() {
            this.einfo = '';
            this.evalin = true;
            this.en = this.emp.name;
            this.s = this.emp.sex;
            this.b = this.emp.birthday;
            this.evaliph = true;
            this.ph = this.emp.phonenum;
        },
        inreset() {
            this.emp.name = this.en;
            this.emp.sex = this.s*1;
            this.emp.birthday = this.b;
            this.emp.phonenum = this.ph;
        },
        quitM() {
            this.ls = 1;
        }
    }
});