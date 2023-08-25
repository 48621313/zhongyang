<template>
  <div class="page-wrapper">
    <div class="page-radius">
      <div class="page-common">
        <div class="title-common">
          <div class="tit-lf tit-before"><span class="tit">编辑脚本</span></div>
          <div class="tit-rt">
            <el-image @click="isBeginner = !isBeginner" v-if="isBeginner" class="cm-i"
              :src="require('@/assets/images/checked.png')"></el-image>
            <el-image @click="isBeginner = !isBeginner" v-else class="cm-i"
              :src="require('@/assets/images/unchecked.png')"></el-image>
            <span class="is-new">新手模式(自动加入注释)</span>
          </div>
        </div>
        <div class="container">
          <div class="left">
            <el-tree icon-class="el-icon-arrow-right" :data="data" :props="defaultProps" @node-click="handleNodeClick">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <el-tooltip :disabled="node.level < 2" class="item" effect="dark" :content="data.comments"
                  placement="right">
                  <span class="name" @click="do1(node, data)"><i class="circle"></i>{{ node.label }}</span>
                </el-tooltip>
              </span>
            </el-tree>
          </div>
          <div class="right">
            <div class="right-box">
              <div class="top">
                <el-input type="textarea" resize="none" placeholder="请输入内容" v-model="textarea">
                </el-input>
              </div>
              <div class="bottom">
                <div class="cm-btn info">取消</div>
                <div class="cm-btn">保存</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { listConfig, getConfig, delConfig, addConfig, updateConfig, refreshCache } from "@/api/system/config";
