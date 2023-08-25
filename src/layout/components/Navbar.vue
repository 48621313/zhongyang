<template>
  <div class="navbar">
    <!-- 左侧导航栏收齐操作 -->
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <div class="left-search">
      <search id="header-search" class="right-menu-item" />
    </div>
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/> -->
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <span class="img-ps">
          <el-image class="header-img" :src="require('@/assets/images/remind.png')" fit="fill">
          </el-image>
          <span class="mes-num">12</span>
        </span>
        <el-image class="header-img" :src="require('@/assets/images/setting.png')" fit="fill"></el-image>
        <!-- <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="name">测试用户</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => { });
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  border-radius: 12px 12px 12px 12px;

  .left-search {
    float: left;
    margin-left: 30px;
    line-height: 60px;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    // &:hover {
    //   background: rgba(0, 0, 0, .025)
    // }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 60px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    line-height: 60px;
    .img-ps{
      display: flex;
      align-items: center;
      line-height: 60px;
      position: relative;
      .mes-num {
        right: -7px;
        top: -7px;
        line-height: 1;
        position: absolute;
        display: inline-block;
        font-size: 12px;
        min-width: 20px;
        padding: 4px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        background-color: #ED4B42;
        z-index: 11;
      }
    }
    .header-img {
      width: 22px;
      height: 22px;
      margin-left: 28px;
      cursor: pointer;
      z-index: 1;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        // transition: background .3s;

        // &:hover {
        //   background: rgba(0, 0, 0, .025)
        // }
      }
    }

    .avatar-container {
      // margin-right: 30px;

      .avatar-wrapper {
        width: 42px;
        height: 42px;
        border: 1px solid #E8ECEE;
        border-radius: 50%;
        margin: 0 8px 0 20px;
        position: relative;
        box-sizing: border-box;
        cursor: pointer;

        .user-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .name {
      margin-right: 30px;
      color: #545965;
      font-size: 14px;
    }
  }
}</style>
