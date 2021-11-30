<template>
    <div>
        <b-navbar toggleable='lg' type="dark" variant="success">
            <b-navbar-brand href="/">
            <b-icon-brightness-fill-high></b-icon-brightness-fill-high>
            ECサイト(簡易版)</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href='/cart'>カート一覧</b-nav-item>

                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>ログイン画面</em>
                        </template>
                        <b-dropdown-item v-b-modal.modal-1>ログイン</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div>
            <b-modal high-footer ref='my-modal' id="modal-1" title="ログイン画面">
                <b-form @submit="onSubmit">
                    <b-form-group
                    id="input-group-1"
                    label='User'
                    label-for='input-1'>
                    <b-form-input
                    id="input-1"
                    v-model="form.user"
                    type="text"
                    required
                    placeholder="userID入力">
                    </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Password" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.pass"
                        type="password"
                        required
                        placeholder="Password入力"></b-form-input>
                    </b-form-group>

                    <b-button type="submit" block variant="primary">Submit</b-button>
                </b-form>
            </b-modal>
        </div>
    </div>
</template>

<script>

export default({
    data() {
        return{
            cart:'',
            form: {
                user:'',
                pass:''
            }
        }
    },
    mounted() {
        if(JSON.parse(localStorage.getItem('products'))){
            this.cart = JSON.parse(localStorage.getItem('products'))
        }else{
            return
        }
    },

    methods: {
        onSubmit(e){
            e.preventDefault();
            if(this.form.user == 'admin' && this.form.pass == '456789'){
                this.$refs['my-modal'].hide()
                this.$router.push('/admin')
                localStorge.setItem('admin',JSON.stringify('true'))

            }else{
                alert('入力間違いがあります')
            }
        }
    },
})
</script>
