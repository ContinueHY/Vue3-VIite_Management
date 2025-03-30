<script setup>
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const handClick = () => {};

const { proxy } = getCurrentInstance();

const handleClick = () => {
  console.log("click");
};

const tableLabel = reactive([
  {
    prop: "name", //循环渲染表格的字段,根据这个从tableData中取数据
    key: "name1", //循环时每个字段的key，也可以用prop
    label: "姓名",
  },
  {
    prop: "age",
    key: "age1",
    label: "年龄",
  },
  {
    prop: "sex",
    key: "sex1",
    label: "性别",
  },
  {
    prop: "birth",
    key: "birth1",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    key: "addr1",
    label: "地址",
    width: 400,
  },
]);
const tableData = ref([]);
const getUserData = async () => {
  let data = await proxy.$api.getUserData1(config);
  //   console.log(data.list);
  tableData.value = data.list.map((item) => ({
    ...item, //解构数据
    sex: item.sex == 1 ? "男" : "女", //修改数据
    anotherProp: item.age + 10, //新加数据
  }));
  //   console.log(tableData.value);
  config.total = data.count;
};

const formInline = reactive({
  namekey: "",
});

const config = reactive({
  //看后端规定了可以用什么字段去查，这里就是生成数据的mock
  name: "",
  total: 0,
  page: 1,
});
const handleSerchName = () => {
  config.name = formInline.namekey;
  getUserData();
};

//分页
const changePage = (page) => {
  config.page = page;
  getUserData();
};

//删除数据
const handleDelete = (row) => {
  console.log(row.id);
  ElMessageBox.confirm("您确定要删除吗?")
    .then(async () => {
      await proxy.$api.deleteUser1({ id: row.id });
      ElMessage({
        showClose: true,
        type: "success",
        message: "删除成功!",
      });
      await getUserData();
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        type: "info",
        message: "已取消删除",
      });
    });
};

//设置好新增数据对话框的显示和规则
const action = ref("add");
const dialogVisible = ref(false);
const formUser = reactive({});
const rules = {
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr: [{ required: true, message: "地址是必填项" }],
};

const handleClose = () => {
  //获取表单重置表单
  dialogVisible.value = false;
  proxy.$refs["userForm"].resetFields();
};

const handleCancel = () => {
  dialogVisible.value = false;
  proxy.$refs["userForm"].resetFields();
};

//新增数据按钮点击
const handleAdd = () => {
  dialogVisible.value = true;
  action.value = "add";
};

//格式化日期，格式化为：1997-01-02这种
const timeFormat = (time) => {
  var time = new Date(time);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  function add(m) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add(month) + "-" + add(date);
};

//新增或编辑数据设计好后点确定
const onSubmit = () => {
  //先校验
  proxy.$refs["userForm"].validate(async (valid) => {
    if (valid) {
      //res用于接收添加用户或者编辑用户接口的返回值
      let res = null;
      //校验通过,对时间格式处理
      //如果不是1997-01-02这种格式，使用timeFormat方法进行格式化
      formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth)
        ? formUser.birth
        : timeFormat(formUser.birth);
      //判断是新增还是编辑
      if (action.value == "add") {
        res = await proxy.$api.addUser1(formUser);
      }else{
        res = await proxy.$api.editUser1(formUser); 
      }
      //如果接口调用成功
      if (res) {
        //关闭对话框，重置表单，重新请求用户数据
        dialogVisible.value = false;
        proxy.$refs["userForm"].resetFields();
        getUserData();
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      });
    }
  });
};

const handleEdit = (row) => {
  action.value = "edit";
  dialogVisible.value = true;

  nextTick(() => {
    Object.assign(formUser, { ...row});
  });
};

onMounted(() => {
  getUserData();
});
</script>

<template>
  <div>
    <div class="user-header">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <div class="search">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="请输入">
            <el-input placeholder="请输入用户名" v-model="formInline.namekey" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSerchName">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          v-for="item in tableLabel"
          :key="item.key"
          :width="item.width ? item.width : 125"
          :prop="item.prop"
          :label="item.label"
        />
        <el-table-column fixed="right" label="Operations" min-width="180">
          <template #="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        size="small"
        background
        layout="prev, pager, next"
        :total="config.total"
        @current-change="changePage"
        class="pager"
      />
    </div>

    <!--新增用户对话框-->
    <el-dialog
      v-model="dialogVisible"
      :title="action == 'add' ? '新增用户' : '编辑用户'"
      width="35%"
      :before-close="handleClose"
    >
      <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
      <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formUser.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model.number="formUser.age"
                placeholder="请输入年龄"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="select-clearn" label="性别" prop="sex">
              <el-select v-model="formUser.sex" placeholder="请选择">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birth">
              <el-date-picker
                v-model="formUser.birth"
                type="date"
                placeholder="请输入"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="formUser.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-row>
        <el-row style="justify-content: flex-end">
          <el-form-item>
            <el-button type="primary" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table {
    height: 500px;
    width: 100%;
  }
}
.select-clearn {
  display: flex;
}
</style>