export default {
  name: '',
  data() {
    return {
      textarea: '',
      isBeginner: false,
      data: [
        {
          name: '常用命令', text: '常用命令', comments: '常用命令',
          children: [
            {
              name: '占位', text: '占位', comments: '占位 用于条件判断的占位, 不会执行',
            },
            {
              name: '启动', text: '启动 com.tencent.mm?占位:占位', comments: '启动 包名?启动成功的指令:启动失败的指令\n也可以用 $标签1 引用标签的值'
            }, {
              name: '点击',
              text: '点击 0.5,0.5 0',
              comments: '点击 x,y (x,y为相对坐标，取值范围0-1) 重复次数0(最多10次) 鼠标放在投屏上可以看到比例, 右键可以复制'
            }, // 刷新
            { name: '滑动', text: '滑动 0.5,0.7 0.5,0.3', comments: '滑动 x1,y1 x2,y2 从x1,y1滑动到x2,y2' }, //上滑
            {
              name: '刷新', text: '刷新 2 0', comments: '刷新屏幕文字, 刷新前等待2秒, 刷新后等待0秒 点击文字, 检测存在文字前, 需刷新当前文字, 同一组操作只需要刷新一次'
            }, {
              name: "存在文字",
              text: "存在文字 文字1,文字2,文字3 2 0,1,0,1?占位:占位",
              comments: "存在文字 文字列表(英文逗号分隔不能有空格) 阈值(最少出现几个) x开始比例,x结束比例,y开始比例,y结束比例, 找不到时增大范围尝试!"
            }, {
              name: '点击文字',
              text: '点击文字 设置 0,1,0,1 0?占位:占位',
              comments: '点击文字 文字内容 x开始比例,x结束比例,y开始比例,y结束比例, 默认全屏出现的第一个文字 0,0.5,0,1 即为左半屏 重复次数0 重复次数0(最多10次)\n以整段文字的中心点定位, 不是单个文字的位置'
            },
            { name: '注释', text: '// 注释内容', comments: '// 开头的行为注释, 会被忽略' }, //等待
            { name: '等待', text: '等待 5,20', comments: '随机等待 5-20秒' }, //滑动
            { name: '上滑', text: '上滑', comments: '随机上滑屏幕' }, //下滑
            { name: '下滑', text: '下滑', comments: '随机下滑屏幕' }, //左滑
            { name: '左滑', text: '左滑', comments: '随机左滑屏幕' }, //右滑
            { name: '右滑', text: '右滑', comments: '随机右滑屏幕' }, //输入
            { name: '输入', text: '输入 你好', comments: '输入 文字' }, //输入法
            { name: '输入法', text: '输入法?输入 你好', comments: '输入法?输入 文字, 输入法激活时, 执行输入操作' }, //隐藏输入法
            { name: '隐藏输入法', text: '隐藏输入法', comments: '隐藏输入法' }, //清楚文字
            { name: '清除文字', text: '清除文字', comments: '清除文字' }, //执行
            { name: '执行', text: '执行 脚本名', comments: '执行 其它脚本名, 执行完毕后继续执行当前脚本' }, //退出
            { name: '退出', text: '退出', comments: '退出当前脚本' }, //桌面
            { name: '桌面', text: '桌面', comments: '回到桌面' }, //返回
            { name: '返回', text: '返回', comments: '从最左侧向右滑屏 触发返回操作' }, //清理
            { name: '清理', text: '清理', comments: '清理后台' }, //归零
            { name: '归零', text: '归零', comments: '机器人归零校准' }, //校准
            { name: '校准', text: '校准', comments: '机器人校准当前手机' }, //标签大于
            { name: '随机选择', text: '随机选择 $变量1,变量2,变量3', comments: '随机选择 变量列表(英文逗号分隔不能有空格)' },
            {
              name: '图色',
              text: '图色 0.5,0.5@#fffff&100,100-150,150@#111111?占位:占位',
              comments: '根据坐标颜色匹配当前页面. 可以是单个坐标也可以是坐标范围, 既可以用比例也可以用像素点坐标.\n颜色用HEX值'
            },
          ],
        },
        {
          name: '拍照命令', text: '拍照命令', comments: '拍照命令',
          children: [
            { name: '拍照', text: '拍照', comments: '先拍照, 才能使用其它照片相关的命令' },
            {
              name: '存在照片文字',
              text: '存在照片文字 文字1,文字2,文字3 2 0,1,0,1?占位:占位',
              comments: '存在照片文字 文字列表(英文逗号分隔不能有空格) 阈值(最少出现几个) x开始比例,x结束比例,y开始比例,y结束比例, 找不到时增大范围尝试!'
            },
            {
              name: '点击照片',
              text: '点击照片 0.5,0.5 0',
              comments: '点击照片 x,y (x,y为相对坐标，取值范围0-1) 重复次数0(最多10次)'
            },
            {
              name: '点击照片文字',
              text: '点击照片文字 设置 0,1,0,1 0?占位:占位',
              comments: '点击照片文字 文字内容 x开始比例,x结束比例,y开始比例,y结束比例, 默认全屏出现的第一个文字 0,0.5,0,1 即为左半屏 重复次数0(最多10次)\n以整段文字的中心点定位, 不是单个文字的位置'
            },
            { name: '滑动照片', text: '滑动照片 0.5,0.5 0.5,0.8', comments: '滑动照片 x1,y1,x2,y2 从x1,y1滑动到x2,y2' },
          ]
        },
        {
          name: '标签相关命令', text: '标签相关命令', comments: '显示分隔符', children: [
            //创建标签
            {
              name: '创建标签',
              text: '#标签1 ',
              comments: '创建一个名字为"标签1"的标签\n标签名字不能有空格, 空格后的内容会被作为初始值 设置了初始值将会停止计数! 没有初始值的标签,运行一次计数增加1\n使用 $标签1 可以引用标签的值做一些命令的参数 \n初始值可以是数字和字符串, 不同类型不能比较大小, 可能会导致程序异常退出'
            }, // 标签
            {
              name: '标签跳转',
              text: '标签 标签1 下一行',
              comments: '标签跳转指令  \n#标签1 将创建一个名字为"标签1"的标签 \n此指令将直接跳转到"标签1", 并在此标签执行完后跳转到所给的"标签2"\n 退出标签 可以不写, 若中间进行了其它标签跳转, 此退出标签将会失效\n参数中不可引用其它标签\n退出标签 可以用 "下一行" 去执行下一行代码'
            }, //注释
            {
              name: '标签大于', text: '标签大于 标签1 5?退出', comments: '标签1执行次数大于 5, 5为阈值, 当前标签执行次数大于5时退出. 自增标签比较计数, 有初始值比较当前值'
            }, //标签小于
            {
              name: '标签小于',
              text: '标签小于 标签1 5?退出',
              comments: '标签1执行次数标签小于 5, 5为阈值, 当前标签执行次数小于5时退出. 自增标签比较计数, 有初始值比较当前值'
            }, //标签等于
            {
              name: '标签等于', text: '标签等于 标签1 5?退出', comments: '标签1执行次数等于 5, 5为阈值, 当前标签执行次数等于5时退出  自增标签比较计数, 有初始值比较当前值'
            }, //标签增加
            {
              name: '标签增加', text: '标签增加 标签1 5', comments: '标签1 增加5 不同类型增加可能会导致程序异常退出'
            }, //标签减少
            {
              name: '标签减少', text: '标签减少 标签1 5', comments: '标签1 减少5 不同类型减少可能会导致程序异常退出'
            },
            //标签乘以
            {
              name: '标签乘以', text: '标签乘以 标签1 5', comments: '标签1 乘以5 不同类型乘以可能会导致程序异常退出'
            }, //标签除以
            {
              name: '标签除以', text: '标签除以 标签1 5', comments: '标签1 除以5 除数不能为0 不同类型除以可能会导致程序异常退出'
            }, //标签设置
            {
              name: '标签设置', text: '标签设置 标签1 5', comments: '标签1执行次数设置 5, 5为设置的次数'
            }, //概率大于
            {
              name: '标签设置 执行结果',
              text: '标签设置 执行结果 成功',
              comments: '执行结果 是一个默认标签\n调用其它脚本的时候, #执行结果 的内容会被返回, 可以用变量 $执行结果 来调取, 默认返回 "未定义"\n' +
                '本脚本如果被其它脚本执行, 可以设置此值返回给调用脚本本脚本的执行结果'
            }, //概率大于
          ]
        },
        {
          name: '插入逻辑比较', text: '插入逻辑比较', comments: '显示分隔符', children: [
            {
              name: '等于',
              text: '等于 $手机编号 1?退出:标签 手机1',
              comments: '等于 1 1, 当前1等于1时退出\n可以引用标签, 比如: 等于 $标签1 $标签2'
            }, //不等于
            { name: '不等于', text: '不等于 $手机编号 1?退出:标签 手机1', comments: '不等于 1 1, 当前1不等于1时退出' }, //大于
            { name: '大于', text: '大于 $手机编号 1?退出:标签 手机1', comments: '大于 1 1, 当前1大于1时退出' }, //小于
            { name: '小于', text: '小于 $手机编号 1?退出:标签 手机1', comments: '小于 1 1, 当前1小于1时退出' }, //大于等于
            {
              name: '大于等于',
              text: '大于等于 $手机编号 1?退出:标签 手机1',
              comments: '大于等于 1 1, 当前1大于等于1时退出'
            }, //小于等于
            {
              name: '小于等于',
              text: '小于等于 $手机编号 1?退出:标签 手机1',
              comments: '小于等于 1 1, 当前1小于等于1时退出'
            }, //取模等于
            {
              name: '取模等于',
              text: '取模等于 $手机编号 1 1?退出:标签 手机1',
              comments: '取模等于 1 1 1, 当前1取模1等于1时退出'
            }, //取模不等于
            {
              name: '取模不等于', text: '取模不等于 $手机编号 1 1?退出:标签 手机1', comments: '取模不等于 1 1 1, 当前1取模1不等于1时退出'
            }, //包含
            { name: '包含', text: '包含 参数1 参数2?退出:标签 手机1', comments: '包含 参数1是否包含参数2 比如 知道了 包含 知道' }, //不包含
            { name: '不包含', text: '不包含 参数1 参数2?退出:标签 手机1', comments: '包含 参数1是否包含参数2' }, //单数
            //开始于
            { name: '开始于', text: '开始于 参数1 参数2?退出:标签 手机1', comments: '开始于 参数1是否开始于参数2' }, //结束于
            { name: '结束于', text: '结束于 参数1 参数2?退出:标签 手机1', comments: '结束于 参数1是否结束于参数2' }, //单数
            { name: '单数', text: '单数 $手机编号?退出:标签 手机1', comments: '单数 检查参数是否未单数' }, //双数
            { name: '双数', text: '双数 $手机编号?退出:标签 手机1', comments: '双数 检查参数是否为双数' },
            {
              name: '概率大于',
              text: '概率大于 0.5?退出:占位',
              comments: '概率大于 0.5, 0.5为阈值, 当前概率大于0.5时退出'
            },
            { name: '概率小于', text: '概率小于 0.5?退出:占位', comments: '概率小于 0.5, 0.5为阈值, 当前概率小于0.5时退出' },
          ]
        },
        {
          name: '插入内置变量', text: '插入内置变量', comments: '显示分隔符',
          children: [
            { name: '时间戳', text: '${时间戳}', comments: '时间戳秒数' }, //时间戳
            { name: '时间戳毫秒', text: '${时间戳毫秒}', comments: '时间戳毫秒数' }, //粘贴板
            { name: '粘贴板', text: '${粘贴板}', comments: '获取手机粘贴板的内容' }, //返回值
            { name: '返回值', text: '${返回值}', comments: '上一行代码的返回值' },
            { name: '执行结果', text: '${执行结果}', comments: '上一个脚本的执行结果' },
            {
              name: '执行参数',
              text: '${执行参数1}',
              comments: '执行脚本时的参数1, 比如代码 "执行 脚本1 参数1 参数2" 时, 在脚本1里调用 $执行参数2 返回第二个参数 参数2, 以此类推. 默认返回: 未定义'
            },
            { name: '手机编号', text: '${手机编号}', comments: '当前手机的编号: 0-9' },
            //脚本名称
            { name: '脚本名称', text: '${脚本名称}', comments: '当前脚本的名称' },
            //开始时间
            { name: '开始时间', text: '${开始时间}', comments: '当前脚本的开始时间, 时间戳' },
            //执行时间
            { name: '执行时间', text: '${执行时间}', comments: '当前脚本的执行时间, 单位秒' },
          ]
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {

  },
  methods: {
    do1(e, e1) {
      console.log(e, e1);
    },
    handleNodeClick(node, dataSource) {
      let isBeginner = this.isBeginner
      let { comments, text } = node
      // let str_arr = comments.split(',')
      if (dataSource.level === 2) {
        if (isBeginner) {
          // str_arr.forEach((n) => {
          //   this.textarea += `//${n}\n`
          // })
          this.textarea += `\n${comments}\n`
          this.textarea += `${text}`
        } else {
          this.textarea += `${text}`
        }
        // console.log(this.textarea, '生成的字符串', comments, text);
        // console.log(node, dataSource);
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '~./index.scss'
</style>
