<template>
  <div style="text-align">
    <el-transfer v-model="value" filterable :filter-method="filterMethod" filter-placeholder="搜素商品" :data="data">
      <template #right-footer>
        <el-button class="transfer-footer" type="primary" size="medium" @click="updateSaleList()">生成购物清单</el-button>
      </template>
    </el-transfer>
  </div>
  <el-table :data="saleList" style="width:100%">
    <el-table-column fixed label="商品编号" prop="key" />
    <el-table-column label="商品名称" prop="label" />
    <el-table-column label="商品单价（元）" prop="price" />
    <el-table-column label="商品数量" prop="count" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="medium" @click="updateCount(row)">
          修改数量
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="updateCountDialogVisible" title="修改数量" width="500" align-center>
    <el-form label-position="right" label-width="auto" :model="editProductForm" style="max-width: 600px">
      <el-form-item label="商品数量">
        <el-input-number :min="0" :max="100" v-model="editProductForm.count" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateCountDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateCountDialogVisible = false; UpdateCount()">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div style="margin-top: 5px;text-align:center;width:100%">
    <el-statistic precision="2" style="text-align:center" title="总金额" :value="sumMoney" />
  </div>
  <div style="margin-top: 5px;text-align:center;width:100%">
    <el-button type="primary" @click="submitOrder()">
      提交订单
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { getProductLabelList } from "@/api/product"
import { submitSaleOrder } from "@/api/sale"
import { getUsername } from '@/utils/auth'
import { ElNotification } from 'element-plus'
import { useRouter } from "vue-router";

interface Option {
  key: number
  label: string
  price: number
}

interface product {
  key: number
  label: string
  price: number
  count: number
}

const editProductForm = reactive({
  count: 0,
})

const product = ref<any>()
const data = ref<Option[]>()
const value = ref([])
const saleList = ref<product[]>([])
const updateCountDialogVisible = ref(false)
const sumMoney = ref(0.0)
const countProduct = ref(0)
const router = useRouter()


onMounted(() => {
  getProductLabelList()
    .then((res: any) => {
      data.value = res
    })
    .catch((err: any) => {
      console.log(err)
    })
});




const filterMethod = (query, item) => {
  return item.label.includes(query)
}

const updateSaleList = () => {
  saleList.value = []
  sumMoney.value = 0.0
  countProduct.value = 0
  let i = 0
  let id = value.value[i];
  data.value?.forEach(obj => {
    if (obj.key == id) {
      saleList.value.push({ ...obj, count: 1 })
      sumMoney.value += obj.price
      countProduct.value += 1
      if (i < value.value.length - 1) {
        i++;
        id = value.value[i];
      }
    }
  })
}

const updateCount = (row: any) => {
  product.value = row
  editProductForm.count = row.count
  updateCountDialogVisible.value = true;
}

const UpdateCount = () => {
  saleList.value?.forEach(obj => {
    if (obj.key == product.value.key) {
      countProduct.value -= obj.count
      sumMoney.value -= (obj.count * obj.price)
      obj.count = editProductForm.count
      sumMoney.value += (obj.count * obj.price)
      countProduct.value += obj.count
      return;
    }
  })
}

const submitOrder = () => {
  let data = {
    username: getUsername(),
    saleList: JSON.stringify(saleList.value),
    money: sumMoney.value,
    count: countProduct.value
  }
  submitSaleOrder(data)
    .then((res: any) => {
      ElNotification.success({
        title: '生成成功',
        message: '生成订单成功',
      })
      //路由跳转订单页面
      router.push({
        path: "/result",
        query: {
          id: res.order_id,
        },
      });
    })
}


</script>

<style></style>
