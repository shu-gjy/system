<template>
  <div class="app-container">
    <div class="scene-title">

      <span style="width: 100%; display:inline-block; text-align:center; font-size: 25px; font-weight: bold; margin-top: 10px;float: left; color: rgba(128, 128, 128)">
        异常转账场景静态图检测
      </span>
    </div>
    <div class="creditShow-header">

      <el-button id="btn1" type="primary" round @click="create()">模型训练</el-button>
      <el-button id="btn2" type="primary" round @click="testShow()">测试数据预测</el-button>

      <!-- <el-divider direction="vertical"></el-divider> -->

      <!-- 模型下载 -->
      <!-- <span>模型下载</span> -->
      <el-button id="btn3" type="default" round @click="download()">模型下载</el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="abnormalCardList"
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
      abnormalCardList: null, // 查询之后接口返回集合
      btnDisabled: false,
      radio1: 2,
      is_create: '',
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
      'apgnn_test_data',
      'apgnn_training_data',
      'apgnn_training_data'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    download() {
      window.location.href = 'http://127.0.0.1:8001/api_apgnn/apgnn/downloadModel/'
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
      this.$store.dispatch('apgnn/apgnnInitTrain').then(response => {
        console.log('This is training_data:', this.apgnn_training_data)
        this.showChartCredit()

        this.loading = true
        this.$store.dispatch('apgnn/apgnnInitTest').then(response => {
          this.abnormalCardList = this.apgnn_test_data['cardlist']
          // console.log(this.abnormalCardList)
          this.loading = false
          console.log('This is test_data:', this.abnormalCardList)
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
        this.$store.dispatch('apgnn/apgnnTrain', this.form).then(response => {
          console.log('This is backData', this.apgnn_training_data)
          loadingInstance.close()// 关闭loading服务
          this.showChartCredit()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
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
        this.$store.dispatch('apgnn/apgnnTest').then(response => {
          // console.log('This is backData', this.registerTest_data)
          loadingInstance1.close()// 关闭loading服务
          loadingInstance2.close()// 关闭loading服务
          loadingInstance3.close()// 关闭loading服务
          loadingInstance4.close()// 关闭loading服务
          this.abnormalCardList = this.apgnn_test_data['cardlist']
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

    showChartCredit() {
      this.chart = echarts.init(document.getElementById('chart'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: '#161627',
        title: {
          text: '模型训练',
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
          data: ['Pre', 'Rec', 'F1'],
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
          data: this.apgnn_training_data['epoch']
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
            name: 'Pre',
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
            data: this.apgnn_training_data['precision']
          },
          {
            name: 'Rec',
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
            data: this.apgnn_training_data['recall']
          },
          {
            name: 'F1',
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(238, 197, 102, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(238, 197, 102, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(238, 197, 102)',
                borderColor: 'rgba(238, 197, 102, 0)',
                borderWidth: 12
              }
            },
            data: this.apgnn_training_data['f1']
          }
        ]
      }
      this.chart.setOption(option)
    },
    showTextChart1() {
      this.chart = echarts.init(document.getElementById('textChart1'))
      // chart1 基于准备好的dom，初始化echarts实例
      var option = {
        backgroundColor: 'rgba(128, 128, 128, 0.1)', // rgba设置透明度0.1
        title: {
          text: '精确率：',
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
                text: this.apgnn_test_data['precision'],
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
                text: this.apgnn_test_data['recall'],
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
                text: this.apgnn_test_data['f1'],
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
            data: this.apgnn_test_data['pie']
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
  height: 100px;
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
.scene-title{
  width: 100%;
  height: 40px;
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
</style>
