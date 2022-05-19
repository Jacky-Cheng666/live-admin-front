<template>
  <div class="flex align-center justify-between mb-20">
    <el-button type="text" icon="el-icon-back" style="color: #5a607f"
      @click="$router.back()">返回上一层
    </el-button>
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>