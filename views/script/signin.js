/**
 * Created by BoxCatGarden on 2018/7/4.
 */

let app = new Vue({
    el: '#app',
    data: {
        info: '',
        id: '',
        pwd: '',
        disabled: false
    },
    methods: {
        onSignInButtonClick() {
            this.disabled = true;
            signIn(this.id, this.pwd, x => {
                if (!x) {
                    this.id = '';
                    this.pwd = '';
                    this.info = '账号或密码错误';
                    this.disabled = false;
                }
            });
        }
    }
});