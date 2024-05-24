<template>
  <div class="app-container">
    <div class="scene-title">

      <span style="width: 100%; display:inline-block; text-align:center; font-size: 25px; font-weight: bold; margin-top: 10px;float: left; color: rgba(128, 128, 128)">
        时序动态图检测
      </span>
    </div>
    <div class="creditShow-header">
      <div class="span-display1" style="width: 150px">
        <span style="display: inline-block; width: 150px; font-size: 20px; font-weight: bold">信用卡套现</span>
      </div>

      <el-button id="btn1" type="primary" round @click="create1()">模型训练</el-button>
      <el-button id="btn2" type="primary" round @click="testShow1()">测试数据预测</el-button>

      <!-- <el-divider direction="vertical"></el-divider> -->

      <!-- 模型下载 -->
      <!-- <span>模型下载</span> -->
      <el-button id="btn3" type="default" round @click="download1()">模型下载</el-button>

      <div class="span-display2" style="width: 150px">
        <span style="display: inline-block; width: 150px; font-size: 20px; font-weight: bold">异常转账</span>
      </div>

      <el-button id="btn12" type="primary" round @click="create2()">模型训练</el-button>
      <el-button id="btn22" type="primary" round @click="testShow2()">测试数据预测</el-button>

      <!-- <el-divider direction="vertical"></el-divider> -->

      <!-- 模型下载 -->
      <!-- <span>模型下载</span> -->
      <el-button id="btn32" type="default" round @click="download2()">模型下载</el-button>

    </div>
    <div style="width: 20%">
      <div id="textChart1" class="chart" style="height:80px;width:100%;padding: 0 5px;" />
      <el-table
        v-loading="loading"
        :data="abnormalCardList1"
        height="600"
        border
        style="width: 100%;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="90"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cardID"
          label="卡ID"
          width="200"
        />
      </el-table>
    </div>

    <div class="container" style="width: 60%;margin-top: -80px">
      <div id="bingDiv" class="container" style="width: 35%;">
        <div id="bingChart" class="chart" style="height:200px;width:100%;" />
      </div>
      <div class="span-display3" style="width: 30%; float: left; height: 200px">
        <span style="display: inline-block; width: 100%; font-size: 20px; font-weight: bold; margin-left: 70px ">训练与预测结果</span>
      </div>
      <div id="bingDiv2" style="width: 35%; float: right;">
        <div id="bingChart2" class="chart" style="height:200px;width:100%;" />
      </div>
      <div id="chart" class="chart" style="height:500px;width:100%;padding: 5px 0; margin-top: 200px" />
    </div>

    <div style="width: 20%; float: right; margin-top: -80px">
      <div id="textChart2" class="chart" style="height:80px;width:100%;padding: 0 5px;" />
      <el-table
        v-loading="loading2"
        :data="abnormalCardList2"
        height="600"
        border
        style="width: 100%;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="90"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cardID"
          label="卡ID"
          width="200"
        />
      </el-table>
    </div>


