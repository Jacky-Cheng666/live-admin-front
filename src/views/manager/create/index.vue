<template>
  <div class="app-container">
    <top-menu></top-menu>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-col :span="6">
            <el-input v-model="form.name" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="6">
            <el-input type="password" v-model="form.password" clearable>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="comPassword">
          <el-col :span="6">
            <el-input type="password" v-model="form.comPassword" clearable>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{isEdit?'保存':'添加'}}
          </el-button>
          <el-button type="plan" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import md5 from 'md5'
import { addManager, editManager, getManagerInfo } from '@/api/manager'
export default {
  name: "ManagerCreate",
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.comPassword !== '') {
          this.$refs.form.validateField('comPassword');
        }
        callback()
      }
    }
    var validateComPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [
          {
            required: true, message: '请输入用户名', trigger: ['blur']
          },
          {
            min: 3, max: 10, message: '用户名长度在3-10个字符', trigger: ['blur']
          },
          {
            pattern: /^[A-Za-z0-9]+$/, message: '用户名只支持英文和数字', trigger: ['blur']
          }
        ],
        password: [
          {
            required: true, validator: validatePass, trigger: ['blur']
          }
        ],
        comPassword: [
          {
            required: true, validator: validateComPassword, trigger: ['blur']
          }
        ]
      },
      form: {
        name: "",
        password: "",
        comPassword: ""
      }
    }
  },
  computed: {
    isEdit () {
      return this.$route.meta.isEdit
    }
  },
  created () {
    if (this.isEdit) {
      this.__init()
    }
  },
  methods: {
    /**获取管理员详情 */
    async __init () {
      let res = await getManagerInfo({
        id: +this.$route.params.id
      })
      this.form.name = res.data.username
    },
    /**添加按钮 */
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let dpassword = md5(this.form.password)
          console.log('dpassword', dpassword);
          this.loading = true
          if (!this.isEdit) {
            await addManager({
              username: this.form.name.trim(),
              password: dpassword
            })
          } else {
            await editManager({
              id: this.$route.params.id,
              username: this.form.name.trim(),
              password: dpassword
            })
          }
          this.$message.success('操作成功')
          this.$router.back()
        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },
    /**重置 */
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>