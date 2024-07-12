<template>
  <el-table :data="cashierList" style="width: 100%">
    <el-table-column fixed prop="uid" label="员工编号" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="gender" label="性别" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="employee_time" label="入职时间"  />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="medium" @click="getEditCashier(row)">
          编辑
        </el-button>
        <el-button link type="primary" size="medium" @click="DelCashier(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="example-pagination-block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="prev, pager, next" :total="total" />
  </div>
  <el-button type="primary" style="margin-top: 3px;" @click="addDialogVisible = true;">
    添加收银员
  </el-button>
  <el-dialog v-model="editDialogVisible" title="修改收银员信息" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="editCashierForm" style="max-width: 600px">
      <el-form-item label="员工编号">
        <el-input v-model="editCashierForm.uid" :disabled="true" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editCashierForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="editCashierForm.gender" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="editCashierForm.age" />
      </el-form-item>
      <el-form-item label="入职时间">
        <el-input v-model="editCashierForm.employee_time" :disabled="true" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editDialogVisible = false; EditCashier()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="addDialogVisible" title="添加收银员" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="addCashierForm" style="max-width: 600px">
      <el-form-item label="姓名">
        <el-input v-model="addCashierForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="addCashierForm.gender" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number :min="18" :max="70" v-model="addCashierForm.age" />
      </el-form-item>
      <el-form-item label="登录账号">
        <el-input v-model="addCashierForm.username" />
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="addCashierForm.passwd" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogVisible = false; AddCashier()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { getCashierList, editCashier, addCashier, delCashier } from "@/api/cashier"
import { ElNotification } from 'element-plus'

const cashier = ref<any>();
const cashierList = ref<any>();
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)
const currentPage = ref<any>(1)
const total = ref<any>(20)
const pageSize = ref<any>(10)

onMounted(() => {
  getPageList(1)
});

const handleSizeChange = (val: any) => {
  console.log(`每页 ${val} 条`);
  currentPage.value = 1;
  pageSize.value = val;
}

const handleCurrentChange = (val: any) => {
  console.log(`当前页: ${val}`);
  currentPage.value = val;
  getPageList(val)
}

const getPageList = (num : any) => {
  getCashierList({
    "page":  currentPage.value
  })
    .then((res: any) => {
      cashierList.value = res.list;
      currentPage.value = num;
      pageSize.value = res.pageSize;
      total.value = res.total
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const getEditCashier = (row: any) => {
  cashier.value = row;
  editCashierForm.uid = row.uid;
  editCashierForm.name = row.name;
  editCashierForm.age = row.age;
  editCashierForm.gender = row.gender;
  editCashierForm.employee_time = row.employee_time;
  editDialogVisible.value = true;
}

const editCashierForm = reactive({
  uid: '',
  name: '',
  age: 0,
  gender: '',
  employee_time: ''
})

const addCashierForm = reactive({
  name: '',
  age: 18,
  gender: '',
  username: '',
  passwd: ''
})

const EditCashier = () => {
  editCashier(editCashierForm)
    .then(() => {
      ElNotification.success({
        title: '修改成功',
        message: '修改收银员信息成功',
      })
      getPageList(currentPage.value)
    })
}

const AddCashier = () => {
  addCashier(addCashierForm)
    .then(() => {
      ElNotification.success({
        title: '添加成功',
        message: '添加收银员成功',
      })
      getPageList(currentPage.value)
    })
}

const DelCashier = (row: any) => {
  delCashier({"uid": row.uid})
    .then(() => {
      ElNotification.success({
        title: '删除成功',
        message: '删除收银员成功',
      })
      getPageList(currentPage.value)
    })
}

</script>
<style></style>
