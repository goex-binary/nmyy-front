<template>
  <el-dialog :title="dialogTitle" :visible.sync="aeraGridDialogVisible" @open="handleOpen" width="50%">
    <el-form v-model="editedGrid" label-width="100px">
      <el-form-item label="区域名称">
        <el-input v-model="editedGrid.name" placeholder="请输入区域名称"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="editedGrid.manager" placeholder="请输入负责人"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="editedGrid.contact" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="重要程度">
        <el-select v-model="editedGrid.priority" placeholder="请选择重要程度">
          <el-option label="红色" value="red"></el-option>
          <el-option label="黄色" value="yellow"></el-option>
          <el-option label="蓝色" value="blue"></el-option>
          <el-option label="绿色" value="green"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="false" label="区域范围">
        <el-input v-model="editedGrid.latlngs" placeholder="请输入区域范围"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="aeraGridDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveGridInfo">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: Object,
  },
  data() {
    return {
      aeraGridDialogVisible: false,
      dialogTitle: "网格信息",
      editedGrid: { ...this.value }, // Data for editing
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        // Set initial data for editing
        this.editedGrid = { ...newVal };
        console.log("watch value:", this.editedGrid);
      },
    },
  },
  methods: {
    saveGridInfo() {
      this.$emit("save", this.editedGrid);
      this.aeraGridDialogVisible = false;
    },
    show() {
      this.aeraGridDialogVisible = true;
    },
    handleOpen() {
      console.log("onChange:", this.editedGrid);
    },
  },
};
</script>
