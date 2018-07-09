/**
 * Created by BoxCatGarden on 2018/7/8.
 */
let app = new Vue({
    el: '#app',
    data: {
        user: {},
        disabled: false,

        info: '',
        valiid: true,
        id: '',
        valin: true,
        n: '',
        s: '0',
        b: (new Date().getFullYear() - 30) + '-01-01',
        valiph: true,
        ph: ''
    },
    created() {
        getUser(x => this.user = x);
    },
    methods: {
        update() {
            this.disabled = true;
            hasEmp(this.id, x => {
                if (!x) {
                    addEmp(this.id, this.n, this.s, this.b, this.ph, x => {
                        if (x === 1) {
                            this.info = '';
                            this.reset();
                            alert('添加成功');
                        } else this.info = x === 2 ? '工号已存在' : '添加失败';
                        this.disabled = false;
                    });
                } else {
                    this.info = '工号已存在';
                    this.disabled = false;
                }
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
                    case 'ph':
                        this.valiph = true;
                        break;
                    default:
                        break;
                }
            }
            if (this.info) this.info = '';
        },
        add() {
            var ok = true;
            if (!this.$refs.inid.validity.valid) {
                ok = false;
                this.valiid = false;
            }
            if (!this.$refs.inn.validity.valid) {
                ok = false;
                this.valin = false;
            }
            if (!this.$refs.inph.validity.valid) {
                ok = false;
                this.valiph = false;
            }
            if (ok) {
                this.update();
            }
        },
        reset() {
            this.info = '';
            this.valiid = true;
            this.id = '';
            this.valin = true;
            this.n = '';
            this.s = '0';
            this.b = (new Date().getFullYear() - 30) + '-01-01';
            this.valiph = true;
            this.ph = '';
        }
    }
});