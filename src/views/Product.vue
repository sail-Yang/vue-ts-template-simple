<template>
  <el-table :data="productList" style="width: 100%">
    <el-table-column fixed label="商品编号" prop="id" />
    <el-table-column label="商品名称" prop="pname" />
    <el-table-column label="商品库存" prop="count" />
    <el-table-column label="商品单价（元）" prop="price" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="medium" @click="getEditProduct(row)">
          编辑
        </el-button>
        <el-button link type="primary" size="medium" @click="DelProduct(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="example-pagination-block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="prev, pager, next" :total="total" />
  </div>
  <el-button type="primary" style="margin-top: 3px;" @click="addDialogVisible = true;">
    添加商品
  </el-button>
  <el-dialog v-model="editDialogVisible" title="修改商品信息" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="editProductForm" style="max-width: 600px">
      <el-form-item label="商品编号">
        <el-input v-model="editProductForm.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="editProductForm.pname" />
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number :min="0" :max="50000" v-model="editProductForm.count" />
      </el-form-item>
      <el-form-item label="商品单价（元）">
        <el-input-number :min="0" :max="50000" :precision="2" v-model="editProductForm.price" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editDialogVisible = false; EditProduct()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="addDialogVisible" title="添加商品" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="addProductForm" style="max-width: 600px">
      <el-form-item label="商品名称">
        <el-input v-model="addProductForm.pname" />
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number :min="0" :max="50000" v-model="addProductForm.count" />
      </el-form-item>
      <el-form-item label="商品单价（元）">
        <el-input-number :min="0" :max="50000" :precision="2" v-model="addProductForm.price" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogVisible = false; AddProduct()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
import { getProductList, editProduct, addProduct, delProduct } from "@/api/product"
import { ElNotification } from 'element-plus'

const productList = ref<any>();
const product = ref<any>();
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
  getProductList({
    "page":  currentPage.value
  })
    .then((res: any) => {
      productList.value = res.storelist;
      currentPage.value = num;
      pageSize.value = res.pageSize;
      total.value = res.total
    })
    .catch((err: any) => {
      console.log(err)
    })
}

const getEditProduct = (row: any) => {
  product.value = row;
  editProductForm.id = row.id;
  editProductForm.pname = row.pname;
  editProductForm.count = row.count;
  editProductForm.price = row.price;
  editDialogVisible.value = true;
}


const editProductForm = reactive({
  id: '',
  pname: '',
  count: 0,
  price: 0.0,
})

const addProductForm = reactive({
  pname: '',
  count: 0,
  price: 0.0,
})

const EditProduct = () => {
  editProduct(editProductForm)
    .then(() => {
      ElNotification.success({
        title: '修改成功',
        message: '修改商品信息成功',
      })
      getPageList(1)
    })
}

const AddProduct = () => {
  addProduct(addProductForm)
    .then(() => {
      ElNotification.success({
        title: '添加成功',
        message: '添加商品信息成功',
      })
      getPageList(1)
    })
}

const DelProduct = (row: any) => {
  let pid:any = Number.parseInt(row.id)
  delProduct({"id": pid})
    .then(() => {
      ElNotification.success({
        title: '删除成功',
        message: '删除商品成功',
      })
      getPageList(1)
    })
}
</script>

<style>

</style>
