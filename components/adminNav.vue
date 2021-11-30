<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-navbar-brand href="#">
                <!-- <b-icon-brightness-fill-high></b-icon-brightness-fill-high> -->
                購入履歴
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" id-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="/" active>戻る</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div>
            <b-modal id="'modal-1">
                <p class="my-4">ログイン</p>
            </b-modal>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{

        }
    },

}
</script>