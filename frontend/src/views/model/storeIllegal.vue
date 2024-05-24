<template>
  <div class="app-container">
    <div class="storeShow-header">
      <el-form :model="form" class="demo-form-inline" :inline="true">
        <!-- <div class="parma"> -->
        <el-form-item :label="lr">
          <el-input-number v-model="form.lrNum" :precision="2" :step="0.01" :min="0.01" :max="0.1" />
        </el-form-item>
        <el-form-item label="权重衰减">
          <el-input-number v-model="form.weight" :precision="4" :step="0.0001" :min="0.0001" :max="0.1" />
        </el-form-item>
        <el-form-item label="训练轮次">
          <el-input-number v-model="form.num" :min="10" />
        </el-form-item>
        <!-- <div class="btn"> -->
        <!-- <el-button type="primary" round size="large" @click="create()">模型训练</el-button> -->
        <!-- <el-button type="default" round size="large" @click="testShow()">模型测试</el-button> -->
        <!-- </div> -->
      <!-- </div> -->
      <!-- <div>数据：{{ this.registerModel_data }}</div> -->
      <!-- <div>epoch数据：{{ this.registerModel_data['epoch'] }}</div> -->
      </el-form>

      <el-upload
        class="uploadTest"
        action="http://127.0.0.1:8001/api_store_fraud/store_fraud/uploadTestData/"
        :on-preview="handlePreviewTest"
        :on-remove="handleRemoveTest"
        :before-remove="beforeRemoveTest"
        multiple
        :limit="1"
        :on-exceed="handleExceedTest"
        :file-list="fileListTest"
        name="testDataFile"
      >
      <el-tooltip class="item" effect="dark" content="只能上传zip文件" placement="top-start">
        <el-button type="primary" round >测试数据上传</el-button>
      </el-tooltip>
        <!-- <div slot="tip" class="el-upload__tip">只能上传zip文件</div> -->
      </el-upload>

      <el-upload
        class="uploadTrain"
        action="http://127.0.0.1:8001/api_store_fraud/store_fraud/uploadTrainData/"
        :on-preview="handlePreviewTrain"
        :on-remove="handleRemoveTrain"
        :before-remove="beforeRemoveTrain"
        multiple
        :limit="1"
        :on-exceed="handleExceedTrain"
        :file-list="fileListTrain"
        name="trainDataFile"
      >
        <el-tooltip class="item" effect="dark" content="只能上传zip文件" placement="top-start">
          <el-button type="primary" round >训练数据上传</el-button>
        </el-tooltip>
      </el-upload>
      <el-button id="btn1" type="default" round @click="testShow()">模型测试</el-button>

      <!-- <el-divider direction="vertical"></el-divider> -->

      <!-- 模型训练 -->
      <!-- <span>模型训练</span> -->

      <el-button id="btn2" type="default" round @click="create()">模型训练</el-button>

      <!-- <el-divider direction="vertical"></el-divider> -->

      <!-- 模型下载 -->
      <!-- <span>模型下载</span> -->
      <el-button id="btn3" type="primary" round @click="download()">模型下载</el-button>

    </div>

    <el-table
      v-loading="loading"
      :data="storeFraudList"
      height="800"
      border
      style="width: 35%;"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="135"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="cardID"
        label="卡ID"
        width="255"
      />
    </el-table>
    <div class="container" style="width: 32.5%;">
      <div id="textChart1" class="chart" style="height:100px;width:100%;padding: 0 5px;" />
      <div id="textChart2" class="chart" style="height:100px;width:100%;padding: 0 5px;" />
      <div id="textChart3" class="chart" style="height:100px;width:100%;padding: 0 5px;" />
    </div>
    <div id="bingDiv" class="container" style="width: 32.5%;">
      <div id="bingChart" class="chart" style="height:300px;width:100%;" />
    </div>
    <div class="container" style="width: 65%;">
      <div id="chart" class="chart" style="height:500px;width:100%;padding: 5px 0;" />
    </div>

    <!-- <div class="container">
      <div id="chart" class="chart" style="height:510px;width:100%;" />
    </div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      fileListTest: [],
      fileListTrain: [],
      loading: false,
      storeFraudList: '',
      btnDisabled: false,
      radio1: 2,
      radio2: 3,
      is_create: '',
      is_test: '',
      form: {
        lrNum: 0.01,
        weight: '',
        num: ''
      },
      lr: '学习率' + '\xa0\xa0\xa0'
    }
  },
  computed: {
    ...mapGetters([
      'storeModel_data',
      'storeTest_data'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    download() {
      window.location.href = 'http://127.0.0.1:8001/api_store_fraud/store_fraud/downloadModel/'
    },
    handlePreviewTest(file) {
      console.log(file)
    },
    handleRemoveTest(file, fileListTest) {
      console.log(file, fileListTest)
    },
    beforeRemoveTest(file, fileListTest) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceedTest(files, fileListTest) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileListTest.length} 个文件`)
    },

    handlePreviewTrain(file) {
      console.log(file)
    },
    handleRemoveTrain(file, fileListTrain) {
      console.log(file, fileListTrain)
    },
    beforeRemoveTrain(file, fileListTrain) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceedTrain(files, fileListTrain) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileListTrain.length} 个文件`)
    },
    init() {
      this.$store.dispatch('storeFraud/storeModelInit').then(response => {
        this.showChartStoreFraud()
        this.loading = true
        this.$store.dispatch('storeFraud/storeTestInit').then(response => {
          this.storeFraudList = this.storeTest_data['cardlist']
          this.loading = false
          console.log('This is test_data:', this.storeFraudList)
          this.showTextChart1()
          this.showTextChart2()
          this.showTextChart3()
          this.showBingChart()
        })
      })
    },
    create() {
      this.$confirm('此操作将会运行模型并返回结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '模型生成中!'
        })
        const loadingInstance = Loading.service({ // 启动loading服务
          target: document.getElementById('chart'),
          fullscreen: false
        })
        this.$store.dispatch('storeFraud/storeModelShow', this.form).then(response => {
          console.log('This is backData', this.storeModelShow)
          loadingInstance.close()// 关闭loading服务

          this.showChartStoreFraud()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
      // }
    },
    testShow() {
      this.$confirm('此操作将会进行模型测试并返回结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '模型测试中!'
        })
        const loadingInstance1 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart1'),
          fullscreen: false
        })
        const loadingInstance2 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart2'),
          fullscreen: false
        })
        const loadingInstance3 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart3'),
          fullscreen: false
        })
        const loadingInstance4 = Loading.service({ // 启动loading服务
          target: document.getElementById('bingChart'),
          fullscreen: false
        })
        this.loading = true
        this.$store.dispatch('storeFraud/storeTestShow').then(response => {
          // console.log('This is backData', this.registerTest_data)
          loadingInstance1.close()// 关闭loading服务
          loadingInstance2.close()// 关闭loading服务
          loadingInstance3.close()// 关闭loading服务
          loadingInstance4.close()// 关闭loading服务
          this.storeFraudList = this.storeTest_data['cardlist']
          this.loading = false

          this.showTextChart1()
          this.showTextChart2()
          this.showTextChart3()
          this.showBingChart()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    showChartStoreFraud() {
      this.chart1 = echarts.init(document.getElementById('chart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: '#4C4F4A',
        title: {
          text: '商户违规模型侦测',
          textStyle: {
            color: '#fff'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(55,57,61)',
          borderColor: '#37391F',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['P', 'R', 'F1'],
          icon: 'circle',
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 13,
          right: '4%',
          top: 20,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#D6D6D6'
            }
          },
          data: this.storeModel_data['epoch']
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          axisLine: {
            lineStyle: {
              color: '#D6D6D6'
            }
          }
        },
        series: [
          {
            name: 'P',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(201, 145, 68, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(201, 145, 68, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(201, 145, 68)',
                borderColor: 'rgba(201, 145, 68, 0.27)',
                borderWidth: 12
              }
            },
            data: this.storeModel_data['accuracy']
          },
          {
            name: 'R',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(171, 170, 120, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(171, 170, 120, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(171, 170, 120)',
                borderColor: 'rgba(171, 170, 120, 0.2)',
                borderWidth: 12
              }
            },
            data: this.storeModel_data['recall-macro']
          },
          {
            name: 'F1',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(222, 116, 135, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(222, 116, 135, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(222, 116, 135)',
                borderColor: 'rgba(222, 116, 135, 0)',
                borderWidth: 12
              }
            },
            data: this.storeModel_data['f1-macro']
          }
        ]
      }
      this.chart1.setOption(option)
    },
    showTextChart1() {
      this.chart = echarts.init(document.getElementById('textChart1'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: '准确率：',
          left: '20%',
          top: '35%',
          textStyle: {
            fontSize: 20,
            color: '#364056'
          }

        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '55%',
              top: 'center',
              style: {
                // text: '0.1194',
                text: this.storeTest_data['accuracy'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              }
              // keyframeAnimation: {
              //   duration: 3000,
              //   loop: true,
              //   keyframes: [
              //     {
              //       percent: 0.7,
              //       style: {
              //         fill: 'transparent',
              //         lineDashOffset: 200,
              //         lineDash: [200, 0]
              //       }
              //     },
              //     {
              //       // Stop for a while.
              //       percent: 0.8,
              //       style: {
              //         fill: 'transparent'
              //       }
              //     },
              //     {
              //       percent: 1,
              //       style: {
              //         fill: 'black'
              //       }
              //     }
              //   ]
              // }
            }
          ]
        }
      }
      this.chart.setOption(option)
    },
    showTextChart2() {
      this.chart = echarts.init(document.getElementById('textChart2'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: '召回率：',
          left: '20%',
          top: '35%',
          textStyle: {
            fontSize: 20,
            color: '#364056'
          }

        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '55%',
              top: 'center',
              style: {
                // text: '0.8888',
                text: this.storeTest_data['recall_macro'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              }
              // keyframeAnimation: {
              //   duration: 3000,
              //   loop: true,
              //   keyframes: [
              //     {
              //       percent: 0.7,
              //       style: {
              //         fill: 'transparent',
              //         lineDashOffset: 200,
              //         lineDash: [200, 0]
              //       }
              //     },
              //     {
              //       // Stop for a while.
              //       percent: 0.8,
              //       style: {
              //         fill: 'transparent'
              //       }
              //     },
              //     {
              //       percent: 1,
              //       style: {
              //         fill: 'black'
              //       }
              //     }
              //   ]
              // }
            }
          ]
        }
      }
      this.chart.setOption(option)
    },
    showTextChart3() {
      this.chart = echarts.init(document.getElementById('textChart3'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: 'F1分数：',
          left: '20%',
          top: '35%',
          textStyle: {
            fontSize: 20,
            color: '#364056'
          }

        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '55%',
              top: 'center',
              style: {
                // text: '0.9999',
                text: this.storeTest_data['f1_macro'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              }
              // keyframeAnimation: {
              //   duration: 3000,
              //   loop: true,
              //   keyframes: [
              //     {
              //       percent: 0.7,
              //       style: {
              //         fill: 'transparent',
              //         lineDashOffset: 200,
              //         lineDash: [200, 0]
              //       }
              //     },
              //     {
              //       // Stop for a while.
              //       percent: 0.8,
              //       style: {
              //         fill: 'transparent'
              //       }
              //     },
              //     {
              //       percent: 1,
              //       style: {
              //         fill: 'black'
              //       }
              //     }
              //   ]
              // }
            }
          ]
        }
      }
      this.chart.setOption(option)
    },
    showBingChart() {
      this.chart = echarts.init(document.getElementById('bingChart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        title: {
          text: '预测结果',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom',
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 10
        },
        color: ['#00437C', '#007D85'],
        series: [
          {
            name: '个数',
            type: 'pie',
            radius: '60%',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            // data: [{ value: 1048, name: '预测结果1个数' },
            //       { value: 735, name: '预测结果0个数' },]
            data: this.storeTest_data['pie']
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.el-table{
  float: left;
  overflow: hidden
}
.container{
  /* width: 50%; */
  float: left;
  overflow: hidden
}
.storeShow-header{
  margin: 10px auto;
  width: 100%;
  height: 160px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, .04);

}
.el-form{
  padding-left: 120px;
  padding-top: 20px;
}
.el-form-item{
  margin-right: 30px;
}
.btn{
  margin-left: 20%;
}
.el-button{
  margin-right: 20px;
}
.uploadTest{
  position: absolute;
  display: inline-block;
  margin-left: 160px;
  margin-right: 10px;
}
.uploadTrain{
  position: absolute;
  margin-left: 350px;
  display: inline-block;
  /* margin-left: 10px; */
  margin-right: 10px;
}
#btn1{
  position: absolute;
  margin-left: 540px;
}
.clear{
  clear: both;        /*将clear设置清除浮动*/
  overflow: hidden;
}
#btn2{
  position: absolute;
  margin-left:665px;
}
#btn3{
  position: absolute;
  margin-left: 790px;
}
</style>
