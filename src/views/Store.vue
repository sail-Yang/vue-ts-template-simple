<template>
  <div class="p_table">
    <el-table :data="storeList" height="100%" style="width: 100%;height: 100%">
      <el-table-column label="商品ID" prop="id" />
      <el-table-column label="商品名称" prop="pname" />
      <el-table-column label="商品库存" prop="count" />
      <el-table-column label="商品单价（元）" prop="price" />
    </el-table>
    <div class="example-pagination-block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getStoreList } from "@/api/store"
const storeList = ref<any>();
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
  getStoreList({
    "page":  currentPage.value
  })
    .then((res: any) => {
      storeList.value = res.storelist;
      currentPage.value = num;
      pageSize.value = res.pageSize;
      total.value = res.total
    })
    .catch((err: any) => {
      console.log(err)
    })
}
</script>

<style scoped>
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
