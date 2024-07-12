<template>
  <el-descriptions title="订单信息概览">
    <el-descriptions-item label="订单编号">{{orderId}}</el-descriptions-item>
    <el-descriptions-item label="订单时间">{{orderTime}}</el-descriptions-item>
    <el-descriptions-item label="订单总额">{{sumMoney}}</el-descriptions-item>
    <el-descriptions-item label="收银员编号">{{cashierId}}</el-descriptions-item>
    <el-descriptions-item label="商品数">{{count}}</el-descriptions-item>
  </el-descriptions>

  <el-table :data="productList" stripe style="width: 100%">
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="count" label="商品数量" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from "vue-router";
import { getOrderResult } from "@/api/sale"

onMounted(() => {
  getOrderResult({"id":orderId.value})
    .then((res: any) => {
      orderTime.value = res.order_time,
      sumMoney.value = res.money
      count.value = res.count
      cashierId.value = res.uid
      productList.value = res.products
    })
    .catch((err: any) => {
      console.log(err)
    })
});

const router = useRouter()
const orderId = ref<any>(router.currentRoute.value.query.id)
const orderTime = ref<any>();
const sumMoney = ref<any>();
const cashierId = ref<any>();
const count = ref<any>();
const productList = ref<any>();

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]


</script>