<!--    <div class="container" style="width: 32.5%;">-->
<!--      <div id="textChart1" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart2" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--      <div id="textChart3" class="chart" style="height:100px;width:100%;padding: 0 5px;" />-->
<!--    </div>-->
<!--    <div id="bingDiv" class="container" style="width: 32.5%;">-->
<!--      <div id="bingChart" class="chart" style="height:300px;width:100%;" />-->
<!--    </div>-->

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
      loading2: false,
      abnormalCardList1: null, // 查询之后接口返回集合
      abnormalCardList2: null, // 查询之后接口返回集合
      btnDisabled: false,
      radio1: 2,
      is_create: '',
      is_init1: false,
      is_init2: false,
      form: {
        lrNum: 0.01,
        weight: '',
        batch: 1,
        num: '',
        valid: 1
      },
      lr: '学习率' + '\xa0\xa0\xa0'
    }
  },
  computed: {
    ...mapGetters([
      'dytes_test_data1',
      'dytes_test_data2',
      'dytes_training_data1',
      'dytes_training_data2'

    ])
  },
  created() {
    this.init()
  },
  methods: {
    download1() {
      window.location.href = 'http://127.0.0.1:8001/api_dytes/dytes/downloadModel1/'
    },
    download2() {
      window.location.href = 'http://127.0.0.1:8001/api_dytes/dytes/downloadModel2/'
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
      this.$store.dispatch('dytes/dytesInitTrain1').then(response => {
        console.log('This is training_data1:', this.dytes_training_data1)


        this.loading = true
        this.$store.dispatch('dytes/dytesInitTest1').then(response => {
          this.abnormalCardList1 = this.dytes_test_data1['cardlist']
          // console.log(this.abnormalCardList)
          this.loading = false

          console.log('This is test_data1:', this.abnormalCardList1)
          this.showTextChart1()
          // this.showTextChart3()
          this.showBingChart()
          this.is_init1 = true
          this.$store.dispatch('dytes/dytesInitTrain2').then(response => {
            console.log('This is training_data2:', this.dytes_training_data2)


            this.loading = true
            this.$store.dispatch('dytes/dytesInitTest2').then(response => {
              this.abnormalCardList2 = this.dytes_test_data2['cardlist']
              // console.log(this.abnormalCardList)
              this.loading = false
              console.log('This is test_data2:', this.abnormalCardList2)
              this.showTextChart2()
              // this.showTextChart3()
              this.showBingChart2()
              this.is_init2 = true
              this.showChartResult()
            })
          })
        })
      })

    },
    create1() {
      this.$confirm('此操作将会运行信用卡套现模型并返回结果, 是否继续?', '提示', {
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
        var data_form = {"dataset": "xinyongka"}
        this.$store.dispatch('dytes/dytesTrain', data_form).then(response => {
          console.log('This is backData', this.dytes_training_data1)
          loadingInstance.close()// 关闭loading服务
          this.showChartResult()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    create2() {
      this.$confirm('此操作将会运行异常转账模型并返回结果, 是否继续?', '提示', {
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
        var data_form = {"dataset": "zhuanzhang"}
        this.$store.dispatch('dytes/dytesTrain', data_form).then(response => {
          console.log('This is backData', this.dytes_training_data2)
          loadingInstance.close()// 关闭loading服务
          this.showChartResult()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    testShow1() {

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
        const loadingInstance3 = Loading.service({ // 启动loading服务
          target: document.getElementById('bingChart'),
          fullscreen: false
        })
        this.loading = true
        var data_form = {"dataset": "xinyongka"}
        this.$store.dispatch('dytes/dytesTest', data_form).then(response => {
          // console.log('This is backData', this.registerTest_data)
          loadingInstance1.close()// 关闭loading服务
          loadingInstance3.close()// 关闭loading服务
          this.abnormalCardList = this.dytes_test_data1['cardlist']
          this.loading = false

          this.showTextChart1()
          // this.showTextChart2()
          // this.showTextChart3()
          this.showBingChart()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    testShow2() {
      this.$confirm('此操作将会进行模型测试并返回结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '模型测试中!'
        })
        const loadingInstance2 = Loading.service({ // 启动loading服务
          target: document.getElementById('textChart2'),
          fullscreen: false
        })
        const loadingInstance3 = Loading.service({ // 启动loading服务
          target: document.getElementById('bingChart2'),
          fullscreen: false
        })
        this.loading2 = true
        var data_form = {"dataset": "zhuanzhang"}
        this.$store.dispatch('dytes/dytesTest', data_form).then(response => {
          // console.log('This is backData', this.registerTest_data)
          loadingInstance2.close()// 关闭loading服务
          loadingInstance3.close()// 关闭loading服务
          this.abnormalCardList = this.dytes_test_data2['cardlist']
          this.loading2 = false

          this.showTextChart2()
          // this.showTextChart3()
          this.showBingChart2()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    showChartResult() {

      this.chart = echarts.init(document.getElementById('chart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: '#161627',
        title: {
          text: '模型训练时AUC变化',
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
          data: ['信用卡套现', '异常转账'],
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
          data: this.dytes_training_data1['epoch']
        },
        yAxis: {
          type: 'value',
          min: 10,
          max: 100,
          axisLine: {
            lineStyle: {
              color: '#D6D6D6'
            }
          }
        },
        series: [
          {
            name: '信用卡套现',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(249, 113, 60, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(249, 113, 60, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(249, 113, 60)',
                borderColor: 'rgba(249, 113, 60, 0.27)',
                borderWidth: 12
              }
            },
            data: this.dytes_training_data1['auc']
          },
          {
            name: '异常转账',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(179, 228, 161, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(179, 228, 161, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(179, 228, 161)',
                borderColor: 'rgba(179, 228, 161, 0.2)',
                borderWidth: 12
              }
            },
            data: this.dytes_training_data2['auc']
          }
        ]
      }
      this.chart.setOption(option)
    },
    showTextChart1() {
      this.chart = echarts.init(document.getElementById('textChart1'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // rgba设置透明度0.1
        title: {
          text: '信用卡套现 AUC：',
          left: '0%',
          top: '30%',
          textStyle: {
            fontSize: 21,
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
                text: this.dytes_test_data1['auc'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              },
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // rgba设置透明度0.1
        title: {
          text: '异常转账 AUC：',
          left: '6%',
          top: '30%',
          textStyle: {
            fontSize: 21,
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
                text: this.dytes_test_data2['auc'],
                fontSize: 20,
                fontWeight: 'bold',
                // lineDash: [0, 200],
                // lineDashOffset: 0,
                // fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              },
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
            data: this.dytes_test_data1['pie']
          }
        ]
      }

      this.chart.setOption(option)
    },
    showBingChart2() {
      this.chart = echarts.init(document.getElementById('bingChart2'))
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
            data: this.dytes_test_data2['pie']
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
.creditShow-header{
  margin: 10px auto;
  width: 100%;
  height: 140px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, .04);
}
.el-form{
  padding-left: 90px;
  padding-top: 25px;
}
.el-form-item{
  margin-right: 30px;
}
.el-input-number{
  margin-right: 30px;
}
.el-button{
  margin-right: 32px;
}
.uploadTest{
  position: absolute;
  display: inline-block;
  margin-left: 160px;
  margin-right: 10px;
  margin-top: 30px;
}
.uploadTrain{
  position: absolute;
  margin-left: 350px;
  display: inline-block;
  /* margin-left: 10px; */
  margin-right: 10px;
  margin-top: 30px;
}
#btn1{
  position: absolute;
  margin-left: 620px;
  margin-top: 30px;
}
.clear{
  clear: both;        /*将clear设置清除浮动*/
  overflow: hidden;
}
#btn2{
  position: absolute;
  margin-left:745px;
  margin-top: 30px;
}
#btn3{
  position: absolute;
  margin-left: 900px;
  margin-top: 30px;
}
.scene-title{
  width: 100%;
  height: 40px;
}
.span-display1{
  position: absolute;
  display: inline-block;
  margin-top: 40px;
  margin-left: 400px;
  margin-right: 10px;
}
.span-display2{
  position: absolute;
  display: inline-block;
  margin-top: 90px;
  margin-left: 400px;
  margin-right: 10px;
}
.span-display3{
  position: absolute;
  display: inline-block;
  margin-top: 80px;
  margin-right: 10px;
}

#btn12{
  position: absolute;
  margin-left: 620px;
  margin-top: 80px;
}

#btn22{
  position: absolute;
  margin-left:745px;
  margin-top: 80px;
}
#btn32{
  position: absolute;
  margin-left: 900px;
  margin-top: 80px;
}
</style>